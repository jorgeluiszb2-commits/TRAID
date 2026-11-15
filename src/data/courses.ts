import type { Course } from '@/src/lib/types';

/**
 * Catálogo de muestra de TRAID.
 *
 * Todo el contenido es de ejemplo con fines de demostración y será
 * revisado y publicado por profesores autorizados antes de abrir las
 * inscripciones. Los «profesores» son firmas ficticias de ejemplo.
 */
export const SAMPLE_COURSES: Course[] = [
  {
    slug: 'inversion-desde-cero',
    title: 'Inversión desde cero: cómo funcionan los mercados',
    description:
      'Qué es un activo, cómo se forma el precio, qué son acciones, bonos, fondos y criptomonedas, y por qué los precios suben y bajan.',
    category: 'Fundamentos',
    level: 'Principiante',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'Qué es invertir y qué no lo es', minutes: 15 },
      { order: 2, title: 'Los tipos de activos: acciones, bonos, fondos y cripto', minutes: 25 },
      { order: 3, title: 'Cómo se forma el precio: oferta y demanda', minutes: 20 },
      { order: 4, title: 'Volatilidad: por qué los precios cambian tanto', minutes: 20 },
      { order: 5, title: 'Costes: comisiones, spreads y slippage', minutes: 15 },
    ],
    requirements: ['Ninguno: es el punto de partida recomendado.'],
    tags: ['empezar', 'mercado', 'básico', 'precio', 'volatilidad'],
  },
  {
    slug: 'gestion-del-riesgo-esencial',
    title: 'Gestión del riesgo esencial',
    description:
      'Cómo dimensionar posiciones, usar límites de pérdida, diversificar y proteger tu capital simulado. La parte más importante de cualquier proceso de inversión.',
    category: 'Gestión del riesgo',
    level: 'Principiante',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'Riesgo asumible: nunca más de lo que puedes perder', minutes: 15 },
      { order: 2, title: 'Tamaño de posición y regla del 1–2 %', minutes: 25 },
      { order: 3, title: 'Stop-loss y take-profit explicados con ejemplos', minutes: 20 },
      { order: 4, title: 'Diversificación y correlación entre activos', minutes: 20 },
      { order: 5, title: 'Errores de riesgo de los principiantes', minutes: 15 },
    ],
    requirements: ['Haber completado «Inversión desde cero» o equivalente.'],
    tags: ['riesgo', 'stop-loss', 'posición', 'diversificación', 'capital'],
  },
  {
    slug: 'analisis-tecnico-introduccion',
    title: 'Análisis técnico: introducción práctica',
    description:
      'Velas japonesas, soportes y resistencias, tendencia y volumen. Aprende a leer gráficos sin asumir que predicen el futuro.',
    category: 'Análisis',
    level: 'Intermedio',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'Qué puede y qué no puede decirte un gráfico', minutes: 15 },
      { order: 2, title: 'Velas japonesas: apertura, cierre, máximos y mínimos', minutes: 25 },
      { order: 3, title: 'Soportes, resistencias y líneas de tendencia', minutes: 20 },
      { order: 4, title: 'Volumen y confirmación de movimientos', minutes: 20 },
      { order: 5, title: 'Errores comunes: sobreinterpretar patrones', minutes: 15 },
    ],
    requirements: ['Conocer qué es un mercado y qué es un precio.'],
    tags: ['gráfico', 'velas', 'soporte', 'resistencia', 'tendencia', 'volumen'],
  },
  {
    slug: 'analisis-fundamental',
    title: 'Análisis fundamental de empresas',
    description:
      'Ingresos, beneficios, deuda y valoración básica: cómo evaluar si un activo está caro o barato según sus fundamentales, fuera del precio.',
    category: 'Análisis',
    level: 'Intermedio',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'Estados financieros en 20 minutos', minutes: 20 },
      { order: 2, title: 'Ingresos, margen y beneficio por acción', minutes: 25 },
      { order: 3, title: 'Deuda, caja y solidez del balance', minutes: 20 },
      { order: 4, title: 'Valoración básica: PER y comparables', minutes: 25 },
      { order: 5, title: 'Cuándo el análisis fundamental no basta', minutes: 15 },
    ],
    requirements: ['Saber leer un gráfico básico.'],
    tags: ['fundamental', 'empresas', 'valoración', 'estados financieros'],
  },
  {
    slug: 'criptomonedas-con-cabeza',
    title: 'Criptomonedas con cabeza',
    description:
      'Qué es una criptomoneda, cómo funciona la blockchain, qué riesgos únicos tienen y cómo evitar estafas. Información prudente, sin promesas.',
    category: 'Criptomonedas',
    level: 'Principiante',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'Qué es la blockchain y por qué importa', minutes: 20 },
      { order: 2, title: 'Bitcoin: escasez, red y halving explicados', minutes: 25 },
      { order: 3, title: 'Altcoins, proyectos y señales de humo', minutes: 20 },
      { order: 4, title: 'Custodía y claves: lo único que de verdad posees', minutes: 25 },
      { order: 5, title: 'Estafas habituales y cómo desconfiar bien', minutes: 20 },
    ],
    requirements: ['Ninguno.'],
    tags: ['cripto', 'bitcoin', 'blockchain', 'seguridad', 'estafas'],
  },
  {
    slug: 'psicologia-del-inversor',
    title: 'Psicología del inversor',
    description:
      'FOMO, FUD, sobreconfianza y sesgo de confirmación: por qué la mayoría de decisiones de mercado las toma la emoción y cómo entrenar la disciplina.',
    category: 'Psicología',
    level: 'Intermedio',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'El mercado como espejo emocional', minutes: 15 },
      { order: 2, title: 'FOMO y FUD: anatomía de dos pánicos', minutes: 20 },
      { order: 3, title: 'Sesgo de confirmación y sobreconfianza', minutes: 20 },
      { order: 4, title: 'Un diario de inversión para ver tus patrones', minutes: 15 },
      { order: 5, title: 'Rutinas y límites: el superpoder del principiante', minutes: 15 },
    ],
    requirements: ['Curiosidad sobre tu propia toma de decisiones.'],
    tags: ['psicología', 'disciplina', 'fomo', 'sesgo', 'hábito'],
  },
  {
    slug: 'estrategias-de-largo-plazo',
    title: 'Estrategias de largo plazo',
    description:
      'Aportaciones periódicas, promediar el coste, rebalanceo y horizonte temporal. Comparación educativa de enfoques sin recomendar ninguno.',
    category: 'Estrategias',
    level: 'Avanzado',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'Largo plazo vs. corto plazo: expectativas realistas', minutes: 20 },
      { order: 2, title: 'Aportaciones periódicas y coste medio', minutes: 20 },
      { order: 3, title: 'Rebalanceo: cuándo y por qué', minutes: 20 },
      { order: 4, title: 'Fiscalidad básica en España (panorama general)', minutes: 20 },
      { order: 5, title: 'Construir tu propio plan sin copiar a nadie', minutes: 25 },
    ],
    requirements: ['Gestión del riesgo esencial completada.'],
    tags: ['largo plazo', 'dca', 'rebalanceo', 'fiscalidad', 'plan'],
  },
  {
    slug: 'libro-de-ordenes-y-liquidez',
    title: 'Libro de órdenes y liquidez (avanzado)',
    description:
      'Cómo funcionan los mercados a nivel de microestructura: bids, asks, spread, profundidad y slippage. Base técnica para entender ejecuciones.',
    category: 'Fundamentos',
    level: 'Avanzado',
    professor: 'Equipo docente TRAID (ejemplo)',
    isSample: true,
    lessons: [
      { order: 1, title: 'Quién pone el precio: subastas continuas', minutes: 15 },
      { order: 2, title: 'Bid, ask y spread: el precio de la inmediatez', minutes: 20 },
      { order: 3, title: 'Profundidad del libro y impacto de tus órdenes', minutes: 25 },
      { order: 4, title: 'Slippage en mercados rápidos y finos', minutes: 20 },
      { order: 5, title: 'Órdenes de mercado vs. órdenes límite', minutes: 20 },
    ],
    requirements: ['Volatilidad y costes ya conocidos.'],
    tags: ['libro de órdenes', 'liquidez', 'spread', 'slippage', 'microestructura'],
  },
];

/** Busca un curso por slug. */
export function findCourse(slug: string): Course | undefined {
  return SAMPLE_COURSES.find((course) => course.slug === slug);
}
