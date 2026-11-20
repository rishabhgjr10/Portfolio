import localFont from "next/font/local";

/*
 * Fonts are bundled from npm (@fontsource-variable/*) instead of next/font/google:
 * Next 14.2's Google loader expects font URLs ending in .woff2 and crashes on the
 * URLs Google Fonts serves now, which broke the Vercel build. Self-hosting also
 * removes the build-time network dependency. Both are variable fonts, so any weight works.
 */

/** Body / UI font. */
export const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  display: "swap",
});

/** Headings, name, numbers. */
export const oswald = localFont({
  src: "../../node_modules/@fontsource-variable/oswald/files/oswald-latin-wght-normal.woff2",
  weight: "200 700",
  display: "swap",
});
