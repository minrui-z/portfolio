"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { staggerContainer, fadeInUp, softSpring } from "@/lib/motion";
import GlassButton from "@/components/glass/GlassButton";

const letterReveal = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.04,
      type: "spring" as const,
      stiffness: 150,
      damping: 20,
    },
  }),
};

const lineSlide = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  const nameChars = siteConfig.nameEn.split("");

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-20"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Left column — big type + CTA */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-center">
          {/* Overline */}
          <motion.span
            variants={fadeInUp}
            className="text-xs tracking-[0.35em] uppercase text-accent-warm font-medium mb-6"
          >
            Political Science &times; Data Analysis
          </motion.span>

          {/* Name — large editorial style */}
          <div className="overflow-hidden mb-2" style={{ perspective: 600 }}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-serif font-bold tracking-tight leading-[0.9] text-foreground">
              {siteConfig.name}
            </h1>
          </div>

          {/* English name — character-by-character reveal */}
          <div className="overflow-hidden flex flex-wrap mb-4" style={{ perspective: 400 }}>
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterReveal}
                initial="hidden"
                animate="visible"
                className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground/40"
                style={{ display: "inline-block", transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Accent line */}
          <motion.div
            variants={lineSlide}
            className="w-32 h-[2px] bg-accent-warm origin-left mb-8"
          />

          {/* Tagline — bold statement */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-foreground/65 max-w-xl leading-relaxed mb-10"
          >
            政治大學政治學系碩士生，研究領域為
            <span className="text-foreground font-medium">選舉研究</span>
            與
            <span className="text-foreground font-medium">民意調查方法</span>
            ，同時從事學術活動視覺設計。
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
            <GlassButton href="/research" variant="accent" size="lg">
              Research
            </GlassButton>
            <GlassButton href="/design" size="lg">
              Design Works
            </GlassButton>
            <span className="hidden sm:block w-px h-8 bg-foreground/15 mx-2" />
            <a
              href="#featured"
              className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors tracking-wide"
            >
              Scroll to explore &darr;
            </a>
          </motion.div>
        </div>

        {/* Right column — portrait + decorative frame */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            {/* Decorative offset frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, ...softSpring }}
              className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-accent-warm/20"
            />

            {/* Photo container */}
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border border-black/8 shadow-2xl shadow-black/10 bg-surface-alt">
              <Image
                src="/avatar.JPEG"
                alt={siteConfig.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, ...softSpring }}
              className="absolute -bottom-6 -left-6 bg-white/60 border border-black/6 rounded-xl px-4 py-2.5 shadow-sm"
            >
              <p className="text-xs text-foreground/50 tracking-wider uppercase">NCCU</p>
              <p className="text-sm font-medium text-foreground">政治學碩士生</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, ...softSpring }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-accent-warm/50 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
}
