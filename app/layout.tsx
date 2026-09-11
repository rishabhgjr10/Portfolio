import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { inter } from "@/data/constants/fonts";
import { ToggleButton } from "@/components/toggle-theme";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { personalInfo } from "@/data/index";

export const metadata: Metadata = {
  title: "Rishabh Gurjar | Software Engineer Portfolio",
  description:
    "Portfolio of Rishabh Gurjar, a backend-focused Software Engineer building full-stack web and backend applications with Java, Spring Boot, C#, ASP.NET, Next.js, and cloud-native deployments.",
  keywords: [
    "Rishabh Gurjar",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Developer",
    "Java",
    "Spring Boot",
    "C#",
    "ASP.NET",
    "Next.js",
    "Accenture",
    "Verdikt",
    "Portfolio",
  ],
  authors: [{ name: personalInfo.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${inter.className} antialiased overflow-x-hidden bg-[#f8f8f8] dark:bg-cool-black relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToggleButton />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
