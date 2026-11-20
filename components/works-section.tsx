import { ChevronDown, Github, ArrowUpRight } from "lucide-react";
import { ProjectCard, StatusNote, liveHref } from "@/components/ui/bento-grid";
import type { Project } from "@/data/index";
import SectionHeading, { Accent } from "./section-heading";

/** A project plus the screenshot URLs resolved on the server from its imageFolder. */
export interface ProjectWithScreenshots extends Project {
  screenshots: string[];
}

export default function Works({ projects }: { projects: ProjectWithScreenshots[] }) {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="pb-32 scroll-mt-24">
      <SectionHeading index={2} eyebrow="Projects">
        Built and <Accent>deployed</Accent>
      </SectionHeading>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {featured.map((item, i) => (
          <ProjectCard
            key={item.slug}
            index={i + 1}
            slug={item.slug}
            title={item.title}
            pitch={item.pitch}
            highlights={item.highlights}
            github={item.github}
            liveUrls={item.liveUrls}
            screenshots={item.screenshots}
            statusNote={item.statusNote}
            techStack={item.techStack}
          />
        ))}
      </div>

      {more.length > 0 && (
        <details className="group mt-8 rounded-2xl border border-border bg-card transition-colors open:border-primary/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm [&::-webkit-details-marker]:hidden">
            <span>
              <span className="font-semibold">More projects</span>{" "}
              <span className="text-muted-foreground">· smaller builds and works in progress ({more.length})</span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <ul className="divide-y divide-border border-t border-border">
            {more.map((p) => (
              <li key={p.slug} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold">{p.title}</span>
                    {p.statusNote && <StatusNote note={p.statusNote} />}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.pitch}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">{p.techStack.join(" · ")}</p>
                </div>
                <div className="flex shrink-0 gap-5 text-sm font-semibold">
                  <a
                    href={liveHref(p.slug, p.liveUrls)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
