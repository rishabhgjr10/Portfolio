import { createHash, timingSafeEqual } from "node:crypto";
import { del, list, put } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { getBlobToken, RESUME_BLOB_PREFIX } from "@/lib/resume";

export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5 MB request body limit

function passwordMatches(given: string, expected: string): boolean {
  // Hash both so the comparison is constant-time regardless of length.
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/** Owner-only: replace the public resume. Requires RESUME_ADMIN_PASSWORD and BLOB_READ_WRITE_TOKEN. */
export async function POST(request: NextRequest) {
  const expected = process.env.RESUME_ADMIN_PASSWORD;
  const token = getBlobToken();
  // Name what's missing (never the values) so setup problems are obvious.
  const missing = [
    !expected && "RESUME_ADMIN_PASSWORD",
    !token && "BLOB_READ_WRITE_TOKEN (connect a Blob store)",
  ].filter(Boolean);
  if (!expected || !token) {
    return fail(
      `Resume upload isn't configured on this deployment. Missing: ${missing.join(", ")}. ` +
        "Add it in Vercel → Settings → Environment Variables (Production), then redeploy.",
      503
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Expected a multipart form upload.", 400);
  }

  const password = form.get("password");
  if (typeof password !== "string" || !passwordMatches(password, expected)) {
    // Small delay to slow down password guessing.
    await new Promise((r) => setTimeout(r, 800));
    return fail("Wrong password.", 401);
  }

  const file = form.get("file");
  if (!(file instanceof File)) return fail("No file attached.", 400);
  if (file.size === 0 || file.size > MAX_BYTES) return fail("PDF must be between 1 byte and 4 MB.", 400);

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") return fail("That file isn't a PDF.", 400);

  let uploaded: Awaited<ReturnType<typeof put>>;
  try {
    uploaded = await put(`${RESUME_BLOB_PREFIX}RishabhGurjar-Resume.pdf`, bytes, {
      access: "public",
      contentType: "application/pdf",
      // A fresh URL per upload sidesteps CDN caching of the previous version.
      addRandomSuffix: true,
      token,
    });
  } catch (err) {
    console.error("[resume] Blob upload failed", err);
    const detail = err instanceof Error ? err.message : "unknown error";
    return fail(`Blob storage rejected the upload: ${detail}`, 502);
  }

  // Keep only the newest resume. A cleanup failure shouldn't undo a successful upload.
  try {
    const { blobs } = await list({ prefix: RESUME_BLOB_PREFIX, limit: 100, token });
    const stale = blobs.filter((b) => b.url !== uploaded.url).map((b) => b.url);
    if (stale.length > 0) await del(stale, { token });
  } catch (err) {
    console.error("[resume] Could not delete old resumes", err);
  }

  return NextResponse.json({ url: uploaded.url, uploadedAt: new Date().toISOString() });
}
