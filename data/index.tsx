import type { ReactNode } from "react";
import { Server, Code, Cloud, Blocks, Wrench } from "lucide-react";

export interface NavItem {
  /** Hidden on phones to keep the bar on one line. */
  desktopOnly?: boolean;
  name: string;
  link: string;
}

export interface Project {
  /** URL-safe id, also used by /go/<slug> for live-URL fallback. */
  slug: string;
  title: string;
  /** One-line pitch: what it is, in plain words. */
  pitch: string;
  /** 2–3 bullets on what was technically interesting. */
  highlights: string[];
  /** Folder under public/images/works/ holding this project's screenshots (first, alphabetically, is the cover). */
  imageFolder: string;
  github: string;
  /** Live URLs in priority order; later ones are fallbacks if earlier ones are down. */
  liveUrls: string[];
  techStack: string[];
  /** Featured projects get full cards; the rest go in the "More projects" list. */
  featured: boolean;
  /** Optional status line shown on the card, e.g. "Work in Progress". */
  statusNote?: string;
}

export interface ImpactItem {
  number: string;
  description: string;
}

export interface Experience {
  id: string;
  ico?: ReactNode;
  /** Company logo under public/; shown instead of `ico` when set. */
  logo?: string;
  title: string;
  company: string;
  type?: string;
  location: string;
  period: string;
  description: string;
  skills?: string[];
  impacts?: ImpactItem[];
  /** The headline role: full card with impacts. Others render as one line. */
  featured?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}


export interface Stat {
  value: string;
  label: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Certification {
  /** Role on the badge, e.g. "Architect". */
  role: string;
  level: "Foundations" | "Professional";
  /** ISO date, shown as "Sep 2026". */
  issued: string;
  credlyUrl: string;
  /** Certificate PDF under /public. */
  pdf: string;
}

export const personalInfo = {
  name: "Rishabh Gurjar",
  role: "Software Engineer",
  company: "Accenture",
  location: "Gurugram, India",
  availability: "Open to Software Engineer roles",
  email: "rishabhgjr10@gmail.com",
  github: "https://github.com/rishabhgjr10",
  linkedin: "https://www.linkedin.com/in/rishabhgjr/",
  /** Aggregated coding stats (LeetCode, CodeChef, Codeforces, GFG…). */
  codolio: "https://codolio.com/profile/rishabhgjr10",
  tagline:
    "I build backend services and full-stack web apps — from REST APIs and data models to production deploys.",
  /** Caption on the hero photo card. */
  currently: "Shipping enterprise backends at Accenture",
  /** Short stack shown as tags under the hero intro. */
  heroSkills: ["Java", "Spring Boot", ".NET", "Next.js", "REST APIs", "SQL"],
  summary: [
    "Backend-focused Software Engineer at Accenture, shipping features, change requests and production fixes on enterprise ASP.NET MVC / Oracle applications.",
    "Outside work I design, build and deploy full-stack apps on Java 21 / Spring Boot 3 — two of them are live in production.",
  ],
};

/** Stable link that always serves the newest uploaded resume (see app/resume/route.ts). */
export const RESUME_URL = "/resume";

export const navItems: NavItem[] = [
  { name: "Experience", link: "/#experience" },
  { name: "Projects", link: "/#projects" },
  { name: "Skills", link: "/#skills", desktopOnly: true },
  { name: "Certifications", link: "/#certifications", desktopOnly: true },
  { name: "About", link: "/#about", desktopOnly: true },
  { name: "Contact", link: "/#contact" },
];

export const stats: Stat[] = [
  { value: "20+", label: "Production issues resolved" },
  { value: "15+", label: "Change requests delivered" },
  { value: "2", label: "Full-stack apps live" },
  { value: "8.42", label: "CGPA · B.Tech Computer Engg." },
];

export const aboutHighlights = [
  {
    ico: <Server />,
    title: "Backend Engineering",
    description:
      "REST APIs in Java 21 / Spring Boot 3 and C# / ASP.NET MVC, with JPA/Hibernate, MySQL and Oracle underneath.",
  },
  {
    ico: <Code />,
    title: "Full-Stack Delivery",
    description:
      "Next.js and React clients wired to secure, well-typed backend APIs, tested with JUnit 5 and Mockito.",
  },
  {
    ico: <Cloud />,
    title: "Cloud & DevOps",
    description:
      "Docker multi-stage builds, GitHub Actions CI, and deploys across Render, Vercel and Aiven.",
  },
];

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["Java", "C#", "TypeScript", "JavaScript", "SQL"] },
  {
    label: "Backend",
    items: ["Spring Boot 3", "Spring Security", "Spring Data JPA", "Hibernate", "ASP.NET MVC", "REST APIs"],
  },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "AngularJS"] },
  { label: "Data", items: ["MySQL", "Oracle", "Redis", "MS SQL Server"] },
  { label: "Cloud & DevOps", items: ["Docker", "GitHub Actions", "Vercel", "Render", "Aiven", "Git"] },
  { label: "Testing", items: ["JUnit 5", "Mockito"] },
];

