import { ArrowUp, Mail } from "lucide-react";
import { oswald } from "@/data/constants/fonts";
import { personalInfo } from "@/data/index";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

/**
 * 05 · Contact card (design doc §15) + footer bar (§16).
 * Resume / GitHub / LinkedIn live in the hero and the navbar, so they aren't repeated here.
 */
export default function Footer() {
  return (
    <footer className="container relative">
      <section id="contact" className="scroll-mt-24 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-20 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(55% 70% at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)" }}
          />
          <div className="relative flex flex-col items-center">
            <SectionHeading index={5} eyebrow="Contact" align="center" />
            <h2
              className={cn(
                oswald.className,
                "mt-4 max-w-3xl text-4xl sm:text-6xl font-bold uppercase leading-[0.95] tracking-tight"
              )}
            >
              {personalInfo.availability} <span className="text-primary">— let&apos;s talk.</span>
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Backend or full-stack, Java / Spring Boot or .NET. The fastest way to reach me is email.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Mail className="h-5 w-5" />
              {personalInfo.email}
            </a>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-3 border-t border-border py-8 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <a href="#" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
