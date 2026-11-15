'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { SAMPLE_COURSES } from '@/data/courses';
import type { CourseCategory, CourseLevel } from '@/lib/types';

const LEVELS: CourseLevel[] = ['Principiante', 'Intermedio', 'Avanzado'];
const CATEGORIES: CourseCategory[] = [
  'Fundamentos',
  'Análisis',
  'Gestión del riesgo',
  'Estrategias',
  'Criptomonedas',
  'Psicología',
];

export function CourseCatalog() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<CourseLevel | ''>('');
  const [category, setCategory] = useState<CourseCategory | ''>('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(search), 150);
    return () => window.clearTimeout(t);
  }, [search]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return SAMPLE_COURSES.filter((course) => {
      if (level && course.level !== level) return false;
      if (category && course.category !== category) return false;
      if (!q) return true;
      const haystack = [
        course.title, course.description, course.professor,
        course.category, course.level, course.tags.join(' '),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [debounced, level, category]);

  return (
    <>
      <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="course-search">Buscar</label>
          <input
            id="course-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tema, activo, riesgo, velas…"
            autoComplete="off"
          />
        </div>
        <div className="field">
          <label htmlFor="filter-level">Nivel</label>
          <select id="filter-level" value={level} onChange={(e) => setLevel(e.target.value as CourseLevel | '')}>
            <option value="">Todos los niveles</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="filter-category">Categoría</label>
          <select id="filter-category" value={category} onChange={(e) => setCategory(e.target.value as CourseCategory | '')}>
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </form>

      <p aria-live="polite" style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
        {filtered.length === 0
          ? 'Ningún curso coincide con la búsqueda.'
          : `${filtered.length} ${filtered.length === 1 ? 'curso encontrado' : 'cursos encontrados'}.`}
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state" role="status">
          <strong>Sin resultados</strong>
          <p>Prueba con palabras más generales («riesgo», «cripto», «gráfico») o quita los filtros.</p>
          <button type="button" className="btn btn-small" style={{ marginTop: '.75rem' }}
            onClick={() => { setSearch(''); setLevel(''); setCategory(''); }}>
            Borrar filtros
          </button>
        </div>
      ) : (
        <ul className="course-grid" style={{ listStyle: 'none' }}>
          {filtered.map((course) => (
            <li key={course.slug}>
              <Link className="card course-card" href={`/cursos/${course.slug}`}>
                <div className="course-meta">
                  <span className={`badge badge-level-${course.level.toLowerCase()}`}>{course.level}</span>
                  <span className="badge">{course.category}</span>
                  {course.isSample && <span className="badge badge-sample">Contenido de ejemplo</span>}
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>
                  {course.lessons.length} lecciones · {course.professor}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
