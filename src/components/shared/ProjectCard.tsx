"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import Tag from "./Tag";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const href =
    project.category === "design"
      ? `/design/${project.slug}`
      : project.category === "research"
      ? `/research/${project.slug}`
      : `/projects/${project.slug}`;

  const categoryLabel =
    project.category === "design"
      ? "Design"
      : project.category === "research"
      ? "Research"
      : "Project";

  const isSoftware = project.category === "software";

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link href={href} className="block h-full">
        <div className="h-full flex flex-col bg-white/50 border border-black/6 rounded-2xl overflow-hidden shadow-sm shadow-black/4 transition-colors hover:bg-white/65">
          {/* Thumbnail — design only */}
          {!isSoftware && project.thumbnail && (
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt/30 shrink-0">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 flex flex-col p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-accent-warm font-medium">
                {categoryLabel}
              </span>
              <span className="text-foreground/30">&middot;</span>
              <span className="text-xs text-foreground/50">{project.date}</span>
            </div>

            {/* Title row — icon on right for software */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg font-medium leading-snug line-clamp-2">
                {project.title}
              </h3>
              {isSoftware && project.thumbnail && (
                <div className="shrink-0 w-14 h-14 rounded-2xl overflow-hidden border border-black/8 shadow-sm">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {project.subtitle && (
              <p className="text-sm text-foreground/60 mb-3">
                {project.subtitle}
              </p>
            )}
            <div className="mt-auto flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
