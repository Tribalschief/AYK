"use client"

import { useEffect, useState } from "react"

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [sections, setSections] = useState<Element[]>([])

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      // Determine active section
      const sectionElements = document.querySelectorAll("section[id]")
      setSections(Array.from(sectionElements))

      const currentPosition = window.scrollY + window.innerHeight / 3

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        const sectionTop = section.getBoundingClientRect().top + window.scrollY

        if (currentPosition >= sectionTop) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (sections[index]) {
      window.scrollTo({
        top: sections[index].getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div className="h-full bg-white" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Section indicators */}
      <div className="section-indicator">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`section-indicator-dot ${index === activeSection ? "active" : ""}`}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>
    </>
  )
}

export default ScrollIndicator
