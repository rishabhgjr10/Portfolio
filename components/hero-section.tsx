import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { oswald } from "@/data/constants/fonts";
import profileImg from "@/public/profile.jpg";
import { personalInfo, RESUME_URL } from "@/data/index";
import { HERO_ACTIONS_ID } from "@/lib/dom-ids";
import { cn } from "@/lib/utils";

/** Staggered "rise" entrance (design doc §7); skipped when the visitor prefers reduced motion. */
const RISE = "motion-safe:animate-rise";
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function GhostButton({ href, icon, label, title }: { href: string; icon: ReactNode; label: string; title?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary",
        focusRing
      )}
    >
      {icon}
      {label}
    </a>
  );
}

export default function HeroSection() {
  const [firstName, ...rest] = personalInfo.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-12 lg:pb-16">
      <div className="grid items-center gap-12 lg:gap-14 lg:grid-cols-[1.25fr_1fr]">
        {/* Text */}
        <div className="flex flex-col items-start">
          <span
            style={delay(0)}
            className={cn(
              RISE,
              "inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success"
            )}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {personalInfo.availability}
          </span>

          <h1
            style={delay(80)}
            className={cn(
              RISE,
              oswald.className,
              "mt-5 font-bold uppercase leading-[0.9] tracking-tight text-6xl sm:text-7xl lg:text-8xl"
            )}
          >
            <span className="block">{firstName}</span>
            <span className="block text-primary">{lastName}</span>
          </h1>

          <p style={delay(160)} className={cn(RISE, "mt-6 text-xl font-semibold")}>
            {personalInfo.role} <span className="text-muted-foreground">@</span>{" "}
            <span className="text-primary">{personalInfo.company}</span>
          </p>

          <p style={delay(220)} className={cn(RISE, "mt-4 max-w-xl leading-relaxed text-muted-foreground")}>
            {personalInfo.tagline}
          </p>

          <ul style={delay(280)} className={cn(RISE, "mt-6 flex flex-wrap gap-2")} aria-label="Core stack">
            {personalInfo.heroSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground/90"
              >
                {skill}
              </li>
            ))}
          </ul>

          <div id={HERO_ACTIONS_ID} style={delay(340)} className={cn(RISE, "mt-8 flex flex-wrap items-center gap-3")}>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5",
                focusRing
              )}
            >
              View Resume
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <GhostButton href={personalInfo.github} icon={<FaGithub className="h-4 w-4" />} label="GitHub" />
            <GhostButton href={personalInfo.linkedin} icon={<FaLinkedinIn className="h-4 w-4" />} label="LinkedIn" />
            <GhostButton
              href={personalInfo.codolio}
              icon={<Code2 className="h-4 w-4" />}
              label="Codolio"
              title="Coding profiles: LeetCode, CodeChef, Codeforces and more"
            />
          </div>

          <p
            style={delay(340)}
            className={cn(RISE, "mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground")}
          >
            <MapPin className="h-4 w-4" />
            {personalInfo.location}
          </p>
        </div>

        {/* Photo card — first on mobile, right column on desktop */}
        <div style={delay(120)} className={cn(RISE, "order-first lg:order-last mx-auto w-full max-w-sm lg:max-w-none")}>
          <div className="group relative">
            {/* Decorative tilted frame */}
            <div
              className="pointer-events-none absolute -inset-3 rotate-3 rounded-[34px] border border-primary/40"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-border bg-card shadow-glow">
              <Image
                src={profileImg}
                alt={personalInfo.name}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 384px"
                className="object-cover object-top grayscale transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent px-5 pb-5 pt-20">
                <p className="font-mono text-xs text-primary">{"// currently"}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{personalInfo.currently}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
