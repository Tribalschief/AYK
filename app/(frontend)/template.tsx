// app/Template.tsx
"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Header from "@/components/Header/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const templateRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && templateRef.current) {
      // Fade in animation
      gsap.fromTo(
        templateRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Cleanup animation on exit
      return () => {
        gsap.to(templateRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      };
    }
  }, [pathname]);

  return (
    <div ref={templateRef} style={{ opacity: 0 }}>
      <Header />
      {children}
    </div>
  );
}