import type { Metadata } from "next";
import GlassPanel from "@/components/glass/GlassPanel";
import SectionHeading from "@/components/shared/SectionHeading";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me.",
};

const contactLinks = [
  {
    label: "Email",
    value: siteConfig.social.email,
    href: `mailto:${siteConfig.social.email}`,
  },
  {
    label: "GitHub",
    value: "github.com/minrui-z",
    href: siteConfig.social.github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/minjuic",
    href: siteConfig.social.linkedin,
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <SectionHeading
        title="Contact"
        subtitle="Feel free to reach out for collaborations or inquiries"
        align="center"
      />
      <GlassPanel className="text-center">
        <p className="text-lg text-foreground/70 mb-8">
          I&apos;m always interested in new opportunities in both academic
          research and visual design. Let&apos;s connect.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group block p-4 rounded-xl border border-black/8 hover:border-black/15 hover:bg-white/50 transition-all"
            >
              <span className="block text-xs uppercase tracking-wider text-foreground/40 mb-1">
                {link.label}
              </span>
              <span className="text-sm font-medium group-hover:text-accent-warm transition-colors break-all">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
