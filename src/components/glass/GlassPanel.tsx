import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <section
      className={cn(
        "bg-white/50 border border-black/6 rounded-3xl shadow-sm shadow-black/4 p-8 md:p-12",
        className
      )}
    >
      {children}
    </section>
  );
}
