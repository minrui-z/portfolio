import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectList from "@/components/projects/ProjectList";
import { softwareProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software tools and side projects.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionHeading
        title="Projects"
        subtitle="Software tools and side projects"
      />
      <ProjectList projects={softwareProjects} />
    </div>
  );
}
