import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesignProjectDetail from "@/components/design/DesignProjectDetail";
import { designProjects } from "@/data/projects";
import type { DesignProject } from "@/types/project";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return designProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = designProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.subtitle || project.description.slice(0, 160),
  };
}

export default async function DesignDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = designProjects.find(
    (p): p is DesignProject => p.slug === slug
  );
  if (!project) notFound();

  return <DesignProjectDetail project={project} />;
}
