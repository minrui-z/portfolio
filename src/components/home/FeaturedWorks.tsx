"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import type { Project } from "@/types/project";

interface FeaturedWorksProps {
  projects: Project[];
}

export default function FeaturedWorks({ projects }: FeaturedWorksProps) {
  return (
    <section id="featured" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Works"
          subtitle="Selected projects across research and design"
          align="center"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
