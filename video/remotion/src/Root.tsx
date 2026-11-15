import { Composition } from "remotion";
import { ClaseVideo } from "./ClaseVideo";

const classes = [
  { id: "Clase1", title: "TRAID - Clase 1", subtitle: "Introduccion al trading educativo", audio: "audio/clase1.wav" },
  { id: "Clase2", title: "TRAID - Clase 2", subtitle: "Oferta, demanda y gestion del riesgo", audio: "audio/clase2.wav" },
  { id: "Clase3", title: "TRAID - Clase 3", subtitle: "Ordenes y cartera simulada", audio: "audio/clase3.wav" },
  { id: "Clase4", title: "TRAID - Clase 4", subtitle: "Analisis tecnico basico", audio: "audio/clase4.wav" },
  { id: "Clase5", title: "TRAID - Clase 5", subtitle: "Psicologia y control del riesgo", audio: "audio/clase5.wav" },
];

export const RemotionRoot = () => {
  return (
    <>
      {classes.map((c) => (
        <Composition
          key={c.id}
          id={c.id}
          component={ClaseVideo}
          defaultProps={{ title: c.title, subtitle: c.subtitle, audioFile: c.audio }}
          durationInFrames={600}
          fps={30}
          width={1280}
          height={720}
        />
      ))}
    </>
  );
};
