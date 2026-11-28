import { ImageResponse } from "next/og";
export const alt = "Waldir Reis — Business Intelligence & Analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0e1a2b", color: "#eef2f7" }}>
        <div style={{ fontSize: 34, color: "#9aabc2" }}>Waldir Reis · Business Intelligence & Analytics</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}><span>Negócio, dados e tecnologia.</span><span style={{ color: "#f5b53d" }}>Conectados para gerar resultados.</span></div>
        <div style={{ display: "flex", gap: 48, marginTop: 48, fontSize: 36, color: "#f5b53d" }}>
          <span>ROI +8,6 p.p.</span><span>Payback 7 meses</span><span>15+ anos</span>
        </div>
      </div>
    ),
    size,
  );
}
