import { ArrowUpRight, FileText } from "lucide-react";
import { certifications } from "@/data/index";
import { oswald } from "@/data/constants/fonts";
import { cn } from "@/lib/utils";
import SectionHeading, { Accent } from "./section-heading";

const formatIssued = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export default function Certifications() {
  return (
    <section id="certifications" className="pb-32 scroll-mt-24">
      <SectionHeading index={4} eyebrow="Certifications">
        Claude <Accent>certified</Accent>
      </SectionHeading>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => {
          const professional = cert.level === "Professional";
          return (
            <li
              key={cert.credlyUrl}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-5 transition-colors",
                professional ? "border-primary/50 bg-primary/[0.06]" : "border-border hover:border-primary/40",
              )}
            >
              <p
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.25em]",
                  professional ? "text-primary" : "text-muted-foreground",
                )}
              >
                {cert.level}
              </p>

              <h3 className="mt-6">
                <span className="block text-sm text-muted-foreground">Claude Certified</span>
                <span className={cn(oswald.className, "block text-3xl font-bold uppercase tracking-tight")}>
                  {cert.role}
                </span>
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Anthropic · <time dateTime={cert.issued}>{formatIssued(cert.issued)}</time>
              </p>

              <div className="mt-auto flex gap-4 pt-6 text-sm">
                <a
                  href={cert.credlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify Claude Certified ${cert.role} ${cert.level} on Credly`}
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline underline-offset-4"
                >
                  Verify <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={encodeURI(cert.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Claude Certified ${cert.role} ${cert.level} certificate (PDF)`}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" /> Certificate
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
