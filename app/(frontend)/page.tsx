"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  name: string
  description: string
  tech: string[]
  link: string
  status: "completed" | "in-progress" | "planning"
  details: string
}

interface Experience {
  company: string
  position: string
  duration: string
  location: string
  type: string
  description: string
  technologies: string[]
  achievements: string[]
}

interface SocialLink {
  key: string
  url: string
  description: string
}

interface Theme {
  name: string
  bg: string
  text: string
  accent: string
  secondary: string
  border: string
}

const themes: Theme[] = [
  {
    name: "classic",
    bg: "bg-black",
    text: "text-green-500",
    accent: "text-green-400",
    secondary: "text-yellow-400",
    border: "border-green-500",
  },
  {
    name: "amber",
    bg: "bg-black",
    text: "text-amber-500",
    accent: "text-amber-400",
    secondary: "text-orange-400",
    border: "border-amber-500",
  },
  {
    name: "blue",
    bg: "bg-slate-900",
    text: "text-blue-400",
    accent: "text-cyan-400",
    secondary: "text-sky-400",
    border: "border-blue-500",
  },
  {
    name: "matrix",
    bg: "bg-gray-900",
    text: "text-lime-400",
    accent: "text-lime-300",
    secondary: "text-emerald-400",
    border: "border-lime-500",
  },
  {
    name: "retro",
    bg: "bg-purple-900",
    text: "text-pink-400",
    accent: "text-pink-300",
    secondary: "text-purple-300",
    border: "border-pink-500",
  },
]

const experiences: Experience[] = [
  {
    company: "Giaic",
    position: "Fullstack and Cloud Native Ai Developer",
    duration: "Feb 2024 - Present",
    location: "Onsite",
    type: "Part-time",
    description:
      "Leading development of AI-powered web applications and cloud-native solutions for enterprise clients.",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "PostgreSQL",
      "OpenAI Agents",
      "FastApi",
      "Kubernetes",
    ],
    achievements: [
      "Built 1 production-ready SaaS applications",
      "Reduced deployment time by 60% using CI/CD pipelines",
      "Implemented AI chatbot increasing customer engagement by 40%",
      "Mentored 10 junior developers in modern web technologies",
    ],
  },
  {
    company: "upwork , linkedIn , X and etc",
    position: "Freelancer",
    duration: "Feb 2025 - present",
    location: "Hybrid",
    type: "Full-time",
    description: "Developed and maintained web applications using modern JavaScript frameworks and cloud technologies.",
    technologies: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Node.js",
      "JavaScript",
      "Git",
      "Heroku",
      "REST APIs",
      "JWT",
      "Tailwind CSS",
    ],
    achievements: [
      "Delivered 4+ websites for various clients",
      "Developed responsive web applications with 99.9% uptime",
      "Optimized database queries reducing load time by 35%",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Participated in code reviews and agile development processes",
    ],
  },
  {
    company: "Devedge",
    position: "Web Developer",
    duration: "May-2025 - June 2025",
    location: "Remote",
    type: "Freelance",
    description:
      "Provided web development services to small businesses and startups, focusing on modern web technologies.",
    technologies: ["Nextjs", "Tailwind", "Prisma", "React.js", "SQL", "Framer-motion", "MySQL", "gsap"],
    achievements: [
      "Achieved 100% client satisfaction rate",
      "Implemented e-commerce solutions increasing sales by 25%",
      "Provided ongoing maintenance and support services",
    ],
  },
]

