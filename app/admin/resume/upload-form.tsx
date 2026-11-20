"use client";

import { useState, type FormEvent } from "react";

type Status = { kind: "idle" } | { kind: "busy" } | { kind: "ok"; at: string } | { kind: "error"; message: string };

export default function ResumeUploadForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/resume", { method: "POST", body: new FormData(form) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; uploadedAt?: string };
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? `Upload failed (${res.status}).` });
        return;
      }
      form.reset();
      setStatus({ kind: "ok", at: data.uploadedAt ?? new Date().toISOString() });
    } catch {
      setStatus({ kind: "error", message: "Network error, try again." });
    }
  }

  const input =
    "w-full rounded-lg border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-sm";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium">
        Admin password
        <input name="password" type="password" required autoComplete="current-password" className={`${input} mt-1`} />
      </label>
      <label className="block text-sm font-medium">
        Resume PDF (max 4 MB)
        <input name="file" type="file" accept="application/pdf,.pdf" required className={`${input} mt-1`} />
      </label>
      <button
        type="submit"
        disabled={status.kind === "busy"}
        className="w-full rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-semibold text-sm py-3 transition"
      >
        {status.kind === "busy" ? "Uploading…" : "Upload and publish"}
      </button>
      {status.kind === "ok" && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Published. Visitors now get the new resume at /resume.
        </p>
      )}
      {status.kind === "error" && <p className="text-sm text-red-600 dark:text-red-400">{status.message}</p>}
    </form>
  );
}
