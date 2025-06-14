"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  if(false){
    console.log(resolvedTheme)
  }

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="theme-toggle">
        <div className="w-6 h-6 animate-pulse bg-gray-300 rounded" />
      </div>
    )
  }

  const cycleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("system")
    } else {
      setTheme("dark")
    }
  }

  const getIcon = () => {
    if (theme === "dark") {
      return <Sun size={24} />
    } else if (theme === "light") {
      return <Moon size={24} />
    } else {
      return <Monitor size={24} />
    }
  }

  const getTooltip = () => {
    if (theme === "dark") {
      return "Switch to light mode"
    } else if (theme === "light") {
      return "Switch to system mode"
    } else {
      return "Switch to dark mode"
    }
  }

  return (
    <button onClick={cycleTheme} className="theme-toggle group" aria-label={getTooltip()} title={getTooltip()}>
      <div className="relative">
        {getIcon()}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-white/10" />
      </div>
    </button>
  )
}

export default ThemeToggle
