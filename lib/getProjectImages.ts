import fs from "node:fs";
import path from "node:path";

const WORKS_DIR = path.join(process.cwd(), "public", "images", "works");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const MAX_IMAGES = 5;

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

/** Compare by file name without extension, so "verdikt.png" sorts before "Verdikt_2.png". */
function compareImageNames(a: string, b: string): number {
  const stem = (name: string) => name.slice(0, name.length - path.extname(name).length);
  return collator.compare(stem(a), stem(b)) || collator.compare(a, b);
}

/** Find the folder by name, ignoring case, so data like "verdikt" still works on case-sensitive hosts (Vercel/Linux). */
function resolveFolder(folderName: string): string | null {
  if (!fs.existsSync(WORKS_DIR)) return null;
  const wanted = folderName.toLowerCase();
  const match = fs
    .readdirSync(WORKS_DIR, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && entry.name.toLowerCase() === wanted);
  return match ? match.name : null;
}

/**
 * Server-only: list up to 5 screenshot URLs from public/images/works/<folderName>,
 * sorted naturally by file name. Returns [] if the folder is missing or empty.
 */
export function getProjectImages(folderName: string): string[] {
  const folder = resolveFolder(folderName);
  if (!folder) return [];

  return fs
    .readdirSync(path.join(WORKS_DIR, folder), { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort(compareImageNames)
    .slice(0, MAX_IMAGES)
    .map((name) => `/images/works/${encodeURIComponent(folder)}/${encodeURIComponent(name)}`);
}
