import { oswald } from "@/data/constants/fonts";
import { aboutHighlights, personalInfo } from "@/data/index";
import { HoverEffect } from "./ui/card-hover-effect";

export default function About() {
  return (
    <section className="pb-32" id="about">
      <h1
        className={`${oswald.className} font-semibold text-2xl md:text-4xl flex flex-col text-center`}
      >
        <span className="text-base text-amber-600">About</span>
        <span>
          Building <span className="text-yellow-500">full-stack</span> web and
          backend systems
        </span>
      </h1>
      <p className="max-w-3xl mx-auto text-center mt-6 dark:text-slate-300">
        {personalInfo.summary}
      </p>
      <p className="text-center mt-4 text-sm text-zinc-500">
        {personalInfo.phone} |{" "}
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-amber-600 dark:text-yellow-500 hover:underline"
        >
          {personalInfo.email}
        </a>
      </p>
      <HoverEffect items={aboutHighlights} />
    </section>
  );
}
