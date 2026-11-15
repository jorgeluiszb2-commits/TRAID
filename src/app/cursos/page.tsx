import type { Metadata } from 'next';
import { CourseCatalog } from './catalog';

export const metadata: Metadata = {
  title: 'Catálogo de cursos',
  description:
    'Cursos de TRAID en español sobre inversión, trading y mercados financieros. Filtra por nivel y categoría. Contenido de ejemplo mientras se publican los cursos revisados.',
};

export default function CoursesPage() {
  return (
    <div className="container">
      <div className="page-head">
        <h1>Catálogo de cursos</h1>
        <p>
          Todos los cursos son educativos y no constituyen asesoría financiera. El catálogo actual
          es de <em>contenido de ejemplo</em>: los profesores de TRAID revisarán y publicarán el
          contenido definitivo. Las inscripciones llegarán con la autenticación.
        </p>
      </div>
      <CourseCatalog />
    </div>
  );
}
