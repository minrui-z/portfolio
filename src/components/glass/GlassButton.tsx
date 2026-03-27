"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

const sizeClasses = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export default function GlassButton({
  children,
  href,
  onClick,
  variant = "default",
  size = "md",
  className,
  external = false,
}: GlassButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors",
    "border shadow-sm shadow-black/4",
    variant === "default"
      ? "bg-white/50 border-black/6 hover:bg-white/65 text-foreground"
      : "bg-accent-warm/10 border-accent-warm/25 hover:bg-accent-warm/18 text-foreground",
    sizeClasses[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    if (external) {
      return (
        <motion.div {...motionProps} className="inline-block">
          <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
            {children}
          </a>
        </motion.div>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...motionProps} onClick={onClick} className={baseClasses}>
      {children}
    </motion.button>
  );
}
