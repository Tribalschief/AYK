"use client"


import { useState, useMemo, useCallback, useRef ,useEffect   } from "react"
import { useTheme } from "next-themes"
import { getProject } from "@/action/getProject"
import dynamic from "next/dynamic"
const ThreePortfolioBackground = dynamic(() => import("./three-portfolio-background"), { ssr: false })

import ProjectCardModern from "./PC/PCard"
import { gsap } from "gsap"
import CursorEffect from "./cursor-effect"


const ProjectShowcase = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeTag, setActiveTag] = useState(null)
  const [projects, setProjects] = useState([])
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false)
  const [client, setClient] = useState(false)
  
    useEffect(()=>{
      setClient(true)
    },[])
    if(false){
      console.log(client)
    }
  const { resolvedTheme } = useTheme()
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)
  const titleRef = useRef(null)
  



  // Memoize theme-based styling
  const isLight = useMemo(() => resolvedTheme === "light", [resolvedTheme])

  // Memoize project categories and tags
  const { categories, tags } = useMemo(() => {
    if (projects.length === 0) return { categories: [], tags: [] }

    const cats = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))
    const tagsList = Array.from(new Set(projects.flatMap((p) => p.tags || []).filter(Boolean)))

    return { categories: cats, tags: tagsList }
  }, [projects])

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        (!activeCategory || project.category === activeCategory) &&
        (!activeTag || (project.tags && project.tags.includes(activeTag))),
    )
  }, [projects, activeCategory, activeTag])

  // Memoized data fetching function
  const fetchProjects = useCallback(async () => {
    if (isProjectsLoaded) return

    try {
      const result = await getProject()
      if (Array.isArray(result)) {
        setProjects(result)
      } else {
        setProjects([])
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      setProjects([])
    } finally {
      setIsProjectsLoaded(true)
    }
  }, [isProjectsLoaded])

  // Memoized category click handler
  const handleCategoryClick = useCallback((category) => {
    setActiveCategory((prev) => (prev === category ? null : category))
    setActiveTag(null)
  }, [])

  // Memoized tag click handler
  const handleTagClick = useCallback((tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag))
  }, [])

  // Memoized form input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Memoized form submit handler
  const handleContactSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setContactForm({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
    alert("Message sent successfully!")
  }, [])

  // Memoized scroll functions
  const scrollToContact = useCallback(() => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const scrollToPortfolio = useCallback(() => {
    portfolioRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Memoized title animation
  const animateTitle = useCallback(() => {
    if (!titleRef.current) return

    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    })
  }, [])

  // Memoized contact form data
  const contactInfo = useMemo(
    () => [
      { icon: "📧", label: "Email", value: "mahmedyk789@gmail.com" },
      { icon: "📱", label: "Phone", value: "+923229527732" },
      { icon: "📍", label: "Location", value: "Karachi, Pakistan" },
      { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/ahmedyarkhan" },
    ],
    [],
  )

  // Initialize component
  const initializeComponent = useCallback(
    (node) => {
      if (node) {
        fetchProjects()
        animateTitle()
      }
    },
    [fetchProjects, animateTitle],
  )
  

  return (
    <div className="relative">
      <CursorEffect />

      <section
        ref={(node) => {
          portfolioRef.current = node
          initializeComponent(node)
        }}
        id="portfolio"
        className={`relative min-h-screen overflow-hidden ${isLight ? "bg-white" : "bg-black"}`}
      >
        <ThreePortfolioBackground className="absolute inset-0 w-full h-full" activeCategory={activeCategory ?? ""} />

        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8 py-20">
          <h2
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-center mb-16 glitch"
            data-text="My Portfolio"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground bg-clip-text text-transparent">
              My Portfolio
            </span>
          </h2>

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`
                    relative px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-500 group overflow-hidden
                    ${
                      category === activeCategory
                        ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/50 scale-110"
                        : "bg-card/50 text-card-foreground hover:bg-card/80 backdrop-blur-xl border border-border"
                    }
                  `}
                  onClick={() => handleCategoryClick(category)}
                >
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${
                      tag === activeTag
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-card/50 text-muted-foreground hover:bg-card/80 border border-border"
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id || project._id || Math.random().toString()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <ProjectCardModern project={project} />
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20">
                <p className="text-muted-foreground text-xl">
                  {isProjectsLoaded ? "No projects found. Please check back later." : "Loading projects..."}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-16">
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              Contact Me
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        id="contact"
        className={`relative min-h-screen overflow-hidden bg-gradient-to-b ${isLight ? "from-white to-gray-100" : "from-black to-gray-900"}`}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
          <h2 className="text-6xl md:text-8xl font-bold text-center mb-16 glitch" data-text="Get In Touch">
            <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border">
                <h3 className="text-3xl font-bold text-foreground mb-6">{"Let's Create Something Amazing"}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {"I'm always excited to work on new projects and collaborate with amazing people."}
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{item.label}</p>
                        <p className="text-foreground font-semibold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button
              onClick={scrollToPortfolio}
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-y-[-4px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectShowcase
