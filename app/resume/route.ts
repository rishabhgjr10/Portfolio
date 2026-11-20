import { get } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { FALLBACK_RESUME_PATH, getBlobToken, getLatestResume } from "@/lib/resume";

// Always resolve the newest upload; never cache this response.
export const dynamic = "force-dynamic";

const FILE_NAME = "RishabhGurjar-Resume.pdf";

/**
 * Stable public resume link.
 *   /resume            → opens the PDF in the browser
 *   /resume?download=1 → downloads it
 *
 * Private Blob stores (the default for new Vercel stores) can't be linked to directly,
 * so the newest upload is streamed through this route. Public uploads are redirected to.
 * With no upload yet, it redirects to the PDF bundled in /public.
 */
export async function GET(request: NextRequest) {
  const download = request.nextUrl.searchParams.has("download");
  const latest = await getLatestResume();

  if (latest) {
    try {
      const file = await get(latest.url, { access: "private", token: getBlobToken(), useCache: false });
      if (file?.statusCode === 200) {
        return new NextResponse(file.stream, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${FILE_NAME}"`,
            "Cache-Control": "no-store",
          },
        });
      }
    } catch (err) {
      // Not a private blob (or a transient error): fall through to the public URL.
      console.warn("[resume] Private read failed, redirecting to blob URL", err);
    }
  }

  const target = latest
    ? download
      ? latest.downloadUrl
      : latest.url
    : new URL(FALLBACK_RESUME_PATH, request.url).toString();

  const res = NextResponse.redirect(target, 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
