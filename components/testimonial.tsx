"use client"

import { useState, useRef, useMemo, useCallback, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

// Memoized testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechStart Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Ahmed delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made our project a huge success. The performance improvements were remarkable!",
    project: "E-commerce Platform",
    date: "2024",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "InnovateLab",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Working with Ahmed was a game-changer for our startup. He transformed our complex requirements into a beautiful, scalable solution. His expertise in Next.js and cloud technologies is outstanding.",
    project: "SaaS Dashboard",
    date: "2024",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "GrowthCorp",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Ahmed's full-stack development skills are top-notch. He delivered our project on time and within budget. The user experience he created significantly improved our conversion rates by 40%.",
    project: "Marketing Website",
    date: "2023",
  },
  {
    id: 4,
    name: "David Thompson",
    position: "CTO",
    company: "DataFlow Systems",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Exceptional work on our data visualization platform. Ahmed's Python and React expertise helped us create a powerful tool that our clients love. His code quality and documentation are exemplary.",
    project: "Data Analytics Platform",
    date: "2023",
  },
  {
    id: 5,
    name: "Lisa Wang",
    position: "Founder",
    company: "HealthTech Solutions",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Ahmed built our healthcare management system with incredible precision. His understanding of complex requirements and ability to deliver secure, scalable solutions is impressive. Highly recommended!",
    project: "Healthcare Management System",
    date: "2023",
  },
] as const

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  

  // Memoized animation configuration
  const animationConfig = useMemo(
    () => ({
      title: {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      carousel: {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: "-=0.8",
      },
      testimonial: {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.out",
      },
    }),
    [],
  )

  // Memoized navigation handlers
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)

    // Restart autoplay after user interaction
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
    }
    autoPlayRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Memoized star rating component
  const StarRating = useCallback(({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Cleanup autoplay timeout
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [])

  // Memoized testimonial animation
  const animateTestimonial = useCallback(() => {
    if (!carouselRef.current) return

    const activeCard = carouselRef.current.querySelector(".testimonial-active")
    if (activeCard) {
      gsap.fromTo(activeCard, animationConfig.testimonial, {
        opacity: 1,
        scale: 1,
        duration: animationConfig.testimonial.duration,
        ease: animationConfig.testimonial.ease,
      })
    }
  }, [animationConfig.testimonial])

  // Animate testimonial when index changes
  useEffect(() => {
    animateTestimonial()
  }, [currentIndex, animateTestimonial])

  // Memoized initialization function
  const initializeAnimations = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !titleRef.current) return

      const tl = gsap.timeline()
      timelineRef.current = tl

      // Animate title
      tl.from(titleRef.current, animationConfig.title)
        // Animate carousel container
        .from(node, animationConfig.carousel)

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
      }
    },
    [animationConfig],
  )

  // Memoized container ref callback
  const containerRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        containerRef.current = node
        const cleanup = initializeAnimations(node)
        return cleanup
      }
    },
    [initializeAnimations],
  )

  // Memoized current testimonial
  const currentTestimonial = useMemo(() => testimonials[currentIndex], [currentIndex])
  if(false){
    console.log(currentTestimonial)
  }
  // Memoized testimonial cards
  const testimonialCards = useMemo(
    () =>
      testimonials.map((testimonial, index) => {
        const isActive = index === currentIndex
        const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length
        const isNext = index === (currentIndex + 1) % testimonials.length

        return (
          <div
            key={testimonial.id}
            className={`absolute inset-0 transition-all duration-700 ${
              isActive
                ? "testimonial-active opacity-100 scale-100 z-10"
                : isPrev || isNext
                  ? "opacity-30 scale-95 z-5"
                  : "opacity-0 scale-90 z-0"
            } ${isPrev ? "-translate-x-8" : isNext ? "translate-x-8" : ""}`}
          >
            <div className="bg-card/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-border shadow-2xl h-full flex flex-col justify-between">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-card-foreground leading-relaxed text-center mb-8 flex-grow flex items-center">
                <p>`{testimonial.text}`</p>
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col items-center space-y-4">
                {/* Avatar */}
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-sm"></div>
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="relative w-full h-full rounded-full object-cover border-4 border-white/10"
                  />
                </div>

                {/* Name and Position */}
                <div className="text-center">
                  <h4 className="text-xl font-bold text-foreground mb-1">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.position} at {testimonial.company}
                  </p>
                </div>

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Project Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">{testimonial.project}</span>
                  <span>{testimonial.date}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }),
    [currentIndex, StarRating],
  )

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="relative z-10 max-w-6xl mx-auto px-8" ref={containerRefCallback}>
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-center mb-16 glitch"
          data-text="Client Testimonials"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground bg-clip-text text-transparent">
            Client Testimonials
          </span>
        </h2>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel */}
          <div ref={carouselRef} className="relative h-[600px] md:h-[500px] mb-12">
            {testimonialCards}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="group p-3 bg-card/50 hover:bg-card/80 backdrop-blur-sm rounded-full border border-border transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="group p-3 bg-card/50 hover:bg-card/80 backdrop-blur-sm rounded-full border border-border transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="ml-2 px-3 py-1 bg-muted/50 hover:bg-muted/80 rounded-full text-xs transition-colors"
            >
              {isAutoPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">50+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">3+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">24/7</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Support</div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  )
}

export default TestimonialsCarousel
