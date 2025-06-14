'use client'
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
import win from "../../assets/window.png"
import "./VideoSection.css"
import Image from "next/image";



const VideoSection = () => {
  const [currentVideo, setCurrentVideo] = useState("/v2.mp4")
  const videoSource = ["/v1.mp4", "/v2.mp4"]
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleVideoEnd = () => {
    const nextIndex = (currentIndex + 1) % videoSource.length
    setCurrentIndex(nextIndex)
    setCurrentVideo(videoSource[nextIndex])
  }

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    })

    gsap.to(".img-container", {
      scale: 52,
      ease: "ease",
      scrollTrigger: {
        trigger: ".video-section",
        scrub: 1,
        start: "top top",
        end: "bottom",
        pin: true,
      },
    })

    gsap.to(".right", {
      autoAlpha: 0,
      x: 500,
      duration: 1.5,
      scrollTrigger: { start: 1 },
    })

    gsap.to(".left", {
      autoAlpha: 0,
      x: -500,
      duration: 1.5,
      scrollTrigger: { start: 1 },
    })

    gsap.to(".txt-bottom", {
      autoAlpha: 0,
      letterSpacing: -10,
      duration: 2,
      scrollTrigger: { start: 2 },
    })

    const tl = gsap.timeline()
    tl.from(".left-side div", {
      y: 150,
      opacity: 0,
      stagger: { amount: 0.4 },
      delay: 0.5,
    })
      .from(".right-side", { opacity: 0, duration: 2 }, 0.5)
      .to(".wrapper", { x: -window.innerWidth })

    ScrollTrigger.create({
      animation: tl,
      trigger: ".wrapper",
      start: "top top",
      end: "+=600",
      scrub: 1,
      pin: true,
      ease: "ease",
    })

    gsap.utils.toArray(".col").forEach((image) => {
      gsap.fromTo(
        image,
        { opacity: 0.3, x: 0 },
        {
          opacity: 1,
          x: -50,
          scrollTrigger: {
            trigger: image,
            start: "10%",
            stagger: { amount: 0.4 },
          },
        },
      )
    })

    const timeline = gsap.timeline()
    timeline
      .from(".title span", { y: 150, skewY: 7, duration: 3 })
      .from(".txt-bottom", { letterSpacing: -10, opacity: 0, duration: 3 })
  }, [])

  return (
    <section className="video-section">
      <div className="video-container">
        <video autoPlay loop muted key={currentVideo} onEnded={handleVideoEnd}>
          <source src={currentVideo} type="video/mp4" />
        </video>
      </div>
      <div className="img-container">
        <Image src={win} alt="" width={100} height={100}  className="img" />
      </div>
      <div className="text-content">
        <div className="img_txt">
          <div className="title sm left">
            <span>Ideas</span>
          </div>
          <div className="title bg left">
            <span>Crafted</span>
          </div>
          <div className="title sm right">
            <span>And</span>
          </div>
          <div className="title bg right">
            <span>Delivered</span>
          </div>
        </div>
        <p className="txt-bottom">Ignite Your Imagination, Ideas That Make an Impact, Beyond the Ordinary</p>
      </div>
      <div className="v_container">
        <div className="left-side">
          <div className="tv">
            <div className="bg">Shift </div>
            <div className="sm">Your </div>
            <div className="bg bottom">Perspective</div>
          </div>
          <div className="text-container">
            <p>Consistently crafting creative solutions that exceed expectations.</p>
            <p>Delivering cutting-edge creative solutions through consistent innovation and technological expertise</p>
          </div>
        </div>
        <div className="right-side">
          <p>
            <Link href="/works">
              explore works <span className="fa-arrow-right-long">→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
