"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import styles from "./cmain.module.css"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const tl = gsap.timeline({ paused: true })
    tl.to(card.querySelector(`.${styles.projectImage}`), { scale: 1.05, duration: 0.3 })
    tl.to(card.querySelector(`.${styles.projectContent}`), { y: -10, duration: 0.3 }, 0)
    tl.to(card.querySelector(`.${styles.viewProject}`), { x: 5, opacity: 1, duration: 0.3 }, 0)

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
        <Image src={project.imageUrl} alt={project.title} layout="fill" objectFit="cover" />
        <div className={styles.overlay} />
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
          <Link href={project.link} className={styles.viewProject}>
            View Project
            <ArrowUpRight className={styles.arrowIcon} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard