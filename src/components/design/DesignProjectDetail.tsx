"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GlassPanel from "@/components/glass/GlassPanel";
import GlassButton from "@/components/glass/GlassButton";
import Tag from "@/components/shared/Tag";
import type { DesignProject } from "@/types/project";

interface DesignProjectDetailProps {
  project: DesignProject;
}

export default function DesignProjectDetail({
  project,
}: DesignProjectDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + project.images.length) % project.images.length);
  }, [lightboxIndex, project.images.length]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % project.images.length);
  }, [lightboxIndex, project.images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goPrev, goNext]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-6 py-12"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <GlassButton href="/design" size="sm">
            &larr; Back to Design
          </GlassButton>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4"
        >
          {project.title}
        </motion.h1>

        {project.titleEn && (
          <motion.p
            variants={fadeInUp}
            className="text-lg text-foreground/50 mb-6"
          >
            {project.titleEn}
          </motion.p>
        )}

        {/* Meta */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-10">
          <GlassPanel className="!p-4 !rounded-xl">
            <div className="flex flex-wrap gap-6 text-sm">
              {project.client && (
                <div>
                  <span className="text-foreground/40">Client</span>
                  <p className="font-medium">{project.client}</p>
                </div>
              )}
              {project.role && (
                <div>
                  <span className="text-foreground/40">Role</span>
                  <p className="font-medium">{project.role}</p>
                </div>
              )}
              <div>
                <span className="text-foreground/40">Year</span>
                <p className="font-medium">{project.date}</p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Tags */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="accent" />
          ))}
        </motion.div>

        {/* Description */}
        <motion.div variants={fadeInUp} className="mb-12">
          <p className="text-lg leading-relaxed text-foreground/80">
            {project.description}
          </p>
        </motion.div>

        {/* Image Gallery — original aspect ratio, clickable */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6"
        >
          {project.images.map((img, i) => (
            <motion.div
              key={img}
              variants={fadeInUp}
              className="rounded-2xl overflow-hidden bg-surface-alt/30 cursor-zoom-in"
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img}
                alt={`${project.title} - ${i + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/50 text-sm tabular-nums">
              {lightboxIndex + 1} / {project.images.length}
            </div>

            {/* Prev */}
            {project.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors"
                aria-label="Previous"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Next */}
            {project.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors"
                aria-label="Next"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
              className="max-w-[90vw] max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.images[lightboxIndex]}
                alt={`${project.title} - ${lightboxIndex + 1}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
