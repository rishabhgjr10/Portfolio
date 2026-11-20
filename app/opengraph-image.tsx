import { ImageResponse } from "next/og";
import { personalInfo } from "@/data/index";

export const alt = `${personalInfo.name}, ${personalInfo.role} at ${personalInfo.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Edge runtime: also sidesteps a Next 14 bug where the Node build of @vercel/og crashes on Windows paths.
export const runtime = "edge";

/** Social preview card shown when the portfolio link is shared (LinkedIn, WhatsApp, Slack…). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#111111",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#f59e0b", letterSpacing: 4, textTransform: "uppercase" }}>
          Portfolio
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16 }}>{personalInfo.name}</div>
        <div style={{ fontSize: 40, marginTop: 12, display: "flex" }}>
          {personalInfo.role}
          <span style={{ color: "#eab308", marginLeft: 14 }}>@ {personalInfo.company}</span>
        </div>
        <div style={{ fontSize: 28, marginTop: 36, color: "#a1a1aa" }}>
          Java · Spring Boot · .NET · Next.js · Docker
        </div>
      </div>
    ),
    size
  );
}
