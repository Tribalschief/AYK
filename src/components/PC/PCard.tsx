"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import styles from "./cmain.module.css"

interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  link: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const tl = gsap.timeline({ paused: true })
    tl.to(card.querySelector(`.${styles.projectImage}`), { scale: 1.05, duration: 0.3 })
    tl.to(card.querySelector(`.${styles.projectContent}`), { y: -10, duration: 0.3 }, 0)

    card.addEventListener("mouseenter", () => tl.play())
    card.addEventListener("mouseleave", () => tl.reverse())

    return () => {
      card.removeEventListener("mouseenter", () => tl.play())
      card.removeEventListener("mouseleave", () => tl.reverse())
    }
  }, [])

  return (
    <div ref={cardRef} className={styles.card}>
      <div className={styles.projectImage}>
        <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.projectFooter}>
          <span className={styles.category}>{project.category}</span>
          <a href={project.link} className={styles.viewProject}>
            View Project
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

