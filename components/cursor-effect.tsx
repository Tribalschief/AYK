"use client"

import { useEffect, useState } from "react"

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleMouseEnterLink = () => setLinkHovered(true)
    const handleMouseLeaveLink = () => setLinkHovered(false)

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink)
      link.addEventListener("mouseleave", handleMouseLeaveLink)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink)
        link.removeEventListener("mouseleave", handleMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          opacity: hidden ? 0 : 1,
          transform: `translate(${position.x}px, ${position.y}px) scale(${clicked ? 0.5 : 1})`,
        }}
      />
      <div
        className="cursor-outline"
        style={{
          opacity: hidden ? 0 : 0.5,
          transform: `translate(${position.x}px, ${position.y}px) scale(${clicked ? 0.8 : 1})`,
          width: linkHovered ? "60px" : "40px",
          height: linkHovered ? "60px" : "40px",
        }}
      />
    </>
  )
}

export default CursorEffect