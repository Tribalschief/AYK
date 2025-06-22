"use client"

import { useState, useMemo, useCallback, useRef,useEffect } from "react" 
import { useTheme } from "next-themes"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"
const ThreeSkillsBackground = dynamic(() => import("./three-skills-background"), { ssr: false })
import CursorEffect from "./cursor-effect"

const isBrowser = typeof window !== 'undefined';

// Then in your component
if (isBrowser) {
  // Safe to use document here
  const element = document.getElementById('something');
  console.log(element);
}
// Skill categories with proper data
const skillCategories = [
  {
    name: "Full-Stack Development",
    description: "Building robust, scalable web applications using modern technologies and best practices.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "PostgreSQL", "GraphQL"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces with user-centered design principles.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Wireframing"],
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Python Development",
    description: "Developing powerful backend systems, APIs, and data processing solutions.",
    skills: ["Django", "FastAPI", "Flask", "Pandas", "NumPy", "SQLAlchemy", "Celery"],
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Cloud Computing",
    description: "Deploying and managing scalable cloud infrastructure and containerized applications.",
    skills: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Microservices",
      "Serverless",
      "Redis",
    ],
    color: "from-orange-500 to-red-500",
  },
] 

const UltimateServicesMinimal = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name)
 useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])
  const { resolvedTheme } = useTheme()

  const titleRef = useRef(null)
  const categoriesRef = useRef(null)
  const contentRef = useRef(null)
  const timelineRef = useRef(null)

  // Memoize theme-based styling
  const isLight = useMemo(() => resolvedTheme === "light", [resolvedTheme])

  // Memoize active category data
  const activeCategoryData = useMemo(
    () => skillCategories.find((category) => category.name === activeCategory) || skillCategories[0],
    [activeCategory],
  )

  // Memoized category change handler
  const handleCategoryChange = useCallback(
    (categoryName) => {
      if (categoryName === activeCategory) return
      setActiveCategory(categoryName)
    },
    [activeCategory],
  )

  // Memoized initialization function
  const initializeAnimations = useCallback((containerNode) => {
    if (!containerNode || !titleRef.current) return

    const tl = gsap.timeline()
    timelineRef.current = tl

    // Animate title
    tl.from(titleRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  // Memoized container ref callback
  const containerRefCallback = useCallback(
    (node) => {
      if (node) {
        const cleanup = initializeAnimations(node)
        return cleanup
      }
    },
    [initializeAnimations],
  )

  return (
    <section
      id="services"
      className={`relative min-h-screen overflow-hidden ${isLight ? "bg-white" : "bg-black"}`}
      ref={containerRefCallback}
    >
      <ThreeSkillsBackground className="absolute inset-0 w-full h-full" activeCategory={activeCategory} />
      <CursorEffect />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        {/* Title */}
        <h2 ref={titleRef} className="text-6xl md:text-8xl font-bold text-center mb-20 glitch" data-text="My Expertise">
          <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground bg-clip-text text-transparent">
            My Expertise
          </span>
        </h2>

        {/* Category Selection */}
        <div ref={categoriesRef} className="flex flex-wrap justify-center gap-6 mb-16">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
              className={`
                relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 overflow-hidden
                ${
                  category.name === activeCategory
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/50 scale-110"
                    : "bg-card/50 text-card-foreground hover:bg-card/80 backdrop-blur-xl border border-border"
                }
              `}
            >
              <span className="relative z-10">{category.name}</span>
              <span className="ml-2 text-sm opacity-70">({category.skills.length})</span>
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="bg-card/80 backdrop-blur-2xl rounded-3xl p-12 border border-border shadow-2xl">
            <h3 className="text-4xl font-bold text-foreground mb-6 text-center">{activeCategoryData.name}</h3>

            <p className="text-xl text-card-foreground leading-relaxed mb-12 text-center max-w-4xl mx-auto">
              {activeCategoryData.description}
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeCategoryData.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-muted/50 backdrop-blur-sm rounded-xl p-4 text-center border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <span className="text-foreground font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UltimateServicesMinimal
