"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springScale } from "@/lib/motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

export default function GlassCard({
  children,
  className,
  hover = true,
  as: Component = "div",
}: GlassCardProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      variants={springScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.65)" } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      className={cn(
        "bg-white/50 border border-black/6 rounded-2xl shadow-sm shadow-black/4 p-6 transition-colors",
        className
      )}
    >
      {children}
    </MotionComponent>
  );
}
