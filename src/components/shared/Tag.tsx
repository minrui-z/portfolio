import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  variant?: "default" | "accent";
}

export default function Tag({ label, variant = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs rounded-full border",
        variant === "default"
          ? "bg-black/5 border-black/10 text-foreground/70"
          : "bg-accent-warm/10 border-accent-warm/30 text-accent-warm"
      )}
    >
      {label}
    </span>
  );
}