export const works: Project[] = [
  {
    slug: "snaplink",
    title: "SnapLink",
    pitch: "URL shortener with link management and a custom QR code studio.",
    highlights: [
      "Redis cache-aside on the redirect path with a MySQL (Aiven) fallback, so links keep resolving if the cache is down",
      "Rate limiting with Bucket4j and OAuth 2.0 sign-in through Firebase",
      "Edge proxy routing from Vercel to the Spring Boot API on Render, removing CORS overhead",
    ],
    imageFolder: "Snaplink",
    github: "https://github.com/rishabhgjr10/Snaplink",
    liveUrls: ["https://bauna.xyz", "https://bauna.vercel.app"],
    techStack: [
      "Java 21",
      "Spring Boot 3",
      "React 18",
      "Redis",
      "MySQL (Aiven)",
      "Firebase Auth",
      "Bucket4j",
      "Docker",
      "Tailwind CSS",
      "Vite",
      "Render",
      "Vercel",
    ],
    featured: true,
  },
  {
    slug: "verdikt",
    title: "Verdikt",
    pitch: "One place to review and track movies, TV shows, books and video games.",
    highlights: [
      "Spring Boot 3 API that aggregates real-time data from multiple media sources behind one unified client",
      "Resilient upstream API handling, Spring Security, and environment-based secret management",
      "Tested with JUnit 5 and Mockito; CI on GitHub Actions, API on Render, Next.js client on Vercel",
    ],
    imageFolder: "Verdikt",
    github: "https://github.com/rishabhgjr10/Verdikt",
    liveUrls: ["https://verdiikt.vercel.app/"],
    techStack: [
      "Java 17",
      "Spring Boot 3",
      "Spring Data JPA",
      "Hibernate",
      "Spring Security",
      "MySQL (Aiven)",
      "JUnit 5",
      "Mockito",
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "GitHub Actions",
      "Render",
      "Vercel",
    ],
    featured: true,
  },
  {
    slug: "pathway",
    title: "Pathway",
    pitch: "Travel discovery site with destination ideas by interest and budget.",
    highlights: [],
    imageFolder: "Pathway",
    github: "https://github.com/rishabhgjr10/Pathway",
    liveUrls: ["https://pathway-eta.vercel.app/"],
    techStack: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    featured: false,
    statusNote: "Work in Progress",
  },
];

