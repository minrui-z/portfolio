import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResearchProjectDetail from "@/components/research/ResearchProjectDetail";
import { researchProjects } from "@/data/projects";
import type { ResearchProject } from "@/types/project";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return researchProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = researchProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.abstract.slice(0, 160),
  };
}

export default async function ResearchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = researchProjects.find(
    (p): p is ResearchProject => p.slug === slug
  );
  if (!project) notFound();

  return <ResearchProjectDetail project={project} />;
}
