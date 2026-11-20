import { skillGroups } from "@/data/index";
import SectionHeading, { Accent } from "./section-heading";

export default function Skills() {
  return (
    <section id="skills" className="pb-32 scroll-mt-24">
      <SectionHeading index={3} eyebrow="Skills">
        Tech I <Accent>work with</Accent>
      </SectionHeading>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <div
            key={group.label}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{group.label}</h3>
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
