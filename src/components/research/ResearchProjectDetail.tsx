"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GlassPanel from "@/components/glass/GlassPanel";
import GlassButton from "@/components/glass/GlassButton";
import Tag from "@/components/shared/Tag";
import PowerConflictViz from "@/components/research/viz/PowerConflictViz";
import HousingBiasViz from "@/components/research/viz/HousingBiasViz";
import type { ResearchProject } from "@/types/project";

interface ResearchProjectDetailProps {
  project: ResearchProject;
}

export default function ResearchProjectDetail({
  project,
}: ResearchProjectDetailProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Back */}
      <motion.div variants={fadeInUp} className="mb-8">
        <GlassButton href="/research" size="sm">
          &larr; Back to Research
        </GlassButton>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={fadeInUp}
        className="text-2xl md:text-4xl font-serif font-bold tracking-tight mb-3"
      >
        {project.title}
      </motion.h1>

      {project.titleEn && project.titleEn !== project.title && (
        <motion.p
          variants={fadeInUp}
          className="text-lg text-foreground/50 italic mb-6"
        >
          {project.titleEn}
        </motion.p>
      )}

      {/* Venue & Institution */}
      <motion.div variants={fadeInUp} className="mb-8">
        <GlassPanel className="!p-5 !rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-foreground/40">Venue</span>
              <p className="font-medium">{project.venue}</p>
              {project.venueEn && (
                <p className="text-xs text-foreground/40 mt-0.5">
                  {project.venueEn}
                </p>
              )}
            </div>
            <div>
              <span className="text-foreground/40">Institution</span>
              <p className="font-medium">{project.institution}</p>
            </div>
            <div>
              <span className="text-foreground/40">
                {project.coAuthors ? "Authors" : "Year"}
              </span>
              {project.coAuthors ? (
                <p className="font-medium">
                  {project.coAuthors.join(", ")}
                </p>
              ) : (
                <p className="font-medium">{project.date}</p>
              )}
            </div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Methodology Tags */}
      {project.methodology && project.methodology.length > 0 && (
        <motion.div variants={fadeInUp} className="mb-8">
          <h3 className="text-sm text-foreground/40 mb-2">Methodology</h3>
          <div className="flex flex-wrap gap-2">
            {project.methodology.map((m) => (
              <Tag key={m} label={m} variant="accent" />
            ))}
          </div>
        </motion.div>
      )}

      {/* Abstract */}
      <motion.div variants={fadeInUp} className="mb-10">
        <GlassPanel>
          <h3 className="text-sm uppercase tracking-wider text-foreground/40 mb-4">
            Abstract
          </h3>
          <p className="text-base leading-relaxed text-foreground/80">
            {project.abstract}
          </p>
        </GlassPanel>
      </motion.div>

      {/* Key Findings */}
      {project.keyFindings && project.keyFindings.length > 0 && (
        <motion.div variants={fadeInUp} className="mb-10">
          <GlassPanel>
            <h3 className="text-sm uppercase tracking-wider text-foreground/40 mb-4">
              Key Findings
            </h3>
            <ul className="space-y-3">
              {project.keyFindings.map((finding, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <span className="shrink-0 w-6 h-6 rounded-lg bg-accent-warm/15 text-accent-warm text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span className="text-base leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </motion.div>
      )}

      {/* Interactive Visualization */}
      {(project.slug === "power-conflict-survival" ||
        project.slug === "housing-survey-bias") && (
        <motion.div variants={fadeInUp} className="mb-10">
          <h3 className="text-sm uppercase tracking-wider text-foreground/40 mb-4">
            Data Visualization
          </h3>
          {project.slug === "power-conflict-survival" && <PowerConflictViz />}
          {project.slug === "housing-survey-bias" && <HousingBiasViz />}
        </motion.div>
      )}

      {/* Topic Tags */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-10">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </motion.div>

      {/* Poster Image */}
      {project.posterUrl && (
        <motion.div variants={fadeInUp} className="mb-10">
          <h3 className="text-sm uppercase tracking-wider text-foreground/40 mb-4">
            Conference Poster
          </h3>
          <div className="relative w-full rounded-2xl overflow-hidden border border-black/8 bg-white/30">
            <Image
              src={project.posterUrl}
              alt={`${project.title} - Poster`}
              width={1200}
              height={900}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        </motion.div>
      )}

      {/* Figures */}
      {project.figures && project.figures.length > 0 && (
        <motion.div variants={staggerContainer} className="space-y-6 mb-10">
          <h3 className="text-sm uppercase tracking-wider text-foreground/40">
            Key Figures
          </h3>
          {project.figures.map((fig, i) => (
            <motion.div
              key={fig}
              variants={fadeInUp}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/30 border border-black/8"
            >
              <Image
                src={fig}
                alt={`Figure ${i + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Download Buttons */}
      {(project.pdfUrl || project.slidesUrl || project.posterUrl) && (
        <motion.div variants={fadeInUp} className="mt-10">
          <h3 className="text-sm uppercase tracking-wider text-foreground/40 mb-4">
            Downloads
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.pdfUrl && (
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-warm/10 border border-accent-warm/30 text-foreground font-medium text-sm hover:bg-accent-warm/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Full Report (PDF)
              </a>
            )}
            {project.slidesUrl && (
              <a
                href={project.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/50 border border-black/8 text-foreground font-medium text-sm hover:bg-white/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Slides (PDF)
              </a>
            )}
            {project.posterUrl && (
              <a
                href={project.posterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/50 border border-black/8 text-foreground font-medium text-sm hover:bg-white/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Poster (PNG)
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
