import type { ReactNode } from "react";
import { oswald } from "@/data/constants/fonts";
import { cn } from "@/lib/utils";

/**
 * Numbered chapter heading (design doc §10):
 *   ——— 01 · EXPERIENCE   (mono 12px amber, 0.3em tracking, 32px amber rule)
 *   WHERE I WORK          (Oswald 700 uppercase, 36 → 48px; wrap the key word in <Accent>)
 */
export default function SectionHeading({
  index,
  eyebrow,
  children,
  align = "left",
  className,
}: {
  index: number;
  eyebrow: string;
  /** Title; omit to render the eyebrow alone (e.g. when the title needs its own sizing). */
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" ? "items-center text-center" : "items-start", className)}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
        {align === "left" && <span className="h-px w-8 bg-primary" aria-hidden="true" />}
        {String(index).padStart(2, "0")} · {eyebrow}
      </p>
      {children && (
        <h2 className={cn(oswald.className, "text-4xl md:text-5xl font-bold uppercase tracking-tight")}>{children}</h2>
      )}
    </div>
  );
}

/** Amber key word inside a section title. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}