export const experience: Experience[] = [
  {
    id: "accenture",
    featured: true,
    logo: "/Accenture-Logo.png",
    ico: <Server />,
    title: "Associate Software Engineer",
    company: "Accenture",
    type: "Full-time · Hybrid",
    location: "Gurugram, Haryana",
    period: "Nov. 2025 – Present",
    description:
      "Delivering feature enhancements, defect resolution, and backend improvements for enterprise ASP.NET MVC applications backed by Oracle in a collaborative Agile environment.",
    skills: ["ASP.NET MVC", "Oracle", "ServiceNow", "AngularJS", "Agile"],
    impacts: [
      {
        number: "Impact 01",
        description:
          "Implemented 10+ feature enhancements and bug fixes in enterprise ASP.NET MVC applications backed by Oracle, improving application stability and functionality.",
      },
      {
        number: "Impact 02",
        description:
          "Delivered 15+ change requests spanning business logic, validations, and backend modules, ensuring alignment with evolving business requirements.",
      },
      {
        number: "Impact 03",
        description:
          "Resolved 20+ application and environment issues through debugging and root cause analysis, minimizing downtime and improving system reliability.",
      },
      {
        number: "Impact 04",
        description:
          "Enhanced 5+ application modules by implementing business validations and workflow improvements to streamline enterprise processes.",
      },
      {
        number: "Impact 05",
        description:
          "Maintained 3+ enterprise applications through ongoing feature development, defect resolution, and configuration updates in a collaborative Agile environment.",
      },
    ],
  },
  {
    id: "teleperformance",
    ico: <Wrench />,
    title: "Customer Account Executive",
    company: "Teleperformance",
    type: "Full-time · On-site",
    location: "Jaipur, India",
    period: "Apr. 2025 – Jul. 2025",
    description:
      "Handled key customer accounts, resolved service escalations, and maintained client SLA performance.",
    skills: ["Project Management", "Stakeholder Communication"],
    impacts: [
      {
        number: "Impact 01",
        description:
          "Resolved high-priority client escalations within SLA benchmarks, maintaining a 98%+ customer satisfaction rating.",
      },
      {
        number: "Impact 02",
        description:
          "Coordinated with cross-functional support teams to streamline resolution workflows for recurring account issues.",
      },
      {
        number: "Impact 03",
        description:
          "Facilitated clear stakeholder communication across multiple enterprise accounts during critical incident windows.",
      },
    ],
  },
  {
    id: "sage-media",
    ico: <Blocks />,
    title: "Video Editor",
    company: "Sage Media",
    type: "Full-time · On-site",
    location: "Jaipur, India",
    period: "Jul. 2024 – Nov. 2024",
    description:
      "Edited and post-produced short-form and promotional video content, focusing on pacing and narrative flow.",
    skills: ["Video Editing", "CapCut", "Post-Production"],
    impacts: [
      {
        number: "Impact 01",
        description:
          "Produced, paced, and color-graded high-engagement short-form video assets, optimizing visual storytelling and viewer retention.",
      },
      {
        number: "Impact 02",
        description:
          "Streamlined post-production turnaround time by establishing standardized editing templates and asset libraries.",
      },
      {
        number: "Impact 03",
        description:
          "Collaborated directly with creative directors to synchronize audio design, transitions, and narrative rhythm.",
      },
    ],
  },
  {
    id: "slk",
    ico: <Code />,
    title: "Software Trainee",
    company: "SLK",
    type: "Internship · Remote",
    location: "Bengaluru, India",
    period: "Mar. 2024 – Sep. 2024",
    description:
      "Assisted with backend services and developed database queries and procedures using MS SQL Server.",
    skills: ["Microsoft SQL Server", "Microservices", "Backend Development"],
    impacts: [
      {
        number: "Impact 01",
        description:
          "Assisted in writing optimized SQL queries, stored procedures, and views using Microsoft SQL Server.",
      },
      {
        number: "Impact 02",
        description:
          "Collaborated on backend microservices architecture and debugged API integration endpoints.",
      },
      {
        number: "Impact 03",
        description:
          "Participated in Agile sprint planning, daily standups, and codebase reviews for enterprise client modules.",
      },
    ],
  },
];


export const education: Education[] = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "Jaipur Engineering College and Research Centre (JECRC)",
    period: "2020 – 2024",
    grade: "8.42 CGPA",
  },
];




/** Anthropic Claude certifications, highest tier first. PDFs live in public/Certification. */
export const certifications: Certification[] = [
  {
    role: "Architect",
    level: "Professional",
    issued: "2026-09-30",
    credlyUrl: "https://www.credly.com/badges/40542be5-464a-4a3e-bff8-791f56df3ab6",
    pdf: "/Certification/Claude Certified Architect - Professional.pdf",
  },
  {
    role: "Architect",
    level: "Foundations",
    issued: "2026-09-27",
    credlyUrl: "https://www.credly.com/badges/502ed34a-4d5d-457e-a66b-38d098caa9ef",
    pdf: "/Certification/Claude Certified Architect - Foundations.pdf",
  },
  {
    role: "Developer",
    level: "Foundations",
    issued: "2026-09-27",
    credlyUrl: "https://www.credly.com/badges/5d614b9a-c7de-478d-857b-4e57b5ea8de7",
    pdf: "/Certification/Claude Certified Developer - Foundations.pdf",
  },
  {
    role: "Associate",
    level: "Foundations",
    issued: "2026-09-26",
    credlyUrl: "https://www.credly.com/badges/6a495cf8-a553-4172-b9e5-7b2d3575a577",
    pdf: "/Certification/Claude Certified Associate - Foundations.pdf",
  },
];
