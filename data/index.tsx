import type { ReactNode } from "react";
import {
  Code,
  Braces,
  Database,
  Server,
  Wrench,
  Blocks,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
  FaCode,
  FaEnvelope,
} from "react-icons/fa6";
import { SiLeetcode, SiCodechef } from "react-icons/si";

export interface NavItem {
  name: string;
  link: string;
}

export interface Project {
  title: string;
  description: string;
  className: string;
  image: string;
  github: string;
  live: string;
  techStack: string[];
}

export interface Experience {
  ico?: ReactNode;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
}

export interface SocialLink {
  id: number;
  img: ReactNode;
  href: string;
  label: string;
}

export interface Skill {
  name: string;
  description: string;
  percentage: number;
}

export const personalInfo = {
  name: "Rishabh Gurjar",
  role: "Software Engineer",
  phone: "+91-8824287625",
  email: "rishabhgjr10@gmail.com",
  summary:
    "Backend-focused Software Engineer with experience building RESTful applications and database-driven systems. Skilled in Java, C#, backend service development, and API design, with hands-on experience developing scalable applications through personal projects. Currently working as an Associate Software Engineer at Accenture, delivering feature enhancements, defect resolution, and backend improvements for enterprise ASP.NET/Oracle applications.",
  tagline:
    "I build full-stack web and backend applications — from resilient REST APIs and database-driven systems to polished, production-ready clients.",
};

export const navItems: NavItem[] = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const aboutHighlights = [
  {
    ico: <Server />,
    title: "Backend Engineering",
    description:
      "Design and ship RESTful services with Java 17, Spring Boot, C#, and ASP.NET — including persistence, validations, and production-grade API handling.",
  },
  {
    ico: <Code />,
    title: "Full-Stack Delivery",
    description:
      "Build unified client experiences with Next.js, React, and TypeScript, connecting frontend apps to secure, well-structured backend APIs.",
  },
  {
    ico: <Database />,
    title: "Data & Persistence",
    description:
      "Work with Spring Data JPA, Hibernate, MySQL, and Oracle to model data, optimize queries, and keep enterprise applications reliable.",
  },
  {
    ico: <Braces />,
    title: "API Design",
    description:
      "Implement resilient backend APIs with environment security, testing (JUnit, Mockito), and clear contracts for frontend consumers.",
  },
  {
    ico: <Blocks />,
    title: "Cloud-Native Deployments",
    description:
      "Containerize services with Docker multi-stage builds and deploy across Render, Aiven, Vercel, and GitHub CI/CD pipelines.",
  },
  {
    ico: <Wrench />,
    title: "Enterprise Delivery",
    description:
      "At Accenture, ship feature enhancements, change requests, and defect fixes on ASP.NET MVC / Oracle systems in a collaborative Agile team.",
  },
];

export const works: Project[] = [
  {
    title: "Verdikt",
    description:
      "Verdikt is a decoupled full-stack media review and data aggregation platform built with Java 17 (Spring Boot) and Next.js. It aggregates real-time data across movies, TV shows, books, and video games into a single, unified client experience while implementing resilient backend API handling, environment security, and cloud-native deployments.",
    className: "md:col-span-1",
    image: "/images/works/verdikt.png",
    github: "https://github.com/rishabhgjr10/Verdikt",
    live: "https://verdikt-two.vercel.app/",
    techStack: [
      "Java 17",
      "Spring Boot 3",
      "Spring Data JPA",
      "Hibernate",
      "MySQL (Aiven)",
      "Spring Security",
      "JUnit 5",
      "Mockito",
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "Render",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    title: "Pathway",
    description:
      "Pathway is an interactive travel website designed to help users explore new destinations, plan trips, and get inspired. With a simple and engaging UI, it offers travel recommendations based on interests and budget.",
    className: "md:col-span-1",
    image: "/images/works/pathway.png",
    github: "https://github.com/rishabhgjr10/Pathway",
    live: "https://pathway-eta.vercel.app/",
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vercel",
    ],
  },
];

export const experience: Experience[] = [
  {
    ico: <Server />,
    title: "Associate Software Engineer",
    company: "Accenture",
    location: "Gurugram, Haryana",
    period: "Nov. 2025 – Present",
    description:
      "Delivering feature enhancements, defect resolution, and backend improvements for enterprise ASP.NET MVC applications backed by Oracle in a collaborative Agile environment.",
  },
];

export const experienceHighlights = [
  "Implemented 10+ feature enhancements and bug fixes in enterprise ASP.NET MVC applications backed by Oracle, improving application stability and functionality.",
  "Delivered 15+ change requests spanning business logic, validations, and backend modules, ensuring alignment with evolving business requirements.",
  "Resolved 20+ application and environment issues through debugging and root cause analysis, minimizing downtime and improving system reliability.",
  "Enhanced 5+ application modules by implementing business validations and workflow improvements to streamline enterprise processes.",
  "Maintained 3+ enterprise applications through ongoing feature development, defect resolution, and configuration updates in a collaborative Agile environment.",
];

export const socialMedia: SocialLink[] = [
  {
    id: 1,
    img: <FaGithub />,
    href: "https://github.com/rishabhgjr10",
    label: "GitHub",
  },
  {
    id: 2,
    img: <FaLinkedinIn />,
    href: "https://www.linkedin.com/in/rishabhgjr/",
    label: "LinkedIn",
  },
  {
    id: 3,
    img: <SiLeetcode />,
    href: "https://leetcode.com/u/rishabhgjr7/",
    label: "LeetCode",
  },
  {
    id: 4,
    img: <SiCodechef />,
    href: "https://www.codechef.com/users/rishabh_gjr",
    label: "CodeChef",
  },
  {
    id: 5,
    img: <FaCode />,
    href: "https://codolio.com/profile/rishabhgjr10",
    label: "Codolio",
  },
  {
    id: 6,
    img: <FaEnvelope />,
    href: "mailto:rishabhgjr10@gmail.com",
    label: "Email",
  },
];

export const skills: Skill[] = [
  { name: "backend", description: "Java, C#, Spring Boot, ASP.NET", percentage: 90 },
  { name: "frontend", description: "Next.js, React, TypeScript", percentage: 80 },
];

export const skillsIcons = [
  "java",
  "springboot",
  "csharp",
  "dotnet",
  "oracle",
  "mysql",
  "spring",
  "hibernate",
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "html5",
  "css3",
  "tailwindcss",
  "nodedotjs",
  "docker",
  "git",
  "github",
  "jira",
  "vercel",
  "junit5",
  "visualstudio",
  "visualstudiocode",
];
