"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import ProjectCard from "./PC/PCard"
import styles from "@/app/(frontend)/Portfolio/main.module.css"
import por2 from '../assets/por2.jpg'
import por4 from '../assets/por3.jpg'
const projects = [
  {
    id: "1",
    title: "AI-Powered Analytics Dashboard",
    category: "Web Development",
    image: `../assets/por2.jpg`,
    description: "An interactive dashboard leveraging AI for real-time business insights.",
    link: "#",
    tags: ["React", "AI", "Data Visualization"],
  },
  {
    id: "2",
    title: "E-commerce Mobile App",
    category: "Mobile Development",
    image: `../assets/por2.jpg`,
    description: "A feature-rich mobile app for a seamless shopping experience.",
    link: "#",
    tags: ["React Native", "Redux", "Payment Integration"],
  },
  {
    id: "3",
    title: "Smart Home IoT Platform",
    category: "IoT",
    image: `../assets/por2.jpg`,
    description: "An integrated platform for managing smart home devices.",
    link: "#",
    tags: ["IoT", "Node.js", "MQTT"],
  },
  {
    id: "4",
    title: "Blockchain-based Supply Chain",
    category: "Blockchain",
    image: `../assets/por2.jpg`,
    description: "A transparent and secure supply chain management system.",
    link: "#",
    tags: ["Blockchain", "Solidity", "Web3.js"],
  },
]

const ProjectShowcase = ({project}:any) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [titleElements, setTitleElements] = useState<HTMLElement | null>(null);
  const [categoryElements, setCategoryElements] = useState<HTMLElement[]>([]);
  const [projectElements, setProjectElements] = useState<HTMLElement[]>([]);

  const categories = Array.from(new Set(projects.map((project) => project.category)));
  const tags = Array.from(new Set(projects.flatMap((project) => project.tags)));

  const filteredProjects = projects.filter(
    (project) =>
      (!activeCategory || project.category === activeCategory) &&
      (!activeTag || project.tags.includes(activeTag))
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  useEffect(() => {
    // Animate title
    if (titleElements) {
      gsap.from(titleElements, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Animate category buttons
    if (categoryElements.length > 0) {
      gsap.from(categoryElements, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    // Animate project cards
    if (projectElements.length > 0) {
      gsap.from(projectElements, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [titleElements, categoryElements, projectElements]);

  useEffect(() => {
    // Animate project cards when filters change
    if (projectElements.length > 0) {
      gsap.to(projectElements, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(projectElements, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    }
  }, [activeCategory, activeTag, projectElements]);


  return (
    <div className={styles.container}>
      <div className={styles.showcase}>
        <div className={styles.content}>
          <h2  className={styles.title}>
            My Portfolio
          </h2>

          <div  className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`${styles.categoryButton} ${category === activeCategory ? styles.active : ""}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.tags}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`${styles.tagButton} ${tag === activeTag ? styles.active : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectShowcase

