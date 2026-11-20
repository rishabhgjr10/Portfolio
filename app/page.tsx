import About from "@/components/about-section";
import Experience from "@/components/experience-section";
import HeroSection from "@/components/hero-section";
import Skills from "@/components/skills";
import StatsStrip from "@/components/stats-strip";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Works from "@/components/works-section";
import HeroBackdrop from "@/components/hero-backdrop";
import { navItems, personalInfo, RESUME_URL, works } from "@/data/index";
import { getProjectImages } from "@/lib/getProjectImages";

export default function Home() {
  // Read each project's screenshot folder on the server; the client section only gets URLs.
  const projects = works.map((project) => ({
    ...project,
    screenshots: getProjectImages(project.imageFolder),
  }));

  const initials = personalInfo.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <>
      <HeroBackdrop />
      <main className="container relative">
        <FloatingNav
          initials={initials}
          navItems={navItems}
          resumeUrl={RESUME_URL}
          githubUrl={personalInfo.github}
          linkedinUrl={personalInfo.linkedin}
        />
        <HeroSection />
        <StatsStrip />
        <Experience />
        <Works projects={projects} />
        <Skills />
        <About />
      </main>
    </>
  );
}
