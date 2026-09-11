import { cn } from "@/lib/utils";
import { Github, MoveUpRight } from "lucide-react";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  github,
  live,
  techStack,
}: {
  className?: string;
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  techStack: string[];
}) => {
  return (
    <div
      className={cn(
        "rounded-xl group/bento transition duration-200 p-4 dark:bg-cool-black dark:border-zinc-600 bg-white border flex flex-col justify-between h-full",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col h-full">
        {/* Image container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-neutral-950 mb-4">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            width={500}
            height={500}
          />
        </div>

        {/* Title */}
        <div className="font-sans font-bold dark:text-zinc-100 mb-2">
          {title}
        </div>

        {/* Description */}
        <div className="font-sans font-normal text-zinc-800 text-sm dark:text-neutral-300">
          {description.length > 180
            ? `${description.slice(0, 160)}...`
            : description}
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap items-center gap-2 my-3 min-h-[48px]">
          {techStack.slice(0, 8).map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-yellow-500/15 dark:text-yellow-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action links — pinned to bottom */}
        <div className="flex gap-4 items-center mt-auto pt-2">
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 items-center text-amber-600 dark:text-yellow-500 font-semibold"
          >
            <span>Live demo</span>
            <MoveUpRight className="w-4 h-4" />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 items-center text-amber-600 dark:text-yellow-500 font-semibold"
          >
            <span>GitHub</span>
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
