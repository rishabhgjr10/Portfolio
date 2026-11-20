import type { ReactNode } from "react";
import { aboutHighlights, personalInfo } from "@/data/index";
import SectionHeading, { Accent } from "./section-heading";

/** Highlights: the company name in white, the "live in production" proof in amber. */
function emphasize(text: string): ReactNode {
  const marks: { phrase: string; className: string }[] = [
    { phrase: personalInfo.company, className: "font-semibold text-foreground" },
    { phrase: "two of them are live in production", className: "font-semibold text-primary" },
  ];
  const mark = marks.find((m) => text.includes(m.phrase));
  if (!mark) return text;
  const [before, ...after] = text.split(mark.phrase);
  return (
    <>
      {emphasize(before)}
      <span className={mark.className}>{mark.phrase}</span>
      {emphasize(after.join(mark.phrase))}
    </>
  );
}

export default function About() {
  return (
    <section className="pb-32 scroll-mt-24" id="about">
      <SectionHeading index={4} eyebrow="About">
        Building <Accent>backend</Accent> &amp; full-stack systems
      </SectionHeading>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          {personalInfo.summary.map((line) => (
            <p key={line}>{emphasize(line)}</p>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {aboutHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary [&>svg]:h-5 [&>svg]:w-5">
                {item.ico}
              </span>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
