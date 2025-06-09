"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import ThreeHeroBackground from "./three-hero-background"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const skills = ["Web Developer", "AI Enthusiast", "Cloud Explorer", "UI/UX Designer"]
const descriptions = [
  "Passionate about creating innovative digital solutions",
  "Merging creativity with cutting-edge technology",
  "Transforming ideas into impactful experiences",
]

const UltimateHome = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const mailto = "mailto:mahmedyk789@gmail.com"

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline()

    // Ultra-smooth entrance animations
    tl.from(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 2,
      ease: "power3.out",
    })
      .from(imageRef.current, {
        y: -300,
        opacity: 0,
        scale: 0.3,
        rotation: 180,
        duration: 2.5,
        ease: "elastic.out(1, 0.4)",
      })
      .from(nameRef.current, {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        duration: 2,
        ease: "power4.out",
      })
      .from(roleRef.current, {
        scale: 0,
        rotation: 360,
        duration: 1.5,
        ease: "back.out(2)",
      })
      .from(
        descriptionRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          stagger: 0.3,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .from(
        ctaRef.current?.children || [],
        {
          y: 50,
          opacity: 0,
          scale: 0.5,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )

    // Advanced typing animation
    let skillIndex = 0
    const typeSkill = () => {
      if (roleRef.current) {
        gsap.to(roleRef.current, {
          duration: 2,
          text: skills[skillIndex],
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(roleRef.current, {
                duration: 1,
                text: "",
                ease: "power2.inOut",
                onComplete: () => {
                  skillIndex = (skillIndex + 1) % skills.length
                  typeSkill()
                },
              })
            }, 3000)
          },
        })
      }
    }
    typeSkill()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Three.js Background */}
      <ThreeHeroBackground className="absolute inset-0 w-full h-full" />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl w-full text-center">
          {/* Holographic Profile Image */}
          <div
            ref={imageRef}
            className="relative w-80 h-80 mx-auto mb-12 group"
            style={{
              filter: "drop-shadow(0 0 50px rgba(59, 130, 246, 0.5))",
              transform: `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Holographic rings */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-blue-400 rounded-full opacity-30"
                style={{
                  transform: `translateZ(${(i + 1) * 20}px) scale(${1 + i * 0.1})`,
                  animation: `spin ${10 + i * 5}s linear infinite`,
                }}
              />
            ))}

            {/* Main image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-2">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Ahmed Yar Khan"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
            </div>

            {/* Floating particles around image */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
                style={{
                  top: `${20 + Math.sin(i * 0.785) * 40}%`,
                  left: `${20 + Math.cos(i * 0.785) * 40}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          {/* Enhanced Text Content */}
          <div className="space-y-8">
            <h1
              ref={nameRef}
              className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 100px rgba(147, 51, 234, 0.8)",
                filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
              }}
            >
              Ahmed Yar Khan
            </h1>

            <p
              ref={roleRef}
              className="text-3xl md:text-5xl text-blue-300 font-bold min-h-[4rem] tracking-wide"
              style={{
                textShadow: "0 0 30px rgba(59, 130, 246, 0.8)",
                filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))",
              }}
            />

            <div ref={descriptionRef} className="space-y-6 max-w-4xl mx-auto">
              {descriptions.map((description, index) => (
                <p
                  key={index}
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light"
                  style={{
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {description}
                </p>
              ))}
            </div>

            {/* Ultra-modern CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col md:flex-row justify-center gap-8 pt-8">
              {[
                { label: "Services", color: "from-blue-600 to-cyan-600" },
                { label: "Portfolio", color: "from-purple-600 to-pink-600" },
                { label: "Contact Me", color: "from-green-600 to-teal-600" },
              ].map((button) => (
                <button
                  key={button.label}
                  onClick={button.label === "Contact Me" ? () => (window.location.href = mailto) : undefined}
                  className={`group relative px-10 py-5 bg-gradient-to-r ${button.color} rounded-2xl text-white font-bold text-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/50 overflow-hidden`}
                  style={{
                    filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.1,
                      y: -10,
                      duration: 0.3,
                      ease: "power2.out",
                    })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      y: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    })
                  }}
                >
                  <span className="relative z-10">{button.label}</span>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Ripple effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}

export default UltimateHome
