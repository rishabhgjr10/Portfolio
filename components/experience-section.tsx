import { oswald } from "@/data/constants/fonts";
import { experience, experienceHighlights } from "@/data/index";
import { HoverEffect } from "./ui/card-hover-effect";

export default function Experience() {
  const role = experience[0];

  return (
    <section className="pb-32" id="experience">
      <h1
        className={`${oswald.className} font-semibold text-2xl md:text-4xl flex flex-col text-center`}
      >
        <span className="text-base text-amber-600">Experience</span>
        <span>
          <span className="text-yellow-500">{role.title}</span> at {role.company}
        </span>
        <span className="text-base font-normal mt-2 text-zinc-500">
          {role.period} · {role.location}
        </span>
      </h1>
      <p className="max-w-3xl mx-auto text-center mt-6 dark:text-slate-300">
        {role.description}
      </p>
      <HoverEffect
        items={experienceHighlights.map((highlight, index) => ({
          title: `Impact ${String(index + 1).padStart(2, "0")}`,
          description: highlight,
        }))}
      />
    </section>
  );
}
