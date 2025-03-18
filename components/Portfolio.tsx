"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import ProjectCard from "./PC/PCard"
import styles from "@/app/(frontend)/Portfolio/main.module.css"
import { getProject } from "@/action/getProject"

type Project = {
  id: string
  title: string
  category: string
  image: string
  description: string
  link: string
  tags: string[]
}

const ProjectShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const categoryButtonsRef = useRef<HTMLButtonElement[]>([])
  const projectCardsRef = useRef<HTMLDivElement[]>([])

  // Get unique categories and tags
  const categories = Array.from(new Set(projects.map(p => p.category)))
  const tags = Array.from(new Set(projects.flatMap(p => p.tags)))

  // Fetch projects
  useEffect(() => {
    const fetchData = async () => {
        const result = await getProject()
        setProjects(result)     
    }
    console.log(projects)
    fetchData()
  }, [])

  // Filter projects
  const filteredProjects = projects.filter(project => 
    (!activeCategory || project.category === activeCategory) &&
    (!activeTag || project.tags.includes(activeTag))
  )

  // Animation setup
  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
    }

    // Category buttons animation
    if (categoryButtonsRef.current.length > 0) {
      gsap.from(categoryButtonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      })
    }
  }, [])

  // Project cards animation
  useEffect(() => {
    const cards = projectCardsRef.current
      .filter(el => el !== null)
      .slice(0, filteredProjects.length)

    if (cards.length > 0) {
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })
    }

    return () => {
      gsap.killTweensOf(cards)
    }
  }, [filteredProjects])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(current => current === category ? null : category)
    setActiveTag(null) // Reset tag filter when changing category
  }

  const handleTagClick = (tag: string) => {
    setActiveTag(current => current === tag ? null : tag)
  }

  return (
    <div className={styles.container}>
      <div className={styles.showcase}>
        <div className={styles.content}>
          <h2 ref={titleRef} className={styles.title}>
            My Portfolio
          </h2>

          <div className={styles.categories}>
            {categories.map((category, index) => (
              <button
                key={category}
                ref={el => {
                  categoryButtonsRef.current[index] = el as HTMLButtonElement;
                  return;
                }}
                onClick={() => handleCategoryClick(category)}
                className={`${styles.categoryButton} ${
                  category === activeCategory ? styles.active : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.tags}>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`${styles.tagButton} ${
                  tag === activeTag ? styles.active : ""
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                ref={el => {projectCardsRef.current[index] = el as HTMLDivElement;
                  return;}
                }
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectShowcase