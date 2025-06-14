"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeAwareTextProps {
  children: React.ReactNode
  className?: string
  lightClass?: string
  darkClass?: string
}

const ThemeAwareText = ({ children, className = "", lightClass = "", darkClass = "" }: ThemeAwareTextProps) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`${className} ${darkClass}`}>{children}</div>
  }

  const isLight = resolvedTheme === "light"
  const themeClass = isLight ? lightClass : darkClass

  return <div className={`${className} ${themeClass}`}>{children}</div>
}

export default ThemeAwareText
