"use client";
import { oswald } from "@/data/constants/fonts";
import { education } from "@/data/index";
import { Calendar, GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="pb-32" id="education">
      <h1
        className={`${oswald.className} font-semibold text-2xl md:text-4xl flex flex-col text-center`}
      >
        <span className="text-base text-amber-600">Education</span>
        <span>
          My <span className="text-yellow-500">Educational Journey</span>
        </span>
      </h1>

      <div className="max-w-4xl mx-auto mt-10 space-y-6">
        {education.map((entry, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-white/10 bg-white dark:bg-cool-black p-6 transition hover:border-yellow-500/30"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left: icon + details */}
              <div className="flex items-start gap-4">
                <span className="mt-1 shrink-0 block dark:bg-yellow-500/25 bg-amber-500/25 p-2.5 rounded-xl">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-lg dark:text-zinc-100">
                    {entry.institution}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-0.5">
                    {entry.degree}
                  </p>
                </div>
              </div>

              {/* Right: period */}
              <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                <span className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.period}
                </span>
                {/* Grade badge */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-yellow-500/15 dark:text-yellow-400">
                  Grade: {entry.grade}
                </span>
              </div>
            </div>

            {/* Highlight tags */}
            {entry.highlights && entry.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {entry.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border border-white/10 bg-neutral-100 text-zinc-600 dark:bg-white/5 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
