import { experience } from "@/data/index";
import { oswald } from "@/data/constants/fonts";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return experience.map((exp) => ({ id: exp.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const exp = experience.find((e) => e.id === params.id);
  if (!exp) return {};
  return {
    title: `${exp.title} at ${exp.company} | Rishabh Gurjar`,
    description: exp.description,
  };
}

export default function ExperienceDetailPage({ params }: PageProps) {
  const exp = experience.find((e) => e.id === params.id);
  if (!exp) notFound();

  return (
    <main className="container max-w-5xl mx-auto px-4 py-16 min-h-screen">
      {/* Back button */}
      <Link
        href="/#experience"
        className="inline-flex items-center gap-2 text-sm text-amber-600 dark:text-yellow-500 font-semibold hover:underline mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Overview
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-widest text-amber-600 dark:text-yellow-500 font-semibold mb-2">
          Experience
        </p>
        <h1
          className={`${oswald.className} text-3xl md:text-5xl font-bold dark:text-zinc-100`}
        >
          {exp.title}{" "}
          <span className="text-yellow-500">at {exp.company}</span>
        </h1>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {exp.period}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {exp.location}
          </span>
          {exp.type && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-yellow-500/15 dark:text-yellow-400">
              {exp.type}
            </span>
          )}
        </div>
        <p className="mt-6 text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
          {exp.description}
        </p>
      </div>

      {/* Impacts Grid */}
      {exp.impacts && exp.impacts.length > 0 && (
        <>
          <h2
            className={`${oswald.className} text-xl md:text-2xl font-semibold dark:text-zinc-100 mb-6`}
          >
            Key <span className="text-yellow-500">Impacts</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {exp.impacts.map((impact) => (
              <div
                key={impact.number}
                className="rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-6 transition-colors duration-300 hover:border-amber-400"
              >
                <h3 className="font-bold text-white mb-3">{impact.number}</h3>
                <p className="text-sm text-zinc-600 dark:text-neutral-400 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Tech Stack */}
      {exp.skills && exp.skills.length > 0 && (
        <>
          <h2
            className={`${oswald.className} text-xl md:text-2xl font-semibold dark:text-zinc-100 mb-4`}
          >
            Tech <span className="text-yellow-500">Stack</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs uppercase tracking-wide px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 dark:bg-yellow-500/15 dark:text-yellow-400 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
