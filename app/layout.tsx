import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { manrope } from "@/data/constants/fonts";
import { ToggleButton } from "@/components/toggle-theme";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { personalInfo } from "@/data/index";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-zeta-two-w94sqpil2g.vercel.app";
const DESCRIPTION =
  "Rishabh Gurjar — Software Engineer at Accenture. Backend services and full-stack apps with Java, Spring Boot, .NET and Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rishabh Gurjar | Software Engineer",
  description: DESCRIPTION,
  openGraph: {
    title: "Rishabh Gurjar | Software Engineer",
    description: DESCRIPTION,
    url: "/",
    siteName: "Rishabh Gurjar",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
    "SnapLink",
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
        className={`${manrope.className} antialiased overflow-x-hidden bg-[#f8f8f8] dark:bg-background relative`}
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
