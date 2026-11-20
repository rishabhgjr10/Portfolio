import { oswald } from "@/data/constants/fonts";
import { stats } from "@/data/index";
import { cn } from "@/lib/utils";

/** Proof strip under the hero: 4 across on desktop, 2×2 on mobile. */
export default function StatsStrip() {
  return (
    <section aria-label="Highlights" className="pb-24">
      <dl className="grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl border border-border bg-white/70 dark:bg-card/60 backdrop-blur">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "group flex flex-col gap-1 p-6 transition-colors hover:bg-accent",
              // Hairline dividers: columns on every row, plus the row break on mobile.
              i % 2 === 1 && "border-l border-border",
              i >= 2 && "border-t border-border md:border-t-0",
              i === 2 && "md:border-l"
            )}
          >
            <dt className="order-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              {s.label}
            </dt>
            <dd className={cn(oswald.className, "order-1 text-4xl font-bold text-primary")}>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
