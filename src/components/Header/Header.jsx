"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import logo from "@/assets/ayk.png"
import "@/components/Header/H.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const mailto = "mailto:your-email@example.com"
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const menuItemsRef = useRef([])
  const mobileMenuRef = useRef(null)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
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
  }, [isMenuOpen])

  return (
    <header ref={headerRef} className="navbar bg-transparent text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div ref={logoRef}>
          <Image src={logo || "/placeholder.svg"} alt="ayk" width={40} height={40} className="rounded-full" />
        </div>
        <nav className="hidden md:block">
          <ul className="menu flex space-x-8">
            {["Home", "Services", "Portfolio"].map((item, index) => (
              <li key={item} className="menu-item" ref={(el) => (menuItemsRef.current[index] = el)}>
                <Link href={item === "Home" ? "/" : `/${item}`}>{item}</Link>
              </li>
            ))}
            <li ref={(el) => (menuItemsRef.current[3] = el)}>
              <button
                className="btn border-d border-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors duration-300"
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
          </ul>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      <nav ref={mobileMenuRef} className="md:hidden bg-gray-800 overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <ul className="flex flex-col items-center py-4 space-y-4">
          {["Home", "Services", "Portfolio"].map((item) => (
            <li key={item} className="menu-item w-full text-center">
              <Link href={item === "Home" ? "/" : `/${item}`} className="block py-2">
                {item}
              </Link>
            </li>
          ))}
          <li className="w-full text-center">
            <button
              className="btn border-b  hover:border-blue-700 px-4 py-2 rounded-full transition-colors duration-300 w-full"
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
        </ul>
      </nav>
      <span></span>
    </header>
  )
}

export default Header

