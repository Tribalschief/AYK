"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { getProject } from "@/action/getProject"
import ThreePortfolioBackground from "./three-portfolio-background"
import ProjectCard3D from "./PC/PCard"

type Project = {
  id: string
  title: string
  category: string
  image: string
  description: string
  link: string
  tags: string[]
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ProjectShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs for animations
  const portfolioRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contactTitleRef = useRef<HTMLHeadingElement>(null)
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

  const filteredProjects = projects.filter(
    (project) =>
      (!activeCategory || project.category === activeCategory) && (!activeTag || project.tags.includes(activeTag)),
  )

  // Animation setup
  useEffect(() => {
    // Portfolio section animations
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      })
    }

    // Contact section animations
    if (contactTitleRef.current) {
      gsap.from(contactTitleRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: contactTitleRef.current,
          start: "top 80%",
        },
      })
    }

    // Category buttons animation
    if (categoryButtonsRef.current.length > 0) {
      gsap.from(categoryButtonsRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: categoryButtonsRef.current[0],
          start: "top 80%",
        },
      })
    }
  }, [])

  // Project cards animation
  useEffect(() => {
    const cards = projectCardsRef.current.filter((el) => el !== null).slice(0, filteredProjects.length)

    if (cards.length > 0) {
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      })
    }

    return () => {
      gsap.killTweensOf(cards)
    }
  }, [filteredProjects])

  const handleCategoryClick = (category: string) => {
    setActiveCategory((current) => (current === category ? null : category))
    setActiveTag(null)
  }

  const handleTagClick = (tag: string) => {
    setActiveTag((current) => (current === tag ? null : tag))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)

    // Show success message (you can implement this)
    alert("Message sent successfully!")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target
  setContactForm((prev: ContactForm) => ({
    ...prev,
    [name]: value,
  }))
}

  return (
    <div className="relative">
      {/* Portfolio Section */}
      <section
        ref={portfolioRef}
        className="relative min-h-screen overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a202c 0%, #000000 50%, #2d3748 100%)",
        }}
      >
        {/* Three.js Background */}
        <ThreePortfolioBackground className="absolute inset-0 w-full h-full" activeCategory={activeCategory ?? ""} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          {/* Portfolio Title */}
          <h2
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 100px rgba(147, 51, 234, 0.8)",
              filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))",
            }}
          >
            My Portfolio
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {categories.map((category, index) => (
              <button
                key={category}
                ref={(el) => {
                  categoryButtonsRef.current[index] = el as HTMLButtonElement
                }}
                onClick={() => handleCategoryClick(category)}
                className={`
                  relative px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-500 group overflow-hidden
                  ${
                    category === activeCategory
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/50 scale-110"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-xl border border-white/10"
                  }
                `}
                style={{
                  filter: category === activeCategory ? "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))" : "none",
                }}
              >
                <span className="relative z-10">{category}</span>
                {category === activeCategory && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-sm" />
                )}
              </button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    tag === activeTag
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectCardsRef.current[index] = el as HTMLDivElement
                }}
              >
                <ProjectCard3D project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="relative min-h-screen overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
          `,
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
          {/* Contact Title */}
          <h2
            ref={contactTitleRef}
            className="text-6xl md:text-8xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 100px rgba(34, 197, 94, 0.8)",
              filter: "drop-shadow(0 0 30px rgba(34, 197, 94, 0.5))",
            }}
          >
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-6">Let`s Create Something Amazing</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I`m always excited to work on new projects and collaborate with amazing people. Whether you have a
                  project in mind or just want to chat about technology, feel free to reach out!
                </p>

                <div className="space-y-6">
                  {[
                    { icon: "📧", label: "Email", value: "mahmedyk789@gmail.com" },
                    { icon: "📱", label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: "📍", label: "Location", value: "San Francisco, CA" },
                    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/ahmedyarkhan" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-xl">
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

            {/* Contact Form */}
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
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default ProjectShowcase