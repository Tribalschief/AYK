"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ThreeSkillsBackground from "./three-skills-background"


gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    name: "Full-Stack Development",
    description:
      "Proficient in building robust, scalable web applications using modern technologies and best practices.",
    skills: [
      { name: "React", level: 90, icon: "/placeholder.svg?height=48&width=48" },
      { name: "Node.js", level: 85, icon: "/placeholder.svg?height=48&width=48" },
      { name: "Tailwind", level: 80, icon: "/placeholder.svg?height=48&width=48" },
      { name: "Next.js", level: 85, icon: "/placeholder.svg?height=48&width=48" },
    ],
  },
  {
    name: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user interfaces with a focus on user-centered design principles.",
    skills: [
      { name: "Figma", level: 85, icon: "/placeholder.svg?height=48&width=48" },
      { name: "User Research", level: 85, icon: "/placeholder.svg?height=48&width=48" },
    ],
  },
  {
    name: "Python Development",
    description: "Experienced in Python-based web development, data analysis, and machine learning applications.",
    skills: [
      { name: "Kong", level: 85, icon: "/placeholder.svg?height=48&width=48" },
      { name: "FastApi", level: 75, icon: "/placeholder.svg?height=48&width=48" },
      { name: "Kafka", level: 70, icon: "/placeholder.svg?height=48&width=48" },
    ],
  },
  {
    name: "Cloud Computing",
    description:
      "Proficient in cloud infrastructure, containerization, and orchestration for scalable and reliable deployments.",
    skills: [
      { name: "AWS", level: 85, icon: "/placeholder.svg?height=48&width=48" },
      { name: "GCP", level: 80, icon: "/placeholder.svg?height=48&width=48" },
      { name: "Docker", level: 75, icon: "/placeholder.svg?height=48&width=48" },
      { name: "Kubernetes", level: 70, icon: "/placeholder.svg?height=48&width=48" },
    ],
  },
]

const UltimateServices = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name)
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null)
  const [titleElement, setTitleElement] = useState<HTMLHeadingElement | null>(null)
  const [categoriesElement, setCategoriesElement] = useState<HTMLDivElement | null>(null)
  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(null)
  const { resolvedTheme } = useTheme()

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerElement(node)
  }, [])

  const titleRef = useCallback((node: HTMLHeadingElement | null) => {
    setTitleElement(node)
  }, [])

  const categoriesRef = useCallback((node: HTMLDivElement | null) => {
    setCategoriesElement(node)
  }, [])

  const contentRef = useCallback((node: HTMLDivElement | null) => {
    setContentElement(node)
  }, [])

  useEffect(() => {
    if (!containerElement || !titleElement || !categoriesElement) return

    const tl = gsap.timeline()

    tl.from(titleElement, {
      y: -150,
      opacity: 0,
      scale: 0.5,
      duration: 2,
      ease: "elastic.out(1, 0.5)",
    })

    const categoryChildren = categoriesElement.children
    if (categoryChildren.length > 0) {
      tl.from(
        Array.from(categoryChildren),
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          stagger: 0.2,
          duration: 1.5,
          ease: "back.out(1.7)",
        },
        "-=1",
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [containerElement, titleElement, categoriesElement])

  const handleCategoryChange = (categoryName: string) => {
    if (categoryName === activeCategory) return

    if (contentElement) {
      gsap.to(contentElement, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(categoryName)
        },
      })
    } else {
      setActiveCategory(categoryName)
    }
  }

  useEffect(() => {
    if (contentElement) {
      gsap.set(contentElement, { opacity: 0, y: 20 })
      gsap.to(contentElement, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      })
    }
  }, [activeCategory, contentElement])

  const isLight = resolvedTheme === "light"

  return (
    <section id="services" className={`relative min-h-screen overflow-hidden ${isLight ? "bg-black" : "bg-white"}`}>
      <ThreeSkillsBackground className="absolute inset-0 w-full h-full" activeCategory={activeCategory} />
      {/* <CursorEffect /> */}

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <h2 ref={titleRef} className="text-6xl md:text-8xl font-bold text-center mb-20 glitch" data-text="My Expertise">
          <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground bg-clip-text text-transparent">
            My Expertise
          </span>
        </h2>

        <div ref={categoriesRef} className="flex flex-wrap justify-center gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <div key={category.name} className="relative">
              {category.name === activeCategory && (
                <div className="absolute -inset-2 rounded-3xl bg-primary/20 blur-sm animate-pulse" />
              )}

              <div
                className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-20 transition-all duration-500 ${
                  category.name === activeCategory
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-110"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {index + 1}
              </div>

              <button
                onClick={() => handleCategoryChange(category.name)}
                className={`
                  relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-700 group overflow-hidden
                  ${
                    category.name === activeCategory
                      ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/50 scale-110 border-2 border-primary/50"
                      : "bg-card/50 text-card-foreground hover:bg-card/80 backdrop-blur-xl border border-border hover:border-primary/30"
                  }
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category.name === activeCategory && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                  )}
                  {category.name}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      category.name === activeCategory
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {category.skills.length}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>

        <div ref={contentRef} className="relative">
          {skillCategories.map(
            (category) =>
              category.name === activeCategory && (
                <div key={category.name} className="space-y-12">
                  <div className="relative bg-card/80 backdrop-blur-2xl rounded-3xl p-10 border border-border shadow-2xl overflow-hidden">
                    <p className="relative text-2xl text-card-foreground leading-relaxed text-center font-light">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative bg-card/60 backdrop-blur-2xl rounded-3xl p-8 border border-border transition-all duration-700 hover:border-primary/50 overflow-hidden"
                      >
                        <div className="relative flex items-center mb-8">
                          <div className="relative w-20 h-20 mr-6">
                            <div className="absolute inset-0 bg-primary/50 rounded-2xl blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                            <div className="relative w-full h-full bg-muted/80 rounded-2xl p-3 border border-border backdrop-blur-sm">
                              <Image
                                src={skill.icon || "/placeholder.svg"}
                                alt={`${skill.name} icon`}
                                width={56}
                                height={56}
                                className="w-full h-full object-contain filter brightness-110"
                              />
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {skill.name}
                          </h3>
                        </div>

                        <div className="relative">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-muted-foreground font-medium">Proficiency Level</span>
                            <span className="text-2xl font-bold text-foreground">{skill.level}%</span>
                          </div>

                          <div className="relative h-4 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <div
                              className="relative h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-2000 ease-out"
                              style={{
                                width: `${skill.level}%`,
                                boxShadow: `0 0 20px hsl(var(--primary) / 0.8), inset 0 1px 0 hsl(var(--primary) / 0.3)`,
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent rounded-full animate-pulse" />
                            </div>
                          </div>

                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Beginner</span>
                            <span>Intermediate</span>
                            <span>Expert</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </section>
  )
}

export default UltimateServices
