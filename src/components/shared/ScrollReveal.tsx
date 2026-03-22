"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft";
  delay?: number;
  className?: string;
}

const animations = {
  fadeUp: { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
  scaleIn: { from: { opacity: 0, scale: 0.95 }, to: { opacity: 1, scale: 1 } },
  slideLeft: { from: { opacity: 0, x: -40 }, to: { opacity: 1, x: 0 } },
};

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = animations[animation];

    gsap.set(el, anim.from);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, {
          ...anim.to,
          duration: 0.8,
          delay,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [animation, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
