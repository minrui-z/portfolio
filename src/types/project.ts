export type ProjectCategory = "design" | "research" | "software";

export interface ProjectBase {
  slug: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  category: ProjectCategory;
  tags: string[];
  date: string;
  thumbnail: string;
  featured: boolean;
}

export interface DesignProject extends ProjectBase {
  category: "design";
  images: string[];
  description: string;
  client?: string;
  role?: string;
}

export interface ResearchProject extends ProjectBase {
  category: "research";
  abstract: string;
  venue: string;
  venueEn?: string;
  institution: string;
  coAuthors?: string[];
  pdfUrl?: string;
  slidesUrl?: string;
  posterUrl?: string;
  figures?: string[];
  methodology?: string[];
  keyFindings?: string[];
}

export interface SoftwareProject extends ProjectBase {
  category: "software";
  description: string;
  techStack: string[];
  features: string[];
  techDetails?: string[];
  githubUrl?: string;
  demoUrl?: string;
  releasesUrl?: string;
  screenshots?: string[];
  status: "completed" | "in-progress" | "archived";
}

export type Project = DesignProject | ResearchProject | SoftwareProject;
