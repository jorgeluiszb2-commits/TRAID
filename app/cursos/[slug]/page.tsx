import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SAMPLE_COURSES, findCourse } from '@/src/data/courses';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SAMPLE_COURSES.map((course) => ({ slug: course.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) return { title: 'Curso no encontrado' };
  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) notFound();

  const totalMinutes = course.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);

  return (
    <div className="container">
      <nav aria-label="Migas" style={{ paddingTop: '1.25rem', fontSize: '.85rem' }}>
        <Link href="/cursos" style={{ color: 'var(--accent)' }}>← Volver al catálogo</Link>
      </nav>

      <div className="page-head" style={{ paddingTop: '.75rem' }}>
        <div className="course-meta" style={{ marginBottom: '.5rem' }}>
          <span className={`badge badge-level-${course.level.toLowerCase()}`}>{course.level}</span>
          <span className="badge">{course.category}</span>
          {course.isSample && <span className="badge badge-sample">Contenido de ejemplo</span>}
        </div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      <div className="course-detail">
        <article>
          <h2>Temario</h2>
          <ol className="lesson-list">
            {course.lessons.map((lesson) => (
              <li key={lesson.order}>
                <span><strong>Lección {lesson.order}:</strong> {lesson.title}</span>
                <time>{lesson.minutes} min</time>
              </li>
            ))}
          </ol>
          <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginTop: '.5rem' }}>
            Duración estimada del curso: {totalMinutes} minutos de contenido.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>Requisitos</h2>
          <ul className="check-list">
            {course.requirements.map((req) => <li key={req}>{req}</li>)}
          </ul>

          <div className="panel-note" style={{ marginTop: '1.5rem' }}>
            <strong>Este contenido es de ejemplo.</strong> Lo publicará TRAID tras la
            revisión del profesorado. Las lecciones, ejercicios y cuestionarios estarán
            disponibles al abrir las inscripciones.
          </div>
        </article>

        <aside className="stack">
          <div className="card">
            <h2>Profesor</h2>
            <p style={{ color: 'var(--muted)', marginTop: '.35rem' }}>{course.professor}</p>
          </div>
          <div className="card">
            <h2>Inscripción</h2>
            <p style={{ color: 'var(--muted)', margin: '.35rem 0 .75rem', fontSize: '.9rem' }}>
              La inscripción y el seguimiento de tu progreso estarán disponibles cuando el
              propietario del proyecto configure las cuentas (Supabase Auth).
            </p>
            <Link className="btn btn-primary" href="/registro">Quiero avisarme</Link>
          </div>
          <div className="card">
            <h2>Límites educativos</h2>
            <p style={{ color: 'var(--muted)', marginTop: '.35rem', fontSize: '.9rem' }}>
              TRAID no ejecuta operaciones reales, no ofrece asesoría financiera personalizada
              y no promete ganancias. El aprendizaje se refuerza en el simulador con dinero ficticio.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
