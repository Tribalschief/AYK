"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ThreeSkillsBackground from "./three-skills-background"

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  level: number
  icon: string
}

interface SkillCategory {
  name: string
  description: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
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
      { name: "Docker", level: 25, icon: "/placeholder.svg?height=48&width=48" },
      { name: "Kubernetes", level: 25, icon: "/placeholder.svg?height=48&width=48" },
    ],
  },
]

const UltimateServices = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: -150,
      opacity: 0,
      scale: 0.5,
      duration: 2,
      ease: "elastic.out(1, 0.5)",
    }).from(
      categoriesRef.current?.children || [],
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
      )
    }
  }, [activeCategory])

  const handleCategoryChange = (categoryName: string) => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(categoryName)
        },
      })
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Three.js Background */}
      <ThreeSkillsBackground className="absolute inset-0 w-full h-full" activeCategory={activeCategory} />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        {/* Holographic Title */}
        <h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          style={{
            textShadow: "0 0 100px rgba(147, 51, 234, 0.8)",
            filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))",
          }}
        >
          My Expertise
        </h2>

        {/* Futuristic Category Buttons */}
        <div ref={categoriesRef} className="flex flex-wrap justify-center gap-8 mb-20">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
              className={`
                relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-700 group overflow-hidden
                ${
                  category.name === activeCategory
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/50 scale-110"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-xl border border-white/10"
                }
              `}
              style={{
                filter: category.name === activeCategory ? "drop-shadow(0 0 30px rgba(59, 130, 246, 0.8))" : "none",
              }}
              onMouseEnter={(e) => {
                if (category.name !== activeCategory) {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }
              }}
              onMouseLeave={(e) => {
                if (category.name !== activeCategory) {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }
              }}
            >
              <span className="relative z-10">{category.name}</span>

              {/* Animated background for active state */}
              {category.name === activeCategory && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 animate-pulse" />
                </>
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>

        {/* Enhanced Content Area */}
        <div ref={contentRef} className="relative">
          {skillCategories.map(
            (category) =>
              category.name === activeCategory && (
                <div key={category.name} className="space-y-12">
                  {/* Holographic Description Card */}
                  <div
                    className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-2xl overflow-hidden"
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
                    </div>

                    <p className="relative text-2xl text-gray-200 leading-relaxed text-center font-light">
                      {category.description}
                    </p>
                  </div>

                  {/* Advanced Skills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 transition-all duration-700 hover:border-blue-500/50 overflow-hidden"
                        style={{
                          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.6)",
                        }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1.05,
                            y: -10,
                            duration: 0.5,
                            ease: "power2.out",
                          })
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out",
                          })
                        }}
                      >
                        {/* Holographic glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

                        {/* Skill Header */}
                        <div className="relative flex items-center mb-8">
                          <div className="relative w-20 h-20 mr-6">
                            {/* Icon container with holographic effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                            <div className="relative w-full h-full bg-gray-800/80 rounded-2xl p-3 border border-white/20 backdrop-blur-sm">
                              <Image
                                src={skill.icon || "/placeholder.svg"}
                                alt={`${skill.name} icon`}
                                width={56}
                                height={56}
                                className="w-full h-full object-contain filter brightness-110"
                              />
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                            {skill.name}
                          </h3>
                        </div>

                        {/* Advanced Skill Level Visualization */}
                        <div className="relative">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-400 font-medium">Proficiency Level</span>
                            <span className="text-2xl font-bold text-blue-400">{skill.level}%</span>
                          </div>

                          {/* 3D Progress Bar */}
                          <div className="relative h-4 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                            {/* Background glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full" />

                            {/* Progress fill */}
                            <div
                              className="relative h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-2000 ease-out"
                              style={{
                                width: `${skill.level}%`,
                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                              }}
                            >
                              {/* Animated shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse" />
                            </div>

                            {/* Outer glow */}
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-sm"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>

                          {/* Skill level indicators */}
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Beginner</span>
                            <span>Intermediate</span>
                            <span>Expert</span>
                          </div>
                        </div>

                        {/* Floating particles effect */}
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                            style={{
                              top: `${20 + Math.random() * 60}%`,
                              left: `${20 + Math.random() * 60}%`,
                              animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.2); }
        }
      `}</style>
    </section>
  )
}

export default UltimateServices
