import { ArrowUpRight, Github } from "lucide-react";
import ProjectCardStack from "@/components/project-card-stack";
import { oswald } from "@/data/constants/fonts";
import { cn } from "@/lib/utils";
import { Bullet, TechTag } from "./tech-tag";

/** Live link for a project: direct when there's one URL, via /go/<slug> fallback routing when there are several. */
export function liveHref(slug: string, liveUrls: readonly string[]): string {
  return liveUrls.length > 1 ? `/go/${slug}` : liveUrls[0] ?? "#";
}

/** Green "● Live" pill, or an amber pulsing status note (e.g. Work in Progress). */
export function StatusNote({ note }: { note: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      {note}
    </span>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
      Live
    </span>
  );
}

const footerLink = "inline-flex items-center gap-1.5 text-sm font-semibold transition-colors";

/** Project card (design doc §12): browser-style cover with the screenshot stack, then name, pitch, bullets, tags, links. */
export function ProjectCard({
  index,
  slug,
  title,
  pitch,
  highlights,
  screenshots,
  statusNote,
  github,
  liveUrls,
  techStack,
}: {
  index: number;
  slug: string;
  title: string;
  pitch: string;
  highlights: readonly string[];
  screenshots: readonly string[];
  statusNote?: string;
  github: string;
  liveUrls: readonly string[];
  techStack: readonly string[];
}) {
  return (
    <article className="group/card relative hover:z-30 flex h-full flex-col overflow-visible rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      {/* Cover: browser chrome + grid texture + glow, holding the screenshot stack */}
      <div className="relative rounded-t-2xl border-b border-border bg-secondary/40">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">{String(index).padStart(2, "0")}</span>
        </div>
        <div className="relative px-6 pb-6 pt-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-b-none text-foreground/[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{ background: "radial-gradient(60% 60% at 50% 40%, hsl(var(--primary) / 0.22), transparent 70%)" }}
          />
          <ProjectCardStack screenshots={screenshots} title={title} className="relative" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className={cn(oswald.className, "text-3xl font-bold uppercase tracking-tight")}>{title}</h3>
          {statusNote ? <StatusNote note={statusNote} /> : <LiveBadge />}
        </div>
        <p className="mt-2 text-sm font-medium">{pitch}</p>

        {highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {highlights.map((h) => (
              <Bullet key={h}>{h}</Bullet>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        {/* Pinned to the bottom so both cards line up */}
        <div className="mt-auto flex items-center gap-6 pt-6">
          <a
            href={liveHref(slug, liveUrls)}
            target="_blank"
            rel="noreferrer"
            className={cn(footerLink, "text-primary hover:underline")}
          >
            Live demo <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className={cn(footerLink, "text-muted-foreground hover:text-foreground")}
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
