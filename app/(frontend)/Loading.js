"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Loading= () => {
  const logoRef = useRef(null)
  const progressBarRef = useRef(null)
  const percentageRef = useRef(null)

  useEffect(() => {
    if (!logoRef.current || !progressBarRef.current || !percentageRef.current) return

    const tl = gsap.timeline({ repeat: -1 })

    // Animate logo
    tl.to(logoRef.current, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    })

    // Animate progress bar
    gsap.to(progressBarRef.current, {
      width: "100%",
      duration: 3,
      ease: "power2.inOut",
    })

    // Animate percentage
    gsap.to(percentageRef.current, {
      innerHTML: "100",
      duration: 3,
      ease: "power2.inOut",
      modifiers: {
        innerHTML: (value) => Math.round(Number.parseFloat(value)) + "%",
      },
    })
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center">
      <svg
        ref={logoRef}
        className="w-24 h-24 mb-8"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" stroke="#4F46E5" strokeWidth="10" />
        <path d="M30 50L45 65L70 40" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div ref={progressBarRef} className="h-full w-0 bg-indigo-500 rounded-full"></div>
      </div>
      <div ref={percentageRef} className="mt-4 text-2xl font-bold text-indigo-500">
        0%
      </div>
    </div>
  )
}

export default Loading

