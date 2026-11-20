import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, GraduationCap, MapPin } from "lucide-react";
import { oswald } from "@/data/constants/fonts";
import { education, experience } from "@/data/index";
import { cn } from "@/lib/utils";
import SectionHeading, { Accent } from "./section-heading";
import { Bullet, TechTag } from "./ui/tech-tag";

const INLINE_IMPACTS = 3;

/** Bold amber leading metric ("10+", "98%") so numbers stand out at a glance. */
function withMetric(text: string) {
  const match = text.match(/\d+(?:\.\d+)?\s?[+%]+/);
  if (!match || match.index === undefined) return text;
  const end = match.index + match[0].length;
  return (
    <>
      {text.slice(0, match.index)}
      <strong className="font-bold text-primary">{match[0]}</strong>
      {text.slice(end)}
    </>
  );
}

function SideLabel({ children }: { children: string }) {
  return <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{children}</h3>;
}

export default function Experience() {
  const featured = experience.filter((r) => r.featured);
  const earlier = experience.filter((r) => !r.featured);

  return (
    <section className="pb-32 scroll-mt-24" id="experience">
      <SectionHeading index={1} eyebrow="Experience">
        Where I <Accent>work</Accent>
      </SectionHeading>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Current role — featured card */}
        <div className="space-y-6">
          {featured.map((role) => (
            <article
              key={role.id}
              className="rounded-2xl border border-primary/50 bg-card p-6 sm:p-7 shadow-glow"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  {role.logo ? (
                    <Image
                      src={role.logo}
                      alt={`${role.company} logo`}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-xl ring-1 ring-border"
                    />
                  ) : (
                    <span
                      className={cn(
                        oswald.className,
                        "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-xl font-bold text-primary-foreground"
                      )}
                    >
                      {role.company[0]}
                    </span>
                  )}
                  <div>
                    <h3 className="text-lg font-bold">{role.title}</h3>
                    <p className="text-sm font-medium text-primary">
                      {role.company}
                      {role.type && <span className="text-muted-foreground"> · {role.type}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {role.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {role.location}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{role.description}</p>

              {role.impacts && role.impacts.length > 0 && (
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
                  {role.impacts.slice(0, INLINE_IMPACTS).map((impact) => (
                    <Bullet key={impact.number}>{withMetric(impact.description)}</Bullet>
                  ))}
                </ul>
              )}

              {role.skills && role.skills.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <TechTag key={skill}>{skill}</TechTag>
                  ))}
                </div>
              )}

              {role.impacts && role.impacts.length > INLINE_IMPACTS && (
                <Link
                  href={`/experience/${role.id}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  All {role.impacts.length} impacts
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </article>
          ))}
        </div>

        {/* Earlier roles + education */}
        <div className="space-y-10">
          {earlier.length > 0 && (
            <div>
              <SideLabel>Earlier</SideLabel>
              <ol className="mt-5 ml-1.5 space-y-6 border-l border-border">
                {earlier.map((role) => (
                  <li key={role.id} className="relative pl-6">
                    <span
                      className="absolute -left-[5.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-semibold">{role.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {role.company} · {role.period}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div id="education" className="scroll-mt-24">
            <SideLabel>Education</SideLabel>
            {education.map((entry) => (
              <div
                key={entry.degree}
                className="mt-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <GraduationCap className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-semibold">{entry.degree}</p>
                <p className="text-xs text-muted-foreground">{entry.institution}</p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <span className="text-xs text-muted-foreground">{entry.period}</span>
                  <span className="flex items-baseline gap-1.5">
                    <span className={cn(oswald.className, "text-3xl font-bold text-primary leading-none")}>
                      {entry.grade.replace(/\s*CGPA/i, "")}
                    </span>
                    <span className="font-mono text-[11px] uppercase text-muted-foreground">CGPA</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
