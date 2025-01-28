"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import styles from "@/app/(frontend)/Services/SkillsShowcase.module.css"
import aws from "../assets/aws.svg"
import gcp from "@/assets/gcp.svg"
import docker from "../assets/docker.svg"
import Kubernetes from "../assets/kubernetes.svg"
import figma from "../assets/figma.svg"
import nextjs from "../assets/nextjs.svg"
import fast from "../assets/fastapi.svg"
import react from "../assets/react.svg"
import node from "../assets/node.svg"
import tailwind from "../assets/tailwind.svg"
import kafka from "../assets/kafka.svg"
import kong from "../assets/kong.svg"
import research from "../assets/research.svg"

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
      { name: "React", level: 90, icon: react },
      { name: "Node.js", level: 85, icon: node },
      { name: "Tailwind", level: 80, icon: tailwind },
      { name: "Next.js", level: 85, icon: nextjs },
    ],
  },
  {
    name: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user interfaces with a focus on user-centered design principles.",
    skills: [
      { name: "Figma", level: 85, icon: figma },
      { name: "User Research", level: 85, icon: research },
    ],
  },
  {
    name: "Python Development",
    description: "Experienced in Python-based web development, data analysis, and machine learning applications.",
    skills: [
      { name: "Kong", level: 85, icon: kong },
      { name: "FastApi", level: 75, icon: fast },
      { name: "Kafka", level: 70, icon: kafka },
    ],
  },
  {
    name: "Cloud Computing",
    description:
      "Proficient in cloud infrastructure, containerization, and orchestration for scalable and reliable deployments.",
    skills: [
      { name: "AWS", level: 85, icon: aws },
      { name: "GCP", level: 80, icon: gcp },
      { name: "Docker", level: 25, icon: docker },
      { name: "Kubernetes", level: 25, icon: Kubernetes },
    ],
  },
]

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name)

  return (
    <section className="bg-gradient-to-bl  from-gray-800 via-black to-slate-800 h-full
 "> 
    <div className={styles.container }>
      
      <h2 className={styles.title}>My Expertise</h2>
      <div className={styles.categoryButtons}>
        {skillCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`${styles.categoryButton} ${category.name === activeCategory ? styles.activeCategory : ""}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {skillCategories.map((category) => (
        <div
          key={category.name}
          className={`${styles.categoryContent} ${category.name === activeCategory ? styles.active : styles.inactive}`}
        >
          <div className={styles.skillsGrid}>
            <div className={styles.descriptionCard}>
              <p>{category.description}</p>
            </div>
            {category.skills.map((skill) => (
              <div key={skill.name} className={styles.skillCard}>
                <div className={styles.skillHeader}>
                  <div className={styles.iconContainer}>
                    <Image
                      src={skill.icon || "/placeholder.svg"}
                      alt={`${skill.name} icon`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className={styles.skillName}>{skill.name}</h3>
                </div>
                <div className={styles.skillLevel}>
                  <div className={styles.skillLevelBar}>
                    <div className={styles.skillLevelFill} style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <span className={styles.skillLevelText}>{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </section>
  )
}

export default Services