import { list } from "@vercel/blob";

/** Shipped with the site; used until a resume is uploaded, or if Blob storage is unavailable. */
export const FALLBACK_RESUME_PATH = "/RishabhGurjar.pdf";

/** Blob folder that holds uploaded resumes. Only the newest one is kept. */
export const RESUME_BLOB_PREFIX = "resume/";

export interface StoredResume {
  url: string;
  downloadUrl: string;
  uploadedAt: Date;
}

/** Newest uploaded resume, or null when none is stored or Blob isn't configured. */
export async function getLatestResume(): Promise<StoredResume | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: RESUME_BLOB_PREFIX, limit: 100 });
    const newest = blobs
      .filter((b) => b.pathname.toLowerCase().endsWith(".pdf"))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())[0];
    return newest ? { url: newest.url, downloadUrl: newest.downloadUrl, uploadedAt: newest.uploadedAt } : null;
  } catch (err) {
    console.error("[resume] Could not list blobs, using bundled PDF", err);
    return null;
  }
}