const projects: Project[] = [
  {
    name: "aws-wordpress",
    description: "Visual deployment guide and architecture for AWS Wordpress setup",
    tech: ["AWS", "ec2", "S3", "load balancer", "Auto scaling"],
    link: "https://github.com/Tribalschief/Wordpress-in-AWS",
    status: "completed",
    details:
      "Created a detailed AWS Wordpress architecture guide featuring Multi-AZ setup, public/private subnets, load balancers, and S3 endpoints. Delivered Figma-ready SVG diagrams, validation checklists, and troubleshooting workflows to enhance DevOps collaboration.",
  },
  {
    name: "aws-vpc-architecture",
    description: "Visual deployment guide and architecture for AWS VPC setup",
    tech: ["AWS", "CloudFormation", "S3", "NAT Gateway", "Figma"],
    link: "https://github.com/Tribalschief/Vpc-With-Server",
    status: "completed",
    details:
      "Created a detailed AWS VPC architecture guide featuring Multi-AZ setup, public/private subnets, NAT gateways, and S3 endpoints. Delivered Figma-ready SVG diagrams, validation checklists, and troubleshooting workflows to enhance DevOps collaboration.",
  },
  {
    name: "ai-video-saas",
    description: "Full-stack AI-powered video generation SaaS platform",
    tech: ["Next.js", "OpenAI", "Supabase", "Clerk", "Tailwind CSS"],
    link: "https://github.com/Tribalschief/VideoStudio-Pro",
    status: "completed",
    details:
      "Built a SaaS platform that turns AI prompts into shareable short videos. Includes image generation, captioning, export features, and a UI/UX system optimized for creators. Integrated full-stack features for prompt workflows, user management, and premium feature gating.",
  },
  {
    name: "nextjs-blog-app",
    description: "High-performance blog CMS with custom themes and metadata",
    tech: ["Next.js", "Tailwind CSS", "CMS", "TypeScript"],
    link: "https://github.com/Tribalschief/NextBlogSanityWithAi",
    status: "completed",
    details:
      "Developed a modern blog platform with CMS integration, custom themes, and enhanced metadata features like reading time, tags, and author info. Included featured post sliders, optimized load speed, and responsive UI for a professional content experience.",
  },
  {
    name: "dededge-consulting-site",
    description: "Responsive business consulting website with SEO focus",
    tech: ["Next.js", "Tailwind CSS", "Figma", "SEO"],
    link: "https://github.com/Tribalschief/DevEdge",
    status: "completed",
    details:
      "Designing and building a sleek consulting firm site tailored to lead generation and clarity. Collaborating on branding alignment and layout direction. Implementing reusable components, server-side rendering, and SEO best practices.",
  },
  {
    name: "portfolio-website",
    description: "Interactive personal portfolio to showcase dev/design work",
    tech: ["Next.js", "Tailwind CSS", "Figma", "Framer Motion"],
    link: "https://github.com/Tribalschief/AYK",
    status: "completed",
    details:
      "Designed a personal portfolio site with smooth animations, interactive project displays, and case study links. Focused on performance, responsive design, SEO, and showcasing both development and design capabilities.",
  },
  {
    name: "picture-editing-site",
    description: "Picture editing platform with user roles and premium features",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Clerk"],
    link: "",
    status: "in-progress",
    details:
      "Created a role-based photo editing platform with free and premium tiers. Used Clerk for authentication, Supabase for real-time backend, and enabled advanced editing/export features for premium users. Focused on UX, access control, and content customization.",
  },
]

const socialLinks = {
  github: "https://github.com/Tribalschief",
  linkedin: "https://www.linkedin.com/in/ahmed-yar-khan/",
  twitter: "https://x.com/Ahmedkhakwanii",
  email: "mahmedyk789@gmail.com",
  portfolio: "https://ahmedyarkhan.vercel.app",
}

const TypewriterText = ({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      },
      delay + currentIndex * speed,
    )
    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, speed])

  return <span>{displayText}</span>
}

