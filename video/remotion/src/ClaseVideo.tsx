import { Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  title: string;
  subtitle: string;
  audioFile: string;
  text: string;
}

export const ClaseVideo = ({ title, subtitle, audioFile, text }: Props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const seconds = frame / fps;

  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const perSentence = Math.max(1, Math.floor(durationInFrames / sentences.length));
  const index = Math.min(sentences.length - 1, Math.floor(frame / perSentence));
  const currentSentence = sentences[index] ?? "";

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#0b1220",
        color: "#e6edf3",
        display: "flex",
        flexDirection: "column",
        padding: "60px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ borderBottom: "2px solid #38bdf8", paddingBottom: 16, marginBottom: 24 }}>
        <h1 style={{ fontSize: 44, margin: 0, color: "#38bdf8" }}>{title}</h1>
        <p style={{ fontSize: 20, margin: "8px 0 0", color: "#9fb0c3" }}>{subtitle}</p>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 32, lineHeight: 1.4, textAlign: "center", maxWidth: 1000 }}>
          {currentSentence}
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ height: 6, backgroundColor: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${(frame / durationInFrames) * 100}%`,
              backgroundColor: "#38bdf8",
            }}
          />
        </div>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>
          TRAID - Simulacion educativa | {seconds.toFixed(1)}s
        </p>
      </div>

      <Audio src={staticFile(audioFile)} />
    </div>
  );
};
