import { ImageResponse } from "next/og";

export const alt = "Victor Ezike, Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Preview card shown when the portfolio link is shared (LinkedIn, X, WhatsApp, Slack...)
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #080f1c 0%, #0e1829 55%, #1f3a5f 100%)",
          color: "#f4f6fa",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "linear-gradient(135deg, #dfc28c, #b5863e)",
              color: "#080f1c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            VE
          </div>
          <div style={{ fontSize: 26, color: "#aab5ca", fontFamily: "sans-serif" }}>
            victor-ezike.vercel.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Victor Ezike</div>
          <div style={{ fontSize: 44, color: "#d1a861", marginTop: 16 }}>
            Software Engineer
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#aab5ca", fontFamily: "sans-serif" }}>
          React · Next.js · C#/.NET · Node.js · PHP · Lagos
        </div>
      </div>
    ),
    size
  );
}
