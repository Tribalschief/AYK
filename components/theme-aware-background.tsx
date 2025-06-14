"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import ThreeHeroBackground from "./three-hero-background-light"

interface ThemeAwareBackgroundProps {
  className?: string
  children?: React.ReactNode
}

const ThemeAwareBackground = ({ className, children }: ThemeAwareBackgroundProps) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`${className} bg-black`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50" />
        {children}
      </div>
    )
  }

  const isLight = resolvedTheme === "light"

  return (
    <div className={`${className} ${isLight ? "bg-white" : "bg-black"}`}>
      <ThreeHeroBackground className="absolute inset-0 w-full h-full" isLight={isLight} />
      {children}
    </div>
  )
}

export default ThemeAwareBackground
