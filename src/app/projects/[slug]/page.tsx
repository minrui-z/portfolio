import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SoftwareProjectDetail from "@/components/projects/SoftwareProjectDetail";
import { softwareProjects } from "@/data/projects";
import type { SoftwareProject } from "@/types/project";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return softwareProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = softwareProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.subtitle || project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = softwareProjects.find(
    (p): p is SoftwareProject => p.slug === slug
  );
  if (!project) notFound();

  return <SoftwareProjectDetail project={project} />;
}
