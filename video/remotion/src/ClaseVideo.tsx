import { Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  title: string;
  subtitle: string;
  audioFile: string;
}

export const ClaseVideo = ({ title, subtitle, audioFile }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;

  return (
    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0b1220", color: "white", display: "flex", flexDirection: "column" }}>
      <h1 style={{ fontSize: 48 }}>{title}</h1>
      <p style={{ fontSize: 24 }}>{subtitle}</p>
      <p style={{ fontSize: 18 }}>Tiempo: {seconds.toFixed(1)}s</p>
      <Audio src={staticFile(audioFile)} />
    </div>
  );
};
