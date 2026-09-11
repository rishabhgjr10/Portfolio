<div align="center">
  <br />
  <h1>🚀 Rishabh Gurjar — Portfolio</h1>
  <p>
    A modern, responsive personal portfolio built with <strong>Next.js 14</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong> — showcasing backend-focused software engineering, full-stack projects, and professional experience.
  </p>

  <h3>
    <a href="https://portfolio-zeta-two-w94sqpil2g.vercel.app/">🌐 View Live Demo</a>
  </h3>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-11-E91E63?logo=framer&logoColor=white" alt="Framer Motion" /></a>
  </p>
</div>

---

## ✨ Features

- **Animated Hero Section** — Smooth entrance animations with Framer Motion and a meteor particle background effect.
- **Floating Navigation** — A sticky, animated navbar that appears on scroll for quick section access.
- **About & Highlights** — Overview of core competencies: backend engineering, full-stack delivery, API design, data/persistence, cloud-native deployments, and enterprise delivery.
- **Interactive Skills Cloud** — A 3D rotating icon cloud (via `react-icon-cloud`) displaying the full technology stack.
- **Project Showcase** — Bento-grid cards with screenshot previews (aspect-ratio containers, `object-top` alignment), tech stack badges, and direct links to live demos and GitHub repos.
- **Experience Timeline** — Professional experience with role details and key highlights.
- **Dark/Light Theme Toggle** — Seamless theme switching powered by `next-themes`.
- **Fully Responsive** — Mobile-first design that adapts cleanly across all screen sizes.
- **Vercel Analytics** — Built-in performance and usage analytics via `@vercel/analytics`.

---

## 🛠️ Tech Stack

| Layer         | Technologies                                                    |
| ------------- | --------------------------------------------------------------- |
| **Framework** | Next.js 14 (App Router), React 18, TypeScript 5                 |
| **Styling**   | Tailwind CSS 3.4, `tailwindcss-animate`, `class-variance-authority` |
| **Animation** | Framer Motion 11                                                |
| **UI**        | Aceternity UI, Magic UI, Radix UI Primitives, Lucide Icons      |
| **Extras**    | `react-icon-cloud`, `react-icons`, `next-themes`                |
| **Deploy**    | Vercel                                                          |

---

## 📂 Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata, fonts, theme provider
│   └── page.tsx            # Main page composing all sections
├── components/
│   ├── hero-section.tsx    # Animated hero with name, role, tagline
│   ├── about-section.tsx   # About me with highlight cards
│   ├── skills.tsx          # Skills bars + interactive icon cloud
│   ├── works-section.tsx   # Projects section heading + grid
│   ├── experience-section.tsx  # Work experience timeline
│   ├── citation-section.tsx    # Inspirational quote section
│   ├── footer.tsx          # Contact info + social links
│   ├── ui/                 # Reusable UI primitives
│   │   ├── bento-grid.tsx  # Project card grid component
│   │   ├── floating-navbar.tsx
│   │   ├── meteors.tsx     # Particle background effect
│   │   └── ...
│   └── magicui/            # Magic UI components (icon cloud, etc.)
├── data/
│   └── index.tsx           # All site data (projects, experience, skills, socials)
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── public/
│   ├── profile.jpg         # Profile photo
│   └── images/works/       # Project screenshots
└── tailwind.config.ts      # Custom theme, colors, animations
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/rishabhgjr10/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

This portfolio is optimized for deployment on [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Vercel auto-detects Next.js and deploys — no extra configuration needed.

---

## 📄 License

This project is open source and available for personal use and learning.

---

<div align="center">
  <p>Built with ❤️ by <strong>Rishabh Gurjar</strong></p>
</div>
