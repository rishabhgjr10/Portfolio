import { cn } from "@/lib/utils";

/** Mono amber tag for tech stacks (design doc §10): amber text, 10% fill, 20% border, 6px radius. */
export function TechTag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}

/** 6px amber dot + text; keeps inline bold numbers on the same line. */
export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
