"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ProjectCardStackProps {
  screenshots: readonly string[];
  title: string;
  className?: string;
}

interface CardPose {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

const spring: Transition = { type: "spring", stiffness: 260, damping: 20 };

const MAX_SHOTS = 5;
const FAN_X_STEP = 32; // px between neighbouring cards
const FAN_ROTATE_STEP = 7; // degrees between neighbouring cards
const FAN_LIFT = 16; // px the centre card rises
const FAN_ARCH = 6; // px each step away from centre drops back down

/** Resting: cover in front, the next two tucked behind with a slight upward peek, any others hidden. */
function restingPose(index: number): CardPose {
  if (index === 0) return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 30 };
  // Cards scale from the bottom edge, so the y offset must outrun the shrink for the top edge to peek out.
  if (index === 1) return { x: 0, y: -16, rotate: 0, scale: 0.95, opacity: 0.6, zIndex: 20 };
  return { x: 0, y: -30, rotate: 0, scale: 0.9, opacity: index === 2 ? 0.4 : 0, zIndex: 10 - index };
}

/**
 * Fan slot offsets (in steps from the middle) for each card, cover first.
 * The slots are (i - mid) for i in 0..count-1, handed out closest-to-centre first,
 * left before right: 5 cards → [0, -1, 1, -2, 2]; 4 cards → [-0.5, 0.5, -1.5, 1.5].
 */
function fanOffsets(count: number): number[] {
  const mid = (count - 1) / 2;
  return Array.from({ length: count }, (_, i) => i - mid).sort(
    (a, b) => Math.abs(a) - Math.abs(b) || a - b
  );
}

function fannedPose(offset: number): CardPose {
  const distance = Math.abs(offset);
  return {
    x: offset * FAN_X_STEP,
    y: -FAN_LIFT + distance * FAN_ARCH,
    rotate: offset * FAN_ROTATE_STEP,
    scale: distance < 0.75 ? 1.03 : 1,
    opacity: 1,
    zIndex: 30 - Math.round(distance * 4),
  };
}

function poseFor(index: number, offsets: readonly number[], fanned: boolean, activeIndex: number | null): CardPose {
  const base = fanned ? fannedPose(offsets[index] ?? 0) : restingPose(index);
  if (!fanned || activeIndex === null) return base;
  if (index === activeIndex) return { ...base, rotate: 0, scale: 1.15, opacity: 1, zIndex: 50 };
  return { ...base, opacity: 0.75 };
}

function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return canHover;
}

export default function ProjectCardStack({ screenshots, title, className }: ProjectCardStackProps) {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  const shots = useMemo(() => screenshots.slice(0, MAX_SHOTS), [screenshots]);
  const offsets = useMemo(() => fanOffsets(shots.length), [shots.length]);

  // A single screenshot gets a plain preview; 2+ get the interactive stack.
  const stacked = shots.length >= 2;
  const fanned = canHover && hovered && stacked;
  const extra = shots.length - 1;

  if (shots.length === 0) {
    return (
      <div
        className={cn(
          "flex w-full aspect-[16/10] items-center justify-center rounded-xl border border-white/10 bg-neutral-950 text-xs text-neutral-500",
          className
        )}
      >
        Preview coming soon
      </div>
    );
  }

  return (
    <>
      <div
        className={cn("relative w-full aspect-[16/10] overflow-visible", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setActiveIndex(null);
        }}
      >
        {shots.map((src, i) => {
          const pose = poseFor(i, offsets, fanned, activeIndex);
          const isActive = fanned && activeIndex === i;
          return (
            <motion.button
              key={src}
              type="button"
              aria-label={`Enlarge ${title} screenshot ${i + 1} of ${shots.length}`}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-xl border bg-neutral-950 origin-bottom cursor-zoom-in",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                isActive ? "border-amber-400/60 shadow-2xl shadow-amber-500/20" : "border-white/10 shadow-lg"
              )}
              style={{ zIndex: pose.zIndex }}
              initial={false}
              animate={{ x: pose.x, y: pose.y, rotate: pose.rotate, scale: pose.scale, opacity: pose.opacity }}
              transition={spring}
              onMouseEnter={() => fanned && setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex((cur) => (cur === i ? null : cur))}
              // On touch devices the cards are stacked, so a tap always opens the cover first.
              onClick={() => setLightboxIndex(fanned ? i : 0)}
              tabIndex={i === 0 || fanned ? 0 : -1}
            >
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
                priority={i === 0}
              />
            </motion.button>
          );
        })}

        {extra > 0 && !fanned && (
          <span className="pointer-events-none absolute bottom-2 right-2 z-40 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur">
            +{extra}
          </span>
        )}
      </div>

      <Lightbox
        shots={shots}
        title={title}
        index={lightboxIndex}
        onChange={setLightboxIndex}
      />
    </>
  );
}

interface LightboxProps {
  shots: readonly string[];
  title: string;
  index: number | null;
  onChange: (index: number | null) => void;
}

function Lightbox({ shots, title, index, onChange }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const open = index !== null && index < shots.length;
  const count = shots.length;
  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + count) % count);
    },
    [index, count, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onChange, step]);

  if (!mounted) return null;

  // Portal to <body>: the project card is transformed on hover, which would trap `position: fixed`.
  return createPortal(
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => onChange(null)}
          >
            <X className="h-5 w-5" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={shots[index]}
              className="relative h-full max-h-[85vh] w-full max-w-6xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={shots[index]}
                alt={`${title} screenshot ${index + 1}`}
                fill
                sizes="100vw"
                // Serve the original file: the optimizer fails on large PNGs at full-screen widths,
                // and the lightbox wants full resolution anyway.
                unoptimized
                className="object-contain"
                // Clicks on the picture itself shouldn't close; the backdrop around it does.
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {index + 1} / {count}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
