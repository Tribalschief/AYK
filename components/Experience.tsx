"use client"

import { useRef, useMemo, useCallback, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"
const ThreeHeroBackground = dynamic(() => import("./three-hero-background"), { ssr: false })


// Memoized experiences data
const experiences = [
  {
    id: 1,
    company: "Tech Innovators Inc.",
    position: "Senior Full-Stack Developer",
    duration: "2022 - Present",
    location: "San Francisco, CA",
    description:
      "Leading development of scalable web applications using Next.js, React, and Node.js. Architecting cloud infrastructure on AWS and implementing CI/CD pipelines.",
    achievements: [
      "Increased application performance by 40% through optimization",
      "Led a team of 5 developers on multiple projects",
      "Implemented microservices architecture reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["Next.js", "React", "Node.js", "AWS", "Docker", "TypeScript"],
  },
  {
    id: 2,
    company: "Digital Solutions Ltd.",
    position: "Full-Stack Developer",
    duration: "2020 - 2022",
    location: "New York, NY",
    description:
      "Developed and maintained multiple client-facing applications using modern web technologies. Collaborated with design teams to implement pixel-perfect UI/UX.",
    achievements: [
      "Built 15+ responsive web applications from scratch",
      "Reduced bug reports by 35% through comprehensive testing",
      "Implemented real-time features using WebSocket technology",
      "Optimized database queries improving response time by 50%",
    ],
    technologies: ["React", "Python", "FastAPI", "PostgreSQL", "Redis", "JavaScript"],
  },
  {
    id: 3,
    company: "StartupXYZ",
    position: "Frontend Developer",
    duration: "2019 - 2020",
    location: "Austin, TX",
    description:
      "Focused on creating intuitive user interfaces and implementing responsive designs. Worked closely with product managers to deliver user-centric solutions.",
    achievements: [
      "Improved user engagement by 25% through UI/UX enhancements",
      "Developed reusable component library used across 10+ projects",
      "Implemented accessibility standards achieving WCAG 2.1 compliance",
      "Reduced page load times by 45% through performance optimization",
    ],
    technologies: ["React", "Vue.js", "Sass", "Webpack", "Jest", "Figma"],
  },
] as const

const Experience = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineInstanceRef = useRef<gsap.core.Timeline | null>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])
  // Memoized animation configuration
  const animationConfig = useMemo(
    () => ({
      title: {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      card: {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
      },
    }),
    [],
  )

  // Memoized scroll to contact handler
 const scrollToContact = useCallback(() => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const contactSection = document.getElementById("contact")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }
}, [])

  // Memoized card animation function
  const animateCards = useCallback(() => {
    if (!timelineRef.current) return

    const cards = timelineRef.current.querySelectorAll(".experience-card")

    cards.forEach((card, index) => {
      gsap.fromTo(card, animationConfig.card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: animationConfig.card.duration,
        ease: animationConfig.card.ease,
        delay: 0.2 * index,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
    })
  }, [animationConfig])

  // Memoized title animation function
  const animateTitle = useCallback(() => {
    if (!titleRef.current) return

    const tl = gsap.timeline()
    timelineInstanceRef.current = tl

    tl.from(titleRef.current, animationConfig.title)
  }, [animationConfig.title])

  // Memoized initialization function
  const initializeAnimations = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        animateTitle()
        // Delay card animations to ensure DOM is ready
        setTimeout(() => {
          animateCards()
        }, 100)

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
          if (timelineInstanceRef.current) {
            timelineInstanceRef.current.kill()
          }
        }
      }
    },
    [animateTitle, animateCards],
  )

  // Memoized experience cards
  const experienceCards = useMemo(
    () =>
      experiences.map((exp, index) => (
        <div
          key={exp.id}
          className={`experience-card relative mb-16 ${
            index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
          }`}
        >
          {/* Timeline Dot */}
          <div
            className={`absolute w-6 h-6 bg-white rounded-full border-4 border-black z-10 ${
              index % 2 === 0
                ? "left-5 md:right-0 md:left-auto md:transform md:translate-x-1/2"
                : "left-5 md:left-0 md:transform md:-translate-x-1/2"
            } top-8`}
          >
            <div className="absolute inset-1 bg-black rounded-full animate-pulse"></div>
          </div>

          {/* Content Card */}
          <div className="ml-16 md:ml-0 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 group">
            {/* Company & Position */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                {exp.position}
              </h3>
              <h4 className="text-xl text-gray-300 mb-2">{exp.company}</h4>
              <div className="flex flex-col md:flex-row md:justify-between text-gray-400 text-sm">
                <span>{exp.duration}</span>
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

            {/* Achievements */}
            <div className="mb-6">
              <h5 className="text-white font-semibold mb-3">Key Achievements:</h5>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h5 className="text-white font-semibold mb-3">Technologies:</h5>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      )),
    [],
  )

  return (
    <section id="experience" className="relative min-h-screen overflow-hidden bg-black" ref={initializeAnimations}>
      <ThreeHeroBackground className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        {/* Title */}
        <h2 ref={titleRef} className="text-6xl md:text-8xl font-bold text-center mb-20 glitch" data-text="Experience">
          <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-white via-gray-500 to-transparent"></div>

          {experienceCards}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-block bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Work Together?</h3>
            <p className="text-gray-300 mb-6">
              {"Let's discuss how my experience can contribute to your next project."}
            </p>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
