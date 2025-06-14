"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
  if (typeof window !== "undefined" && containerRef.current instanceof HTMLElement) {
    if (!containerRef.current) return

    const container = containerRef.current
    const particlesCount = 50
    const colors = ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71", "#f1c40f"]

    // Create particles
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full opacity-0"
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      container.appendChild(particle)

      // Set initial position and size
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        width: Math.random() * 15 + 5,
        height: (particle as HTMLElement).style.width,
      })

      // Animate particle
      animateParticle(particle)
    }

    function animateParticle(particle: HTMLElement) {
      gsap.to(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 10 + 5,
        ease: "power1.inOut",
        onComplete: () => animateParticle(particle),
      })
    }

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      gsap.to(container.children, {
        x: (i) => (mouseX - 0.5) * (i % 5) * 10,
        y: (i) => (mouseY - 0.5) * (i % 3) * 10,
        duration: 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  
}}, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}></div>
  )
}

export default AnimatedBackground

