import type { Metadata } from "next";
import { getLatestResume } from "@/lib/resume";
import ResumeUploadForm from "./upload-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume admin",
  robots: { index: false, follow: false },
};

export default async function ResumeAdminPage() {
  const latest = await getLatestResume();

  return (
    <main className="container max-w-lg mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Update resume</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
        {latest
          ? `Live resume uploaded ${latest.uploadedAt.toUTCString()}.`
          : "No upload yet: the site is serving the PDF bundled in /public."}{" "}
        <a href="/resume" target="_blank" className="text-amber-600 dark:text-yellow-500 hover:underline">
          Open current
        </a>
      </p>
      <ResumeUploadForm />
    </main>
  );
}
