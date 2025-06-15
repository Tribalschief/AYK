"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import ThreeHeroBackground from "./three-hero-background"


const HeroSection = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <ThreeHeroBackground className="absolute inset-0 w-full h-full" />
      {/* <CursorEffect /> */}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6 glitch" data-text="Ahmed Yar Khan">
          <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Ahmed Yar Khan
          </span>
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Next.js Developer | AI & Cloud Expert | Full-Stack Engineer
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
            View My Work
          </button>
          <button className="px-8 py-4 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
