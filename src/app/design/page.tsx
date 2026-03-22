import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import DesignGallery from "@/components/design/DesignGallery";
import { designProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Design Works",
  description: "Visual identity, conference design, and graphic design projects.",
};

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionHeading
        title="Design Works"
        subtitle="Visual identity and conference design for academic institutions"
      />
      <DesignGallery projects={designProjects} />
    </div>
  );
}
