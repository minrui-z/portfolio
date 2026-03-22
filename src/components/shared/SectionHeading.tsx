"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("mb-12", align === "center" && "text-center")}
    >
      <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-foreground/60 text-lg">{subtitle}</p>
      )}
      <div
        className={cn(
          "mt-4 h-px w-16 bg-accent-warm/60",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