// Modal Components
const ProjectModal = ({ project, theme, onClose }: { project: Project; theme: Theme; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`${theme.bg} ${theme.text} ${theme.border} border-2 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto font-mono`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className={`text-xl font-bold ${theme.accent}`}>📁 {project.name}</h2>
        <button onClick={onClose} className={`${theme.secondary} hover:${theme.accent} text-xl`}>
          ✕
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className={`${theme.secondary} font-semibold mb-2`}>Description:</h3>
          <p className="text-sm">{project.description}</p>
        </div>
        <div>
          <h3 className={`${theme.secondary} font-semibold mb-2`}>Details:</h3>
          <p className="text-sm leading-relaxed">{project.details}</p>
        </div>
        <div>
          <h3 className={`${theme.secondary} font-semibold mb-2`}>Tech Stack:</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className={`px-2 py-1 ${theme.border} border rounded text-xs ${theme.accent}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className={`${theme.secondary} font-semibold mb-2`}>Status:</h3>
          <span
            className={`px-2 py-1 rounded text-xs ${
              project.status === "completed"
                ? theme.accent
                : project.status === "in-progress"
                  ? theme.secondary
                  : "text-blue-400"
            }`}
          >
            {project.status.toUpperCase()}
          </span>
        </div>
        <div className="pt-4 border-t border-gray-600">
          <button
            onClick={() => window.open(project.link, "_blank")}
            className={`${theme.bg} ${theme.accent} ${theme.border} border px-4 py-2 rounded hover:bg-opacity-20 hover:bg-current transition-colors`}
          >
            🔗 View on GitHub
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

const SocialModal = ({ social, theme, onClose }: { social: SocialLink; theme: Theme; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`${theme.bg} ${theme.text} ${theme.border} border-2 rounded-lg p-6 max-w-md w-full font-mono`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className={`text-xl font-bold ${theme.accent}`}>🔗 {social.key}</h2>
        <button onClick={onClose} className={`${theme.secondary} hover:${theme.accent} text-xl`}>
          ✕
        </button>
      </div>
      <div className="space-y-4">
        <p className="text-sm">{social.description}</p>
        <div className={`p-3 ${theme.border} border rounded bg-opacity-10 bg-current`}>
          <code className="text-xs break-all">{social.url}</code>
        </div>
        <button
          onClick={() => window.open(social.url, "_blank")}
          className={`w-full ${theme.bg} ${theme.accent} ${theme.border} border px-4 py-2 rounded hover:bg-opacity-20 hover:bg-current transition-colors`}
        >
          Open Link
        </button>
      </div>
    </motion.div>
  </motion.div>
)

const ExperienceModal = ({
  experience,
  theme,
  onClose,
}: { experience: Experience; theme: Theme; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`${theme.bg} ${theme.text} ${theme.border} border-2 rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto font-mono`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className={`text-xl font-bold ${theme.accent}`}>💼 {experience.position}</h2>
        <button onClick={onClose} className={`${theme.secondary} hover:${theme.accent} text-xl`}>
          ✕
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className={`${theme.secondary} font-semibold mb-1`}>Company:</h3>
            <p className="text-sm">{experience.company}</p>
          </div>
          <div>
            <h3 className={`${theme.secondary} font-semibold mb-1`}>Duration:</h3>
            <p className="text-sm">{experience.duration}</p>
          </div>
          <div>
            <h3 className={`${theme.secondary} font-semibold mb-1`}>Location:</h3>
            <p className="text-sm">{experience.location}</p>
          </div>
          <div>
            <h3 className={`${theme.secondary} font-semibold mb-1`}>Type:</h3>
            <p className="text-sm">{experience.type}</p>
          </div>
        </div>
        <div>
          <h3 className={`${theme.secondary} font-semibold mb-2`}>Description:</h3>
          <p className="text-sm leading-relaxed">{experience.description}</p>
        </div>
        <div>
          <h3 className={`${theme.secondary} font-semibold mb-2`}>Technologies Used:</h3>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span key={tech} className={`px-2 py-1 ${theme.border} border rounded text-xs ${theme.accent}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className={`${theme.secondary} font-semibold mb-2`}>Key Achievements:</h3>
          <ul className="space-y-1">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className={`${theme.accent} mr-2`}>•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

export default function Component() {
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState("")
  const [showCommands, setShowCommands] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(0)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<Project | Experience | SocialLink | null>(null)
  const [modalType, setModalType] = useState<"project" | "social" | "experience" | null>(null)
  const [bootComplete, setBootComplete] = useState(false)
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const theme = themes[currentTheme]

  // Animate dots for loading
  useEffect(() => {
    if (currentStep === 0) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 15 ? "" : prev + "."))
      }, 150)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Progress through boot sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 3000),
      setTimeout(() => setCurrentStep(2), 5000),
      setTimeout(() => setCurrentStep(3), 6500),
      setTimeout(() => setCurrentStep(4), 8000),
      setTimeout(() => setCurrentStep(5), 9500),
      setTimeout(() => setCurrentStep(6), 11000),
      setTimeout(() => setCurrentStep(7), 12500),
      setTimeout(() => setCurrentStep(8), 14000),
      setTimeout(() => setCurrentStep(9), 15500),
      setTimeout(() => setCurrentStep(10), 17000),
      setTimeout(() => {
        setShowCommands(true)
        setBootComplete(true)
      }, 18500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Focus input when boot is complete
  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [bootComplete])

  const handleProjectClick = (project: Project) => {
    setModalContent(project)
    setModalType("project")
    setShowModal(true)
  }

  const handleSocialClick = (key: string, url: string) => {
    setModalContent({ key, url, description: getSocialDescription(key) })
    setModalType("social")
    setShowModal(true)
  }

  const handleExperienceClick = (experience: Experience) => {
    setModalContent(experience)
    setModalType("experience")
    setShowModal(true)
  }

  const getSocialDescription = (key: string) => {
    const descriptions = {
      github: "Explore my open-source projects and contributions",
      linkedin: "Connect with me professionally",
      twitter: "Follow my tech journey and insights",
      email: "Get in touch for collaborations",
      portfolio: "Visit my complete portfolio website",
    }
    return descriptions[key as keyof typeof descriptions] || ""
  }

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    let response = ""

    switch (cmd) {
      case "help":
        response = `Available commands:
  help        - Show this help message
  clear       - Clear the terminal
  projects    - List all projects
  skills      - Show technical skills
  experience  - Show work experience
  contact     - Show contact information
  resume      - Download resume
  theme       - Switch terminal theme
  whoami      - Show profile information
  ls          - List directory contents
  cat skills  - Show skills in detail
  exit        - Close terminal`
        break
      case "clear":
        setCommandHistory([])
        setCurrentCommand("")
        return
      case "projects":
        response = `Projects:
${projects
  .map(
    (p, i) =>
      `  ${i + 1}. ${p.name} - ${p.description}
     Status: ${p.status} | Tech: ${p.tech.join(", ")}`,
  )
  .join("\n")}`
        break
      case "experience":
        response = `Work Experience:
${experiences
  .map(
    (exp, i) =>
      `${i + 1}. ${exp.position} at ${exp.company}
   Duration: ${exp.duration} | Location: ${exp.location} | Type: ${exp.type}
   Technologies: ${exp.technologies.join(", ")}
   
   Key Achievements:
${exp.achievements.map((achievement) => `   • ${achievement}`).join("\n")}`,
  )
  .join("\n\n")}`
        break
      case "skills":
        response = `Technical Skills:
  Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Vue.js
  Backend: Node.js, Python, Express.js, FastAPI, NestJS
  AI/ML: TensorFlow, PyTorch, OpenAI API, LangChain, Hugging Face
  Cloud: AWS, Docker, Kubernetes, Serverless, Terraform
  Database: PostgreSQL, MongoDB, Redis, Supabase, DynamoDB
  DevOps: CI/CD, GitHub Actions, Jenkins, Prometheus, Grafana`
        break
      case "contact":
        response = `Contact Information:
  Email: ${socialLinks.email}
  GitHub: ${socialLinks.github}
  LinkedIn: ${socialLinks.linkedin}
  Twitter: ${socialLinks.twitter}
  Portfolio: ${socialLinks.portfolio}`
        break
      case "resume":
        response = "Downloading resume... (This would trigger a download in a real implementation)"
        break
      case "theme":
        const nextTheme = (currentTheme + 1) % themes.length
        setCurrentTheme(nextTheme)
        response = `Theme switched to: ${themes[nextTheme].name}`
        break
      case "whoami":
        response = `Name: Ahmed
Role: Fullstack & AI Cloud Native Developer
Experience: 1+ Years
Location: Available Globally (Remote)
Status: Open to opportunities`
        break
      case "ls":
        response = `total 5
drwxr-xr-x 3 ahmed  4096 ${new Date().toLocaleDateString()} 10:30 ai-video-saas
drwxr-xr-x 3 ahmed  4096 ${new Date().toLocaleDateString()} 10:35 consulting-site
drwxr-xr-x 3 ahmed  4096  ${new Date().toLocaleDateString()} 10:40 blog-app
drwxr-xr-x 3 ahmed  4096 ${new Date().toLocaleDateString()} 10:45 Vpc-app
drwxr-xr-x 3 ahmed  4096 ${new Date().toLocaleDateString()} 10:50 portfolio-website`
        break
      case "cat skills":
        response = `{
  "frontend": ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  "backend": ["Node.js", "Python", "Express.js", "FastAPI", "NestJS"],
  "ai_ml": ["TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Hugging Face"],
  "cloud": ["AWS", "Docker", "Kubernetes", "Serverless", "Terraform"],
  "database": ["PostgreSQL", "MongoDB", "Redis", "Supabase", "DynamoDB"],
  "devops": ["CI/CD", "GitHub Actions", "Jenkins", "Prometheus", "Grafana"]
}`
        break
      case "exit":
        response = "Thanks for visiting! Connection closed."
        break
      default:
        response = `Command not found: ${command}. Type 'help' for available commands.`
    }

    setCommandHistory((prev) => [...prev, `ahmed@portfolio:~$ ${command}`, response])
    setCurrentCommand("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentCommand)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return theme.accent
      case "in-progress":
        return theme.secondary
      case "planning":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  const bootSequence = [
    {
      id: 0,
      content: (
        <div>
          <div className="mb-2">
            <TypewriterText text="Loading Ahmed`s Portfolio System" speed={80} />
          </div>
          <div className={theme.accent}>{dots}</div>
        </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="space-y-2">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">
            <TypewriterText text="Welcome to Ahmed`s Developer Terminal!" delay={500} />
          </div>
          <div className="mt-2">
            <TypewriterText text="Initializing portfolio data... Ready for exploration." delay={2000} />
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="space-y-2">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">
            <TypewriterText text="ahmed@portfolio:~$ whoami" delay={500} speed={100} />
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="space-y-2">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>
              <TypewriterText text="Name: Ahmed" delay={300} />
            </div>
            <div>
              <TypewriterText text="Role: Fullstack & AI Cloud Native Developer" delay={800} />
            </div>
            <div>
              <TypewriterText text="Experience: 1+ Years" delay={1300} />
            </div>
            <div>
              <TypewriterText text="Location: Available Globally (Remote)" delay={1800} />
            </div>
            <div>
              <TypewriterText text="Status: Open to opportunities" delay={2300} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="space-y-2">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>Name: Ahmed</div>
            <div>Role: Fullstack & AI Cloud Native Developer</div>
            <div>Experience: 1+ Years</div>
            <div>Location: Available Globally (Remote)</div>
            <div>Status: Open to opportunities</div>
          </div>
          <div className="mt-4">
            <TypewriterText text="ahmed@portfolio:~$ cat ~/.config/skills.json" delay={500} speed={80} />
          </div>
        </div>
      ),
    },
    {
      id: 5,
      content: (
        <div className="space-y-1">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>Name: Ahmed</div>
            <div>Role: Fullstack & AI Cloud Native Developer</div>
            <div>Experience: 1+ Years</div>
            <div>Location: Available Globally (Remote)</div>
            <div>Status: Open to opportunities</div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.config/skills.json</div>
          <div className={`mt-2 border-t border-b ${theme.border} py-2`}>
            <div className="text-center">
              <TypewriterText text="Technical Stack & Expertise" delay={300} />
            </div>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="ml-4">
              <span className={theme.secondary}>Frontend:</span>{" "}
              <TypewriterText text="React.js, Next.js, TypeScript, Tailwind CSS, Vue.js" delay={800} speed={30} />
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Backend:</span>{" "}
              <TypewriterText text="Node.js, Python, Express.js, FastAPI, NestJS" delay={1300} speed={30} />
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>AI/ML:</span>{" "}
              <TypewriterText text="TensorFlow, PyTorch, OpenAI API, LangChain, Hugging Face" delay={1800} speed={30} />
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Cloud:</span>{" "}
              <TypewriterText text="AWS, Docker, Kubernetes, Serverless, Terraform" delay={2300} speed={30} />
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Database:</span>{" "}
              <TypewriterText text="PostgreSQL, MongoDB, Redis, Supabase, DynamoDB" delay={2800} speed={30} />
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>DevOps:</span>{" "}
              <TypewriterText text="CI/CD, GitHub Actions, Jenkins, Prometheus, Grafana" delay={3300} speed={30} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      content: (
        <div className="space-y-1">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>Name: Ahmed</div>
            <div>Role: Fullstack & AI Cloud Native Developer</div>
            <div>Experience: 1+ Years</div>
            <div>Location: Available Globally (Remote)</div>
            <div>Status: Open to opportunities</div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.config/skills.json</div>
          <div className={`mt-2 border-t border-b ${theme.border} py-2`}>
            <div className="text-center">Technical Stack & Expertise</div>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="ml-4">
              <span className={theme.secondary}>Frontend:</span> React.js, Next.js, TypeScript, Tailwind CSS, Vue.js
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Backend:</span> Node.js, Python, Express.js, FastAPI, NestJS
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>AI/ML:</span> TensorFlow, PyTorch, OpenAI API, LangChain, Hugging Face
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Cloud:</span> AWS, Docker, Kubernetes, Serverless, Terraform
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Database:</span> PostgreSQL, MongoDB, Redis, Supabase, DynamoDB
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>DevOps:</span> CI/CD, GitHub Actions, Jenkins, Prometheus, Grafana
            </div>
          </div>
          <div className="mt-4">
            <TypewriterText text="ahmed@portfolio:~$ ls -la ~/projects/" delay={500} speed={80} />
          </div>
        </div>
      ),
    },
    {
      id: 7,
      content: (
        <div className="space-y-1">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>Name: Ahmed</div>
            <div>Role: Fullstack & AI Cloud Native Developer</div>
            <div>Experience: 1+ Years</div>
            <div>Location: Available Globally (Remote)</div>
            <div>Status: Open to opportunities</div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.config/skills.json</div>
          <div className={`mt-2 border-t border-b ${theme.border} py-2`}>
            <div className="text-center">Technical Stack & Expertise</div>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="ml-4">
              <span className={theme.secondary}>Frontend:</span> React.js, Next.js, TypeScript, Tailwind CSS, Vue.js
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Backend:</span> Node.js, Python, Express.js, FastAPI, NestJS
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>AI/ML:</span> TensorFlow, PyTorch, OpenAI API, LangChain, Hugging Face
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Cloud:</span> AWS, Docker, Kubernetes, Serverless, Terraform
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Database:</span> PostgreSQL, MongoDB, Redis, Supabase, DynamoDB
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>DevOps:</span> CI/CD, GitHub Actions, Jenkins, Prometheus, Grafana
            </div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ ls -la ~/projects/</div>
          <div className="mt-2 text-sm">
            <div className="ml-4">total 5</div>
            {projects.map((project, index) => (
              <div key={project.name} className="ml-4">
                <TypewriterText
                  text={`drwxr-xr-x 3 ahmed ahmed 4096 Dec ${String(15 + index).padStart(2, "0")} 10:${String(30 + index * 5).padStart(2, "0")} `}
                  delay={index * 200}
                  speed={20}
                />
                <button
                  onClick={() => handleProjectClick(project)}
                  className={`hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ${getStatusColor(project.status)} hover:bg-current`}
                >
                  <TypewriterText text={project.name} delay={index * 200 + 1000} speed={30} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 8,
      content: (
        <div className="space-y-1">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>Name: Ahmed</div>
            <div>Role: Fullstack & AI Cloud Native Developer</div>
            <div>Experience: 1+ Years</div>
            <div>Location: Available Globally (Remote)</div>
            <div>Status: Open to opportunities</div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.config/skills.json</div>
          <div className={`mt-2 border-t border-b ${theme.border} py-2`}>
            <div className="text-center">Technical Stack & Expertise</div>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="ml-4">
              <span className={theme.secondary}>Frontend:</span> React.js, Next.js, TypeScript, Tailwind CSS, Vue.js
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Backend:</span> Node.js, Python, Express.js, FastAPI, NestJS
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>AI/ML:</span> TensorFlow, PyTorch, OpenAI API, LangChain, Hugging Face
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Cloud:</span> AWS, Docker, Kubernetes, Serverless, Terraform
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Database:</span> PostgreSQL, MongoDB, Redis, Supabase, DynamoDB
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>DevOps:</span> CI/CD, GitHub Actions, Jenkins, Prometheus, Grafana
            </div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ ls -la ~/projects/</div>
          <div className="mt-2 text-sm">
            <div className="ml-4">total 5</div>
            {projects.map((project, index) => (
              <div key={project.name} className="ml-4">
                <span className="text-gray-400">
                  drwxr-xr-x 3 ahmed ahmed 4096 Dec {String(15 + index).padStart(2, "0")} 10:
                  {String(30 + index * 5).padStart(2, "0")}{" "}
                </span>
                <button
                  onClick={() => handleProjectClick(project)}
                  className={`hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ${getStatusColor(project.status)} hover:bg-current`}
                >
                  {project.name}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <TypewriterText text="ahmed@portfolio:~$ cat ~/.experience/work_history.json" delay={500} speed={80} />
          </div>
        </div>
      ),
    },
    {
      id: 9,
      content: (
        <div className="space-y-1">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>Name: Ahmed</div>
            <div>Role: Fullstack & AI Cloud Native Developer</div>
            <div>Experience: 1+ Years</div>
            <div>Location: Available Globally (Remote)</div>
            <div>Status: Open to opportunities</div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.config/skills.json</div>
          <div className={`mt-2 border-t border-b ${theme.border} py-2`}>
            <div className="text-center">Technical Stack & Expertise</div>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="ml-4">
              <span className={theme.secondary}>Frontend:</span> React.js, Next.js, TypeScript, Tailwind CSS, Vue.js
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Backend:</span> Node.js, Python, Express.js, FastAPI, NestJS
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>AI/ML:</span> TensorFlow, PyTorch, OpenAI API, LangChain, Hugging Face
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Cloud:</span> AWS, Docker, Kubernetes, Serverless, Terraform
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Database:</span> PostgreSQL, MongoDB, Redis, Supabase, DynamoDB
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>DevOps:</span> CI/CD, GitHub Actions, Jenkins, Prometheus, Grafana
            </div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ ls -la ~/projects/</div>
          <div className="mt-2 text-sm">
            <div className="ml-4">total 5</div>
            {projects.map((project, index) => (
              <div key={project.name} className="ml-4">
                <span className="text-gray-400">
                  drwxr-xr-x 3 ahmed ahmed 4096 Dec {String(15 + index).padStart(2, "0")} 10:
                  {String(30 + index * 5).padStart(2, "0")}{" "}
                </span>
                <button
                  onClick={() => handleProjectClick(project)}
                  className={`hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ${getStatusColor(project.status)} hover:bg-current`}
                >
                  {project.name}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.experience/work_history.json</div>
          <div className="mt-2 ml-4 space-y-2 text-sm">
            <div className={`${theme.accent} font-semibold`}>Work Experience Summary:</div>
            {experiences.map((exp, index) => (
              <div key={exp.company} className="ml-2">
                <button
                  onClick={() => handleExperienceClick(exp)}
                  className={`${theme.text} hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors hover:bg-current`}
                >
                  <TypewriterText
                    text={`${index + 1}. ${exp.position} at ${exp.company} (${exp.duration})`}
                    delay={index * 300}
                    speed={20}
                  />
                </button>
                <div className="ml-4 text-xs text-gray-400">
                  <TypewriterText
                    text={`Tech: ${exp.technologies.slice(0, 5).join(", ")}${exp.technologies.length > 5 ? "..." : ""}`}
                    delay={index * 300 + 500}
                    speed={15}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 10,
      content: (
        <div className="space-y-1">
          <div>Loading Ahmed`s Portfolio System</div>
          <div>................</div>
          <div className="mt-4">Welcome to Ahmed`s Developer Terminal!</div>
          <div>Initializing portfolio data... Ready for exploration.</div>
          <div className="mt-4">ahmed@portfolio:~$ whoami</div>
          <div className="mt-2 ml-4 space-y-1">
            <div>Name: Ahmed</div>
            <div>Role: Fullstack & AI Cloud Native Developer</div>
            <div>Experience: 1+ Years</div>
            <div>Location: Available Globally (Remote)</div>
            <div>Status: Open to opportunities</div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.config/skills.json</div>
          <div className={`mt-2 border-t border-b ${theme.border} py-2`}>
            <div className="text-center">Technical Stack & Expertise</div>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="ml-4">
              <span className={theme.secondary}>Frontend:</span> React.js, Next.js, TypeScript, Tailwind CSS, Vue.js
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Backend:</span> Node.js, Python, Express.js, FastAPI, NestJS
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>AI/ML:</span> TensorFlow, PyTorch, OpenAI API, LangChain, Hugging Face
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Cloud:</span> AWS, Docker, Kubernetes, Serverless, Terraform
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>Database:</span> PostgreSQL, MongoDB, Redis, Supabase, DynamoDB
            </div>
            <div className="ml-4">
              <span className={theme.secondary}>DevOps:</span> CI/CD, GitHub Actions, Jenkins, Prometheus, Grafana
            </div>
          </div>
          <div className="mt-4">ahmed@portfolio:~$ ls -la ~/projects/</div>
          <div className="mt-2 text-sm">
            <div className="ml-4">total 5</div>
            {projects.map((project, index) => (
              <div key={project.name} className="ml-4">
                <span className="text-gray-400">
                  drwxr-xr-x 3 ahmed ahmed 4096 Dec {String(15 + index).padStart(2, "0")} 10:
                  {String(30 + index * 5).padStart(2, "0")}{" "}
                </span>
                <button
                  onClick={() => handleProjectClick(project)}
                  className={`hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ${getStatusColor(project.status)} hover:bg-current`}
                >
                  {project.name}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.experience/work_history.json</div>
          <div className="mt-2 ml-4 space-y-2 text-sm">
            <div className={`${theme.accent} font-semibold`}>Work Experience Summary:</div>
            {experiences.map((exp, index) => (
              <div key={exp.company} className="ml-2">
                <button
                  onClick={() => handleExperienceClick(exp)}
                  className={`${theme.text} hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors hover:bg-current`}
                >
                  {index + 1}. {exp.position} at {exp.company} ({exp.duration})
                </button>
                <div className="ml-4 text-xs text-gray-400">
                  Tech: {exp.technologies.slice(0, 5).join(", ")}
                  {exp.technologies.length > 5 ? "..." : ""}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">ahmed@portfolio:~$ cat ~/.social/links.json</div>
          <div className="mt-2 ml-4 space-y-1 text-sm">
            <div>{"{"}</div>
            <div className="ml-4">
              <span className={`${theme.accent}`}>github:</span>
              <button
                onClick={() => handleSocialClick("github", socialLinks.github)}
                className={`${theme.text} hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ml-1 hover:bg-current`}
              >
                {socialLinks.github}
              </button>
              ,
            </div>
            <div className="ml-4">
              <span className={`${theme.accent}`}>linkedin:</span>
              <button
                onClick={() => handleSocialClick("linkedin", socialLinks.linkedin)}
                className={`${theme.text} hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ml-1 hover:bg-current`}
              >
                {socialLinks.linkedin}
              </button>
              ,
            </div>
            <div className="ml-4">
              <span className={`${theme.accent}`}>twitter:</span>
              <button
                onClick={() => handleSocialClick("twitter", socialLinks.twitter)}
                className={`${theme.text} hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ml-1 hover:bg-current`}
              >
                {socialLinks.twitter}
              </button>
              ,
            </div>
            <div className="ml-4">
              <span className={`${theme.accent}`}>email:</span>
              <button
                onClick={() => handleSocialClick("email", `mailto:${socialLinks.email}`)}
                className={`${theme.text} hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ml-1 hover:bg-current`}
              >
                {socialLinks.email}
              </button>
              ,
            </div>
            <div className="ml-4">
              <span className={`${theme.accent}`}>portfolio:</span>
              <button
                onClick={() => handleSocialClick("portfolio", socialLinks.portfolio)}
                className={`${theme.text} hover:bg-opacity-30 px-1 rounded cursor-pointer transition-colors ml-1 hover:bg-current`}
              >
                {socialLinks.portfolio}
              </button>
            </div>
            <div>{"}"}</div>
          </div>

          {/* Command History */}
          {commandHistory.length > 0 && (
            <div className="mt-4 space-y-1">
              {commandHistory.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Interactive Command Input */}
          {bootComplete && (
            <div className="mt-4 flex items-center">
              <span>ahmed@portfolio:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`bg-transparent border-none outline-none flex-1 ml-1 ${theme.text}`}
                placeholder="Type 'help' for commands..."
              />
              <motion.div
                className={`w-2 h-5 ${theme.text.replace("text-", "bg-")} ml-1`}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
            </div>
          )}

          {showCommands && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-4 p-3 border ${theme.border} rounded`}
            >
              <div className={`text-center text-sm ${theme.accent} mb-2`}>
                <TypewriterText text="💡 Available Commands:" delay={0} speed={50} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className={theme.secondary}>help</span> - Show all commands
                </div>
                <div>
                  <span className={theme.secondary}>clear</span> - Clear terminal
                </div>
                <div>
                  <span className={theme.secondary}>projects</span> - View project details
                </div>
                <div>
                  <span className={theme.secondary}>experience</span> - Work experience
                </div>
                <div>
                  <span className={theme.secondary}>contact</span> - Get contact info
                </div>
                <div>
                  <span className={theme.secondary}>skills</span> - Technical skills
                </div>
              </div>
              <div className={`mt-2 text-center text-xs ${theme.text}`}>
                <TypewriterText
                  text="Click on any project, experience, or social link to open! 🚀"
                  delay={1000}
                  speed={30}
                />
              </div>
            </motion.div>
          )}
        </div>
      ),
    },
  ]

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} font-mono p-3 sm:p-6 overflow-hidden transition-all duration-500`}
    >
      {/* Theme Selector Button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className={`px-3 py-2 ${theme.border} border rounded ${theme.accent} hover:bg-opacity-20 hover:bg-current transition-all duration-300`}
          title="Change Theme"
        >
          🎨 {theme.name}
        </button>

        {/* Theme Selector Dropdown */}
        <AnimatePresence>
          {showThemeSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-12 right-0 ${theme.bg} ${theme.border} border rounded-lg shadow-lg p-2 min-w-48`}
            >
              <div className={`text-xs ${theme.accent} mb-2 px-2 py-1`}>Select Theme:</div>
              {themes.map((themeOption, index) => (
                <button
                  key={themeOption.name}
                  onClick={() => {
                    setCurrentTheme(index)
                    setShowThemeSelector(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all duration-200 ${
                    currentTheme === index
                      ? `${themeOption.accent} bg-opacity-20 bg-current`
                      : `${themeOption.text} hover:bg-opacity-10 hover:bg-current`
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{themeOption.name}</span>
                    {currentTheme === index && <span>✓</span>}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-full overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentStep}-${currentTheme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="whitespace-pre-wrap text-xs sm:text-sm md:text-base"
          >
            {bootSequence[currentStep]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showModal && modalType === "project" && modalContent && "name" in modalContent && (
          <ProjectModal project={modalContent as Project} theme={theme} onClose={() => setShowModal(false)} />
        )}
        {showModal && modalType === "social" && modalContent && "key" in modalContent && (
          <SocialModal social={modalContent as SocialLink} theme={theme} onClose={() => setShowModal(false)} />
        )}
        {showModal && modalType === "experience" && modalContent && "company" in modalContent && (
          <ExperienceModal experience={modalContent as Experience} theme={theme} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
