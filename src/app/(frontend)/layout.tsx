import "@/app/(frontend)/global.css"
import Header from "@/components/Header/Header"

export const metadata = {
  title: 'Ahmed Yar khan Portfolio',
  description: 'Freelance UI/UX Designer & Web Developer specializing in React, Next.js, GSAP animations, AI-driven solutions, and cloud computing.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        </body>
    </html>
  )
}

/*import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    // Initial fade-in animation
    gsap.fromTo(
      el,
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );

    // Page exit animation
    const handleRouteChange = () => {
      return new Promise<void>((resolve) => {
        gsap.to(el, {
          opacity: 0,
          x: 200,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => resolve(),
        });
      });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.pathname]);

  return (
    <div ref={pageRef} className="relative overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
*/