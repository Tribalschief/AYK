"use client"

import { useRef, useMemo, useCallback,useEffect, useState } from "react"
import { gsap } from "gsap"
import dynamic from "next/dynamic"
const ThreeHeroBackground = dynamic(() => import("./three-hero-background"), { ssr: false })
import CursorEffect from "./cursor-effect"

const HeroSectionEnhanced = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const timelineRef = useRef(null)
  const [client, setClient] = useState(false)
  
    useEffect(()=>{
      setClient(true)
    },[])
    if(false){
      console.log(client)
    }

  // Memoized animation configuration
  const animationConfig = useMemo(
    () => ({
      delay: 1,
      title: {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      subtitle: {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: "-=0.5",
      },
      cta: {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: "-=0.3",
      },
    }),
    [],
  )

  // Memoized button click handlers
const handleViewWork = useCallback(() => {
  if (typeof window !== "undefined") {
    const portfolioSection = document.getElementById("portfolio")
    portfolioSection?.scrollIntoView({ behavior: "smooth" })
  }
}, [])

const handleGetInTouch = useCallback(() => {
  if (typeof window !== "undefined") {
    const contactSection = document.getElementById("contact")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }
}, [])

  // Memoized animation function
  const createTimeline = useCallback(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return

    const tl = gsap.timeline({ delay: animationConfig.delay })

    tl.from(titleRef.current, animationConfig.title)
      .from(subtitleRef.current, animationConfig.subtitle)
      .from(ctaRef.current, animationConfig.cta)

    timelineRef.current = tl
    return tl
  }, [animationConfig])

  // Memoized ref callback for initialization
  const initializeAnimation = useCallback(
    (node) => {
      if (node) {
        const timer = setTimeout(() => {
          createTimeline()
        }, 100)

        return () => {
          clearTimeout(timer)
          if (timelineRef.current) {
            timelineRef.current.kill()
          }
        }
      }
    },
    [createTimeline],
  )

  // Memoized hero content
  const heroContent = useMemo(
    () => ({
      title: "Ahmed Yar Khan",
      subtitle: "Full-Stack Developer | AI & Cloud Expert | Building Digital Solutions",
      buttons: [
        { text: "View My Work", onClick: handleViewWork, primary: true },
        { text: "Get In Touch", onClick: handleGetInTouch, primary: false },
      ],
    }),
    [handleViewWork, handleGetInTouch],
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      ref={initializeAnimation}
    >
      <ThreeHeroBackground className="absolute inset-0 w-full h-full" />
      <CursorEffect />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 glitch"
          data-text={heroContent.title}
        >
          <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            {heroContent.title}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
        >
          {heroContent.subtitle}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          {heroContent.buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`px-10 py-5 font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 ${
                button.primary
                  ? "bg-white text-black hover:bg-gray-200 shadow-lg"
                  : "border-2 border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSectionEnhanced
