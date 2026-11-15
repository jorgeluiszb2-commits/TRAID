import { Composition } from "remotion";
import { ClaseVideo } from "./ClaseVideo";

const classes = [
  {
    id: "Clase1",
    title: "TRAID - Clase 1",
    subtitle: "Introduccion al trading educativo",
    audio: "audio/clase1.wav",
    text: "Bienvenido a TRAID. Esta es una clase de introduccion al trading educativo. Aprenderas conceptos basicos de mercados financieros de forma segura y sin dinero real.",
  },
  {
    id: "Clase2",
    title: "TRAID - Clase 2",
    subtitle: "Oferta, demanda y gestion del riesgo",
    audio: "audio/clase2.wav",
    text: "En esta segunda clase aprenderas que el trading educativo se basa en analizar mercados sin arriesgar dinero real. Estudiaremos conceptos de oferta y demanda, volatilidad y gestion del riesgo. Recuerda que los precios simulados no representan el mercado real.",
  },
  {
    id: "Clase3",
    title: "TRAID - Clase 3",
    subtitle: "Ordenes y cartera simulada",
    audio: "audio/clase3.wav",
    text: "La tercera clase explica como funcionan las ordenes de compra y venta en un simulador. Veremos ordenes de mercado y limite, comisiones ficticias y como se calcula el valor de la cartera. Todo es simulado y no ejecuta operaciones reales.",
  },
  {
    id: "Clase4",
    title: "TRAID - Clase 4",
    subtitle: "Analisis tecnico basico",
    audio: "audio/clase4.wav",
    text: "En la cuarta clase revisamos el analisis tecnico basico: medias moviles, soportes y resistencias. Aprenderas a interpretar graficos de velas y a identificar tendencias. Estos conceptos son educativos y no garantizan resultados futuros.",
  },
  {
    id: "Clase5",
    title: "TRAID - Clase 5",
    subtitle: "Psicologia y control del riesgo",
    audio: "audio/clase5.wav",
    text: "La quinta clase trata sobre gestion del riesgo y psicologia del trading. Hablaremos de stop loss, take profit y control emocional. El simulador de TRAID te permite practicar sin dinero real. No es asesoria financiera.",
  },
  {
    id: "Clase6",
    title: "TRAID - Clase 6",
    subtitle: "Diversificacion y correlacion",
    audio: "audio/clase6.wav",
    text: "La sexta clase explica diversificacion y correlacion entre activos. Aprenderas a no concentrar todo el riesgo en un solo activo y a usar carteras equilibradas. Solo con fines educativos.",
  },
  {
    id: "Clase7",
    title: "TRAID - Clase 7",
    subtitle: "Volumen y liquidez",
    audio: "audio/clase7.wav",
    text: "En la septima clase veremos indicadores de volumen y liquidez. Comprenderas como el volumen confirma o contradice los movimientos de precio en un mercado simulado.",
  },
  {
    id: "Clase8",
    title: "TRAID - Clase 8",
    subtitle: "Buenas practicas y cierre",
    audio: "audio/clase8.wav",
    text: "La octava clase cierra el curso con un repaso de buenas practicas: plan de trading, diario de operaciones y disciplina. El simulador de TRAID te permite practicar sin dinero real.",
  },
];

export const RemotionRoot = () => {
  return (
    <>
      {classes.map((c) => (
        <Composition
          key={c.id}
          id={c.id}
          component={ClaseVideo}
          defaultProps={{ title: c.title, subtitle: c.subtitle, audioFile: c.audio, text: c.text }}
          durationInFrames={600}
          fps={30}
          width={1280}
          height={720}
        />
      ))}
    </>
  );
};
