"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GlassPanel from "@/components/glass/GlassPanel";
import GlassButton from "@/components/glass/GlassButton";
import Tag from "@/components/shared/Tag";
import type { SoftwareProject } from "@/types/project";

interface SoftwareProjectDetailProps {
  project: SoftwareProject;
}

const statusLabel: Record<SoftwareProject["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  archived: "Archived",
};

const statusColor: Record<SoftwareProject["status"], string> = {
  completed: "text-emerald-600",
  "in-progress": "text-amber-500",
  archived: "text-foreground/40",
};

export default function SoftwareProjectDetail({ project }: SoftwareProjectDetailProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto px-6 py-12"
    >
      {/* Back */}
      <motion.div variants={fadeInUp} className="mb-8">
        <GlassButton href="/projects" size="sm">
          &larr; Back to Projects
        </GlassButton>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={fadeInUp}
        className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-3"
      >
        {project.title}
      </motion.h1>

      {project.titleEn && (
        <motion.p variants={fadeInUp} className="text-lg text-foreground/50 mb-6">
          {project.titleEn}
        </motion.p>
      )}

      {/* Meta */}
      <motion.div variants={fadeInUp} className="mb-8">
        <GlassPanel className="!p-4 !rounded-xl">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-foreground/40">Year</span>
              <p className="font-medium">{project.date}</p>
            </div>
            <div>
              <span className="text-foreground/40">Status</span>
              <p className={`font-medium ${statusColor[project.status]}`}>
                {statusLabel[project.status]}
              </p>
            </div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Tags */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} variant="accent" />
        ))}
      </motion.div>

      {/* Description */}
      <motion.div variants={fadeInUp} className="mb-10">
        <p className="text-lg leading-relaxed text-foreground/80">{project.description}</p>
      </motion.div>

      {/* Tech Stack */}
      {project.techStack.length > 0 && (
        <motion.div variants={fadeInUp} className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-foreground/40 mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-white/60 border border-black/8 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Features */}
      {project.features.length > 0 && (
        <motion.div variants={fadeInUp} className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-foreground/40 mb-3">Features</h2>
          <GlassPanel className="!p-5 !rounded-xl">
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-foreground/80">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-accent-warm/70" />
                  {f}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </motion.div>
      )}

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <motion.div variants={fadeInUp} className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-foreground/40 mb-3">Screenshots</h2>
          <div className="grid grid-cols-1 gap-4">
            {project.screenshots.map((src, i) => (
              <div key={src} className="rounded-2xl overflow-hidden border border-black/6 shadow-sm">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tech Details */}
      {project.techDetails && project.techDetails.length > 0 && (
        <motion.div variants={fadeInUp} className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-foreground/40 mb-3">Technical Details</h2>
          <GlassPanel className="!p-5 !rounded-xl">
            <ul className="space-y-2">
              {project.techDetails.map((detail) => (
                <li key={detail} className="flex gap-2 text-sm text-foreground/70">
                  <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-foreground/30" />
                  {detail}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </motion.div>
      )}

      {/* Download */}
      {project.releasesUrl && (
        <motion.div variants={fadeInUp} className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-foreground/40 mb-3">Download</h2>
          <GlassPanel className="!p-5 !rounded-xl">
            <ol className="space-y-2 mb-5">
              {[
                "前往 GitHub Releases 頁面，點選最新版本",
                "下載 .zip 壓縮檔並解壓縮",
                "將 app 拖入 Applications 資料夾",
                "首次啟動時系統會自動下載 AI 模型（約 1.5–2.9 GB）",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/80">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-accent-warm/15 text-accent-warm text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="text-xs text-foreground/40 mb-4">需要 macOS 13 Ventura 或更新版本 · 僅支援 Apple Silicon（M1 以上）</p>
            <GlassButton href={project.releasesUrl} size="md" external>
              前往下載頁面 &rarr;
            </GlassButton>
          </GlassPanel>
        </motion.div>
      )}

      {/* Links */}
      {(project.githubUrl || project.demoUrl) && (
        <motion.div variants={fadeInUp} className="flex gap-3 flex-wrap">
          {project.githubUrl && (
            <GlassButton href={project.githubUrl} size="md" external>
              GitHub &rarr;
            </GlassButton>
          )}
          {project.demoUrl && (
            <GlassButton href={project.demoUrl} size="md" external>
              Live Demo &rarr;
            </GlassButton>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
