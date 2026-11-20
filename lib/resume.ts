import { list } from "@vercel/blob";

/** Shipped with the site; used until a resume is uploaded, or if Blob storage is unavailable. */
export const FALLBACK_RESUME_PATH = "/RishabhGurjar.pdf";

/** Blob folder that holds uploaded resumes. Only the newest one is kept. */
export const RESUME_BLOB_PREFIX = "resume/";

/**
 * Read/write token for the connected Vercel Blob store.
 * Vercel names it BLOB_READ_WRITE_TOKEN by default, but lets you add a custom prefix
 * when connecting the store (e.g. PORTFOLIO_BLOB_READ_WRITE_TOKEN), so accept either.
 */
export function getBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find((k) => k.endsWith("BLOB_READ_WRITE_TOKEN") && process.env[k]);
  return key ? process.env[key] : undefined;
}

/**
 * True when Blob storage is usable. Newer Vercel Blob stores don't create a read-write token;
 * they set BLOB_STORE_ID and the SDK authenticates with Vercel's built-in OIDC token instead.
 * When getBlobToken() is undefined, calls pass no token and the SDK uses that path.
 */
export function hasBlobCredentials(): boolean {
  return Boolean(getBlobToken() || process.env.BLOB_STORE_ID?.trim());
}

export interface StoredResume {
  url: string;
  downloadUrl: string;
  uploadedAt: Date;
}

/** Newest uploaded resume, or null when none is stored or Blob isn't configured. */
export async function getLatestResume(): Promise<StoredResume | null> {
  if (!hasBlobCredentials()) return null;
  const token = getBlobToken();
  try {
    const { blobs } = await list({ prefix: RESUME_BLOB_PREFIX, limit: 100, token });
    const newest = blobs
      .filter((b) => b.pathname.toLowerCase().endsWith(".pdf"))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())[0];
    return newest ? { url: newest.url, downloadUrl: newest.downloadUrl, uploadedAt: newest.uploadedAt } : null;
  } catch (err) {
    console.error("[resume] Could not list blobs, using bundled PDF", err);
    return null;
  }
}
