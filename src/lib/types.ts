/** Tipos de dominio de TRAID. */

export type CourseLevel = 'Principiante' | 'Intermedio' | 'Avanzado';

export type CourseCategory =
  | 'Fundamentos'
  | 'Análisis'
  | 'Gestión del riesgo'
  | 'Estrategias'
  | 'Criptomonedas'
  | 'Psicología';

export interface CourseLesson {
  order: number;
  title: string;
  /** Duración estimada en minutos. */
  minutes: number;
}

export interface Course {
  /** Identificador url-safe estable. */
  slug: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  /** Profesor responsable del curso. */
  professor: string;
  /** Marca de contenido de ejemplo: se sustituirá por contenido real revisado. */
  isSample: boolean;
  /** Número total de lecciones del temario. */
  lessons: CourseLesson[];
  /** Requisitos recomendados antes de empezar. */
  requirements: string[];
  /** Temas cubiertos, para la búsqueda y el filtrado. */
  tags: string[];
}
