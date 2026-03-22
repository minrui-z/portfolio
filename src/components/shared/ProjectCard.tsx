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
      : `/research/${project.slug}`;

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="bg-white/50 border border-black/6 rounded-2xl overflow-hidden shadow-sm shadow-black/4 transition-colors hover:bg-white/65">
          {/* Thumbnail — design only */}
          {project.category === "design" && (
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt/30">
              <div className="absolute inset-0 flex items-center justify-center text-foreground/20 text-sm">
                Design
              </div>
              {project.thumbnail && (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-accent-warm font-medium">
                {project.category === "design" ? "Design" : "Research"}
              </span>
              <span className="text-foreground/30">&middot;</span>
              <span className="text-xs text-foreground/50">{project.date}</span>
            </div>
            <h3 className="text-lg font-medium leading-snug mb-2 line-clamp-2">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-foreground/60 mb-3">
                {project.subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5">
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
