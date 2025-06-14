"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { GitlabIcon as GitHub, Linkedin, Twitter, Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mailto = "mailto:mahmedyk789@gmail.com"
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const menuItemsRef = useRef([])
  const mobileMenuRef = useRef(null)
  const socialIconsRef = useRef(null)

  // Replace these with your actual social media URLs
  const socialLinks = {
    github: "https://github.com/Tribalschief",
    linkedin: "https://www.linkedin.com/in/ahmed-yar-khan/",
    twitter: "https://x.com/Ahmedkhakwanii",
  }

  useEffect(() => {
    if (typeof window !== "undefined" && headerRef.current) {
    // Initial animation for the header
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    // Logo animation
    gsap.from(logoRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      ease: "back.out(1.7)",
    })

    // Menu items animation
    gsap.from(menuItemsRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.7,
      ease: "power3.out",
    })

    // Social icons animation
    if (socialIconsRef.current) {
      gsap.from(socialIconsRef.current.children, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 1,
        ease: "back.out(1.7)",
      })
    }

    // Handle scroll event to change header style
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
}}, [])

  useEffect(() => {
    if (typeof window !== "undefined" && mobileMenuRef.current) {
    // Mobile menu animation
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        })
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        })
      }
    }
}}, [isMenuOpen])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div ref={logoRef} className="relative">
          <div
            className={`absolute inset-0 bg-white rounded-full ${scrolled ? "animate-pulse-glow" : ""}`}
            style={{ filter: "blur(8px)", opacity: 0.2 }}
          ></div>
          <Link href="/" className="block">
            <span className="sr-only">Ahmed Yar Khan</span>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
              AYK
            </div>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            {["Home", "Services", "Portfolio", "Blog"].map((item, index) => (
              <li key={item} className="relative group" ref={(el) => (menuItemsRef.current[index] = el)}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white hover:text-gray-300 transition-colors duration-300 py-2"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li ref={(el) => (menuItemsRef.current[4] = el)}>
              <button
                className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-full"
                onClick={(e) => {
                  if (mailto) {
                    window.location.href = mailto
                  }
                  e.preventDefault()
                }}
              >
                CONTACT
              </button>
            </li>
            <div ref={socialIconsRef} className="flex space-x-4">
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <GitHub size={20} />
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </ul>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden bg-black/90 backdrop-blur-md"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4">
            {["Home", "Services", "Portfolio", "Blog"].map((item) => (
              <li key={item} className="border-b border-gray-800 pb-2">
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block text-white hover:text-gray-300 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <button
                className="w-full px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-full"
                onClick={(e) => {
                  if (mailto) {
                    window.location.href = mailto
                  }
                  setIsMenuOpen(false)
                  e.preventDefault()
                }}
              >
                CONTACT
              </button>
            </li>
            <li className="flex justify-center space-x-6 pt-4">
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <GitHub size={24} />
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <Twitter size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
