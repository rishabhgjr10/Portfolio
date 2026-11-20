"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { oswald } from "@/data/constants/fonts";
import type { NavItem } from "@/data/index";
import { HERO_ACTIONS_ID } from "@/lib/dom-ids";

/** Height covered by the fixed navbar; hero buttons under it count as scrolled away. */
const NAV_COVER_PX = 88;

/**
 * True once the hero buttons have scrolled out of view (or if the page has no hero).
 * Looks the element up on every check rather than holding one reference, so it stays
 * correct if the hero re-renders (e.g. hot reload) and replaces the node.
 */
function useHeroActionsHidden(): boolean {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    // Cheap (one rect read); React skips the re-render when the value doesn't change.
    const check = () => {
      const el = document.getElementById(HERO_ACTIONS_ID);
      if (!el) return setHidden(true);
      const { top, bottom } = el.getBoundingClientRect();
      setHidden(bottom <= NAV_COVER_PX || top >= window.innerHeight);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
  return hidden;
}

const focusRing = "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring";
const iconLink = cn("text-muted-foreground hover:text-foreground transition-colors", focusRing);

/**
 * Floating pill nav: "RG." logo · centred section links · icons + Resume.
 * The icons and Resume button only appear once the hero's own buttons scroll away.
 */
export const FloatingNav = ({
  initials,
  navItems,
  resumeUrl,
  githubUrl,
  linkedinUrl,
  className,
}: {
  initials: string;
  navItems: NavItem[];
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  className?: string;
}) => {
  const showActions = useHeroActionsHidden();

  return (
    <nav
      aria-label="Main"
      className={cn(
        "fixed top-4 sm:top-6 inset-x-0 mx-auto z-[5000] w-[calc(100%-2rem)] max-w-6xl h-14 sm:h-16",
        "grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4",
        "rounded-full border border-border bg-white/80 dark:bg-card/70 backdrop-blur-md px-6",
        className
      )}
    >
      <Link href="/#" aria-label="Back to top" className={cn(oswald.className, "text-xl font-semibold tracking-tight", focusRing)}>
        {initials}
        <span className="text-primary">.</span>
      </Link>

      <ul className="hidden md:flex items-center justify-center gap-7">
        {navItems.map((item) => (
          <li key={item.link}>
            <Link
              href={item.link}
              className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", focusRing)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Keeps the right column in place on mobile, where the links are hidden. */}
      <span className="md:hidden" aria-hidden="true" />

      <div className="flex items-center justify-end gap-4 min-h-[40px]">
        <AnimatePresence initial={false}>
          {showActions && (
            <motion.div
              key="actions"
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
            >
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconLink}>
                <FaGithub className="w-5 h-5" />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-bold transition-shadow hover:shadow-glow outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
