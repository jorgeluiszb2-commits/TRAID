import type { QuizQuestion } from '@/lib/types';

/**
 * Cuestionarios de EJEMPLO para los cursos de muestra.
 * Son material ilustrativo para el producto; cada respuesta incluye su explicación.
 * No son recomendaciones de inversión ni contenido revisado por profesorado real.
 */
export const SAMPLE_QUIZZES: Record<string, QuizQuestion[]> = {
  'inversion-desde-cero': [
    {
      question: '¿Qué describe mejor «inversión» según este curso?',
      options: [
        'Comprar cualquier activo pensando en revenderlo mañana',
        'Aportar dinero con criterio asumiendo plazo y riesgo medibles',
        'Elegir ganadores seguros para multiplicar el dinero rápido',
        'Copiar las decisiones de gente con más capital',
      ],
      correctIndex: 1,
      explanation: 'Invertir es comprometer recursos a cambio de un retorno incierto; nace del análisis y del horizonte, no de la prisa ni de terceros.',
    },
    {
      question: 'Si mucha gente compra lo mismo a la vez, ¿qué suele pasar con el precio?',
      options: ['No se mueve', 'Tiende a caer', 'Tiende a subir', 'Desaparece del mercado'],
      correctIndex: 2,
      explanation: 'La oferta y la demanda fijan el precio: al competir por las unidades disponibles, los compradores elevan el precio hasta equilibrarse.',
    },
    {
      question: '¿Qué es el «slippage»?',
      options: [
        'La comisión fija que cobra todo bróker por abrir una orden',
        'La diferencia entre el precio esperado y el precio de ejecución',
        'El interés que generan tus fondos mientras no operas',
        'La penalización por vender un activo antes de un año',
      ],
      correctIndex: 1,
      explanation: 'El slippage es la diferencia entre el precio al que esperabas ejecutar y el precio real, habitual cuando el mercado se mueve rápido o tu orden es grande.',
    },
  ],
  'gestion-del-riesgo-esencial': [
    {
      question: 'Según la regla del 1–2 %, ¿cuánto deberías arriesgar por operación?',
      options: [
        'Como máximo el 1–2 % de tu capital total en riesgo absoluto',
        'El 10 % para aprovechar mejor cada oportunidad',
        'Todo el capital jamás',
        'El 50 % si estás convencido de la operación',
      ],
      correctIndex: 0,
      explanation: 'Limitar la pérdida máxima por operación al 1–2 % permite sobrevivir rachas negativas sin destruir el capital.',
    },
    {
      question: '¿Qué es un stop-loss?',
      options: [
        'Una orden límite para comprar más barato',
        'Una orden que cierra la posición si el precio te perjudica',
        'Una comisión por cerrar antes de tiempo',
        'Una alerta de precios en tu móvil',
      ],
      correctIndex: 1,
      explanation: 'Un stop-loss es una orden de venta (o recompra en cortos) que se dispara al alcanzar un nivel desfavorable para materializar la pérdida prevista.',
    },
    {
      question: '¿Por qué diversificar?',
      options: [
        'Para eliminar el riesgo por completo',
        'Para duplicar la comisión pero estar acompañado',
        'Para que un solo activo no decida el resultado total de tu cartera',
        'Para pagar menos impuestos',
      ],
      correctIndex: 2,
      explanation: 'La diversificación reduce el riesgo específico de un activo; no elimina el riesgo de mercado, por eso nunca es una garantía.',
    },
  ],
  'analisis-tecnico-introduccion': [
    {
      question: '¿Qué significa una vela roja con cuerpo grande?',
      options: [
        'Que los vendedores dominaron el tramo cerrado muy por debajo de la apertura',
        'Que nadie operó en ese intervalo',
        'Que el mercado está cerrado por festivo',
        'Que el activo subió con poca volatilidad',
      ],
      correctIndex: 0,
      explanation: 'Una vela con cuerpo rojo grande indica una presión vendedora intensa durante ese periodo de tiempo.',
    },
    {
      question: '¿Qué es un «soporte»?',
      options: [
        'Una línea que el exchange marca técnicamente',
        'Un precio bajo el que históricamente aparecen compradores y el precio tiende a frenar o rebotar',
        'El coste de comisión que sujeta tu saldo',
        'La línea de tendencia de largo plazo del índice principal',
      ],
      correctIndex: 1,
      explanation: 'Un soporte es una zona de precio donde históricamente la demanda supera a la oferta; la resistencia es el concepto simétrico.',
    },
  ],
  'analisis-fundamental': [
    {
      question: '¿Qué mide aproximadamente el PER?',
      options: [
        'La proporción entre el precio de la acción y el beneficio que le corresponde',
        'La deuda total dividida por el valor contable',
        'El crecimiento de ingresos de los últimos 5 años',
        'La rentabilidad por dividendo de la acción',
      ],
      correctIndex: 0,
      explanation: 'PER = precio de la acción / beneficio por acción; indica cuántos años de beneficio «pagas» al comprarla, a iguales condiciones.',
    },
    {
      question: '¿Qué puede invalidar un buen análisis fundamental?',
      options: [
        'Que cambien los fundamentales: beneficios, deuda, competencia o entorno',
        'Que la acción cotice en otro país',
        'Que haya mucho volumen en el mercado',
        'El día de la semana en que consultes los datos',
      ],
      correctIndex: 0,
      explanation: 'Los fundamentales cambian con el tiempo; el análisis es una foto, no una promesa — por eso se revisa periódicamente.',
    },
  ],
  'criptomonedas-con-cabeza': [
    {
      question: '¿Qué es la «blockchain», en una frase?',
      options: [
        'Una base de datos distribuida e inmutable donde se registran las transacciones',
        'Un bróker descentralizado regulado por varios países',
        'Una app que guarda tus claves privadas cifradas',
        'El nombre técnico del libro de órdenes de Bitcoin',
      ],
      correctIndex: 0,
      explanation: 'La blockchain es un registro público y replicado, con reglas criptográficas; su valor está en la confianza sin intermediarios, no en ser mágica.',
    },
    {
      question: '¿Quién controla una dirección de criptomonedas?',
      options: [
        'El exchange donde se creó la cuenta',
        'Quien posee las claves privadas de esa dirección',
        'El desarrollador principal del protocolo',
        'La autoridad fiscal del país',
      ],
      correctIndex: 1,
      explanation: 'Quien tiene las claves controla los fondos; «not your keys, not your coins» es la regla de oro de la custodia.',
    },
    {
      question: '¿Cuál es una señal de alerta de estafa?',
      options: [
        'Prometer rendimientos garantizados y sin riesgo',
        'Pedir una pequeña aportación para ir incorporando gente',
        'Ser un proyecto escrito en inglés',
        'Publicar código abierto',
      ],
      correctIndex: 0,
      explanation: 'Las promesas de rentabilidad garantizada son la señal de estafa más universal; ningún mercado legítimo lo promete.',
    },
  ],
  'psicologia-del-inversor': [
    {
      question: '¿Qué es el FOMO?',
      options: [
        'Miedo a quedarse fuera (de una subida) que empuja a comprar sin análisis',
        'Miedo a perder el empleo y diversificar ingresos',
        'La emoción de cerrar una posición con beneficio',
        'El sesgo de recordar solo las operaciones ganadoras',
      ],
      correctIndex: 0,
      explanation: 'FOMO: el mercado avanza sin ti y eso duele; ese dolor fabrica compras impulsivas precisamente en niveles altos.',
    },
    {
      question: 'El sesgo de confirmación consiste en…',
      options: [
        'Confirmar con el bróker las órdenes antes de enviarlas',
        'Buscar solo información que confirma tu idea previa e ignorar la contraria',
        'Operar únicamente con figuras públicas como señal',
        'Verificar dos veces el precio antes de vender',
      ],
      correctIndex: 1,
      explanation: 'El cerebro filtra la realidad para proteger tus creencias; por eso un buen método documenta también los motivos para no operar.',
    },
  ],
  'estrategias-de-largo-plazo': [
    {
      question: 'Las aportaciones periódicas (DCA) buscan…',
      options: [
        'Comprar siempre en el mínimo exacto',
        'Promediar el coste de entrada repartiendo compras en el tiempo',
        'Reducir los impuestos por tramo',
        'Sincronizar las compras con las noticias',
      ],
      correctIndex: 1,
      explanation: 'Comprar con regularidad reduce el impacto de acertar el momento y gana ventaja emocional, no necesariamente retorno superior.',
    },
    {
      question: '¿Qué es el rebalanceo de una cartera?',
      options: [
        'Mover todo el dinero a lo que más subió el año pasado',
        'Ajustar los pesos de tus activos de vuelta a los objetivos de partida',
        'Cerrar toda la cartera una vez al año por fiscalidad',
        'Vender los activos en negativo para compensar pérdidas',
      ],
      correctIndex: 1,
      explanation: 'El rebalanceo recorta posiciones ganadoras y refuerza las perdedoras para mantener tu perfil de riesgo original.',
    },
  ],
  'libro-de-ordenes-y-liquidez': [
    {
      question: '¿Qué es el «spread»?',
      options: [
        'El coste de la inmediatez: diferencia entre mejor oferta y mejor demanda',
        'El margen entre tus ingresos y gastos personales',
        'La comisión fija mínima de todo exchange regulado',
        'El tamaño del agujero fiscal de la empresa',
      ],
      correctIndex: 0,
      explanation: 'Spread = ask − bid; cuanto más estrecho, más barato entrar y salir del mercado.',
    },
    {
      question: '¿Qué pasa con el precio cuando se comen todas las asks visibles?',
      options: [
        'El precio cae al siguiente bid',
        'El exchange pausa el mercado',
        'El precio sube al siguiente nivel de ask disponible',
        'No ocurre nada: el spread se lo traga el mercado',
      ],
      correctIndex: 2,
      explanation: 'Comprar agresivamente barre niveles contrarios; sin liquidez suficiente el precio avanza por el libro hacia asks más altos.',
    },
  ],
};

/** Devuelve el cuestionario del slug o un array vacío. */
export function getQuizFor(slug: string): QuizQuestion[] {
  return SAMPLE_QUIZZES[slug] ?? [];
}
