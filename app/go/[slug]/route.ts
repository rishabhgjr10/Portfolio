import { NextResponse, type NextRequest } from "next/server";
import { works } from "@/data/index";

export const dynamic = "force-dynamic";

const TIMEOUT_MS = 2500;

/** True when the URL answers with anything other than a server error within the timeout. */
async function isUp(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "User-Agent": "portfolio-link-check" },
    });
    // Don't download the page body; the status is all we need.
    await res.body?.cancel();
    return res.status < 500;
  } catch {
    return false;
  }
}

/**
 * /go/<slug> → the first live URL of that project that responds.
 * e.g. SnapLink tries bauna.xyz, then falls back to bauna.vercel.app.
 */
export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const project = works.find((p) => p.slug === params.slug);
  if (!project || project.liveUrls.length === 0) {
    return NextResponse.json({ error: "Unknown project" }, { status: 404 });
  }

  let target = project.liveUrls[project.liveUrls.length - 1];
  for (const url of project.liveUrls.slice(0, -1)) {
    if (await isUp(url)) {
      target = url;
      break;
    }
  }

  const res = NextResponse.redirect(target, 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
