"use client";
import { oswald } from "@/data/constants/fonts";
import { experience, experienceHighlights } from "@/data/index";
import { HoverEffect } from "./ui/card-hover-effect";
import { Calendar, MapPin } from "lucide-react";

export default function Experience() {
  const primary = experience[0];

  return (
    <section className="pb-32" id="experience">
      <h1
        className={`${oswald.className} font-semibold text-2xl md:text-4xl flex flex-col text-center`}
      >
        <span className="text-base text-amber-600">Experience</span>
        <span>
          My <span className="text-yellow-500">Professional Journey</span>
        </span>
      </h1>

      {/* Primary role highlights (Accenture) */}
      <div className="max-w-3xl mx-auto text-center mt-6">
        <h2 className="text-xl font-bold dark:text-zinc-100">
          <span className="text-yellow-500">{primary.title}</span> at{" "}
          {primary.company}
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          {primary.period} · {primary.location}
        </p>
        <p className="mt-4 dark:text-slate-300">{primary.description}</p>
      </div>
      <HoverEffect
        items={experienceHighlights.map((highlight, index) => ({
          title: `Impact ${String(index + 1).padStart(2, "0")}`,
          description: highlight,
        }))}
      />

      {/* Full experience timeline */}
      <div className="max-w-4xl mx-auto mt-16 space-y-6">
        {experience.map((role, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-white/10 bg-white dark:bg-cool-black p-6 transition hover:border-yellow-500/30"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              {/* Left: icon + details */}
              <div className="flex items-start gap-4">
                {role.ico && (
                  <span className="mt-1 shrink-0 block dark:bg-yellow-500/25 bg-amber-500/25 w-max p-2.5 rounded-xl">
                    {role.ico}
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-lg dark:text-zinc-100">
                    {role.title}
                  </h3>
                  <p className="text-amber-600 dark:text-yellow-500 font-medium text-sm">
                    {role.company}
                    {role.type && (
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {" "}
                        · {role.type}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Right: period & location */}
              <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-zinc-500 dark:text-zinc-400 shrink-0">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {role.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {role.location}
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm dark:text-zinc-300 text-zinc-700 leading-relaxed">
              {role.description}
            </p>

            {/* Skill badges */}
            {role.skills && role.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                  >
                    {skill}
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
