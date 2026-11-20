/**
 * Decorative atmosphere (design doc §2, §9): a faint 56px grid that stays behind the whole
 * page and fades out toward the viewport edges, plus a soft amber glow at the top right
 * behind the hero photo.
 */
export default function HeroBackdrop() {
  return (
    <>
      {/* Grid — fixed, so it continues behind every section */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 text-black/[0.06] dark:text-white/[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, #000 35%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, #000 35%, transparent 90%)",
        }}
      />
      {/* Amber glow — top of the page only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px]"
        style={{ background: "radial-gradient(40% 45% at 72% 12%, hsl(var(--primary) / 0.28), transparent 70%)" }}
      />
    </>
  );
}
