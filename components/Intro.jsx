"use client"


import Button from "./Button"

import pp from "@/assets/pp.png"



import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import styles from "@/app/(frontend)/Home.module.css"


gsap.registerPlugin(ScrollTrigger, TextPlugin)

const skills = ["Web Developer", "AI Enthusiast", "Cloud Explorer","Ui/Ux Designer"];
const descriptions = [
  "Passionate about creating innovative digital solutions",
  "Merging creativity with cutting-edge technology",
  "Transforming ideas into impactful experiences",
];
const Home = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const mailto = "mailto:mahmedyk789@gmail.com";

  useEffect(() => {
    if (!containerRef.current) return;
  
    const tl = gsap.timeline();
  
    // Initial animations
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 1,
    })
      .from(imageRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      })
      .from(nameRef.current, {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", // Text reveal effect
        duration: 1.5,
        ease: "power3.out",
      })
      .from(roleRef.current, {
        background: "linear-gradient(90deg, #ff7f50, #ff2d55)", // Gradient text
        duration: 1.5,
        ease: "power3.out",
      })
      .from(
        descriptionRef.current?.children || [],
        { y: 30, opacity: 0, stagger: 0.2, duration: 0.8 },
        "-=0.5"
      )
      .from(
        ctaRef.current?.children || [],
        { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 },
        "-=0.3"
      );
  
    // Typing animation for skills
    let skillIndex = 0;
    const typeSkill = () => {
      if (roleRef.current) {
        gsap.to(roleRef.current, {
          duration: 1,
          text: skills[skillIndex],
          ease: "none",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(roleRef.current, {
                duration: 0.5,
                text: "",
                ease: "none",
                onComplete: () => {
                  skillIndex = (skillIndex + 1) % skills.length;
                  typeSkill();
                },
              });
            }, 2000);
          },
        });
      }
    };
    typeSkill();
  
    // Hover effect for CTA buttons
    Array.from(ctaRef.current?.children || []).forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.1,
          boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.8)",
          duration: 0.3,
        });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
        });
      });
    });
  
    // Moving gradient background
    gsap.to(containerRef.current, {
      backgroundPosition: "100% 50%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <div ref={imageRef} className={styles.imageWrapper}>
          <Image
            src={pp}
            alt="Ahmed Yar Khan"
            layout="fill"
            objectFit="cover"
            className={styles.profileImage}
          />
        </div>
        <div className={styles.textContent}>
          <h1 ref={nameRef} className={styles.name}>
            Ahmed Yar Khan
          </h1>
          <p ref={roleRef} className={styles.role}></p>
          <div ref={descriptionRef} className={styles.description}>
  {descriptions.map((description, index) => (
    <p key={index}>{description}</p>
  ))}
</div>
        </div>
        <div ref={ctaRef} className={styles.cta}>
          <Button label="Services" className={styles.ctaButton}/>
          <Button label="Portfolio" className={styles.ctaButton} />
          <div   onClick={(e) => {
                   if (mailto) {
                     window.location.href = mailto;
                   }
                   e.preventDefault();
                }}>
                  <Button
              label="Contact Me"
               
              className={styles.ctaButton}
              />
                </div>
        </div>
      </div>
      <div className={styles.background}>
        {[...Array(50)].map((_, i) => (
          <div key={i} className={styles.star}></div>
        ))}
      </div>
    </div>
  )
}

export default Home

