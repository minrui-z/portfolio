"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import ProjectCard from "@/components/shared/ProjectCard";
import type { DesignProject } from "@/types/project";

interface DesignGalleryProps {
  projects: DesignProject[];
}

export default function DesignGallery({ projects }: DesignGalleryProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </motion.div>
  );
}
