import type React from "react"
import "./(frontend)/global.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header/Header"
import ScrollIndicator from "@/components/scroll-indicator"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ahmed Yar Khan | Next.js Developer | AI & Cloud Expert",
  description:
    "Full-stack developer specializing in Next.js, AI-driven solutions, and cloud computing. Experienced in building modern web applications with cutting-edge technologies.",
  keywords:
    "Ahmed Yar Khan, Next.js developer, agentic AI developer, cloud developer, web development, AI solutions, full-stack developer",
  authors: [{ name: "Ahmed Yar Khan" }],
  creator: "Ahmed Yar Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmedyarkhan.dev",
    title: "Ahmed Yar Khan | Next.js Developer | AI & Cloud Expert",
    description: "Full-stack developer specializing in Next.js, AI-driven solutions, and cloud computing.",
    siteName: "Ahmed Yar Khan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Yar Khan - Next.js Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Yar Khan | Next.js Developer | AI & Cloud Expert",
    description: "Full-stack developer specializing in Next.js, AI-driven solutions, and cloud computing.",
    creator: "@Ahmedkhakwanii",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmed Yar Khan",
              url: "https://ahmedyarkhan.vercel.app",
              jobTitle: "Next.js Developer, AI & Cloud Expert",
              sameAs: [
                "https://github.com/Tribalschief",
                "https://www.linkedin.com/in/ahmed-yar-khan/",
                "https://x.com/Ahmedkhakwanii",
              ],
              knowsAbout: ["Next.js", "React", "AI Development", "Cloud Computing", "Full-Stack Development"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        
          <Header />
          <ScrollIndicator />
          {children}
        
      </body>
    </html>
  )
}
