import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import ResearchList from "@/components/research/ResearchList";
import { researchProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Academic Research",
  description:
    "Academic research in political science, election studies, and survey methodology.",
};

export default function ResearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionHeading
        title="Academic Research"
        subtitle="Data-driven research in political science and survey methodology"
      />
      <ResearchList projects={researchProjects} />
    </div>
  );
}
