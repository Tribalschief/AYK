"use client"



import { useRef, useMemo, useCallback  } from "react"
import Image from "next/image"
import { gsap } from "gsap"



const ProjectCardModern = ({ project }) => {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  
 
  // Memoized project data
  const projectData = useMemo(
    () => ({
      title: project.title || "Untitled Project",
      description: project.description || "No description available",
      image: project.imageUrl || "/placeholder.svg?height=400&width=600",
      category: project.category || "General",
      tags: project.tags?.slice(0, 3) || [],
      link: project.link || project.demo || "#",
      github: project.github,
      status: project.status || "completed",
    }),
    [project],
  )

  // Memoized hover handlers
  const handleMouseEnter = useCallback(() => {
    if (!imageRef.current || !contentRef.current) return

    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: "power2.out",
    })

    gsap.to(contentRef.current, {
      y: -10,
      duration: 0.4,
      ease: "power2.out",
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!imageRef.current || !contentRef.current) return

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    })

    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    })
  }, [])

  // Memoized click handlers
  const handleProjectClick = useCallback(() => {
    if (projectData.link && projectData.link !== "#") {
      window.open(projectData.link, "_blank", "noopener,noreferrer")
    }
  }, [projectData.link])

  const handleGithubClick = useCallback(
    (e) => {
      e.stopPropagation()
      if (projectData.github) {
        window.open(projectData.github, "_blank", "noopener,noreferrer")
      }
    },
    [projectData.github],
  )

  // Memoized status indicator
  const statusIndicator = useMemo(() => {
    const statusConfig = {
      completed: { color: "bg-green-500", label: "Live" },
      "in-progress": { color: "bg-yellow-500", label: "In Progress" },
      planned: { color: "bg-gray-500", label: "Planned" },
    }
    return statusConfig[projectData.status] || statusConfig.completed
  }, [projectData.status])
 
  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleProjectClick}
      className="group relative w-full grid grid-cols-2 my-2 mx-2  bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-border hover-glow hover:scale-110"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={projectData.image}
            alt={projectData.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 border border-border">
          <div className={`w-2 h-2 rounded-full ${statusIndicator.color}`} />
          <span className="text-xs font-medium text-card-foreground">{statusIndicator.label}</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
          {projectData.category}
        </div>

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="flex gap-3">
            <button
              onClick={handleProjectClick}
              className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground text-sm font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm border border-primary/50"
            >
              View Live
            </button>
            {projectData.github && (
              <button
                onClick={handleGithubClick}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm border border-border"
              >
                GitHub
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
          {projectData.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{projectData.description}</p>

        {/* Tags */}
        {projectData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {projectData.tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border hover:border-primary/30 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={handleProjectClick}
            className="flex items-center dark:text-white  text-black rounded-sm gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground text-sm font-medium rounded-lg transition-colors duration-200"
          >
            View Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>

          {projectData.github && (
            <button
              onClick={handleGithubClick}
              className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground text-sm font-medium rounded-lg transition-colors duration-200 border border-border"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </button>
          )}
        </div>

        {/* Project metrics or additional info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Active</span>
          </div>
          <span className="text-xs opacity-60">{projectData.status}</span>
        </div>
      </div>

      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border border-primary/20 blur-sm"></div>
      </div>
    </div>
  )
}

export default ProjectCardModern
