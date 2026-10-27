import { ImageResponse } from "next/og";
import { site } from "@/content/profile";

export const dynamic = "force-static";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const rings = Array.from({ length: 7 }, (_, i) => i);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#05070a", color: "#eef2f5", position: "relative", fontFamily: "sans-serif" }}>
        {rings.map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              right: 180 - i * 22,
              top: 315 - (420 - i * 55) / 2,
              width: 420 - i * 55,
              height: 420 - i * 55,
              borderRadius: "50% 50% 8px 8px",
              border: `3px solid ${i % 2 ? "#39d5ff" : "#ff6b1a"}`,
              opacity: 1 - i * 0.12,
              display: "flex",
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72, width: 720 }}>
          <div style={{ fontSize: 30, color: "#ff6b1a", marginBottom: 20 }}>Tecnología aplicada a la obra civil</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>Juan Sebastián De León Rapalino</div>
          <div style={{ fontSize: 28, color: "#a3b0bd", marginTop: 24 }}>Control operativo · Automatización · Inteligencia artificial</div>
        </div>
      </div>
    ),
    size,
  );
}
