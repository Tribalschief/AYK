"use client"


import { useState, useEffect, useRef } from "react"
import { getProject } from "@/action/getProject"
import ThreePortfolioBackground from "./three-portfolio-background"
import ProjectCard3D from "./PC/PCard"
import CursorEffect from "./cursor-effect"
import { gsap } from "gsap"

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

  const portfolioRef = useRef(null)
  const contactRef = useRef(null)
  const titleRef = useRef(null)

  const categories = projects.length > 0 ? Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) : []
  const tags = projects.length > 0 ? Array.from(new Set(projects.flatMap((p) => p.tags || []).filter(Boolean))) : []

  useEffect(() => {
    const fetchData = async () => {
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
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      })
    }
  }, [])

  const filteredProjects = projects.filter(
    (project) =>
      (!activeCategory || project.category === activeCategory) &&
      (!activeTag || (project.tags && project.tags.includes(activeTag))),
  )

  const handleCategoryClick = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category))
    setActiveTag(null)
  }

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setContactForm({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
    alert("Message sent successfully!")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative">
      <CursorEffect />

      <section ref={portfolioRef} id="portfolio" className="relative min-h-screen overflow-hidden bg-black">
        <ThreePortfolioBackground className="absolute inset-0 w-full h-full" activeCategory={activeCategory ?? ""} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <h2
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-center mb-16 glitch"
            data-text="My Portfolio"
          >
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
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
                        ? "bg-white text-black shadow-2xl shadow-white/50 scale-110"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-xl border border-white/10"
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
                        ? "bg-white text-black shadow-lg shadow-white/25"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id || project._id || Math.random().toString()} className="project-card-wrapper">
                  <ProjectCard3D project={project} />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-400 text-xl">No projects found. Please check back later.</p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-16">
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-white/25 transition-all"
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
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black to-gray-900"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
          <h2 className="text-6xl md:text-8xl font-bold text-center mb-16 glitch" data-text="Get In Touch">
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-6">{"Let's Create Something Amazing"}</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {"I'm always excited to work on new projects and collaborate with amazing people."}
                </p>

                <div className="space-y-6">
                  {[
                    { icon: "📧", label: "Email", value: "mahmedyk789@gmail.com" },
                    { icon: "📱", label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: "📍", label: "Location", value: "San Francisco, CA" },
                    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/ahmedyarkhan" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{item.label}</p>
                        <p className="text-white font-semibold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-white/25 transition-all"
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
