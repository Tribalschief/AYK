"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"

const ProjectCard3D = ({ project }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        rotationX: 5,
        z: 50,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-500"
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Holographic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=200&width=400"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        {/* Floating category badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags &&
            project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
              >
                {tag}
              </span>
            ))}
          {project.tags && project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <a
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group-hover:scale-105"
            style={{ transform: "translateZ(10px)" }}
          >
            View Project
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            top: `${30 + Math.random() * 40}%`,
            left: `${20 + Math.random() * 60}%`,
            animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}

export default ProjectCard3D
