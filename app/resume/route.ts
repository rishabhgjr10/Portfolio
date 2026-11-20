import { NextResponse, type NextRequest } from "next/server";
import { FALLBACK_RESUME_PATH, getLatestResume } from "@/lib/resume";

// Always resolve the newest upload; never cache this redirect.
export const dynamic = "force-dynamic";

/**
 * Stable public resume link.
 *   /resume            → opens the PDF in the browser
 *   /resume?download=1 → downloads it
 */
export async function GET(request: NextRequest) {
  const download = request.nextUrl.searchParams.has("download");
  const latest = await getLatestResume();

  const target = latest
    ? download
      ? latest.downloadUrl
      : latest.url
    : new URL(FALLBACK_RESUME_PATH, request.url).toString();

  const res = NextResponse.redirect(target, 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
