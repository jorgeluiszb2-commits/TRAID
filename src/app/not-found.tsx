import Link from 'next/link';

export const metadata = {
  title: 'Página no encontrada',
};

export default function NotFound() {
  return (
    <div className="container">
      <div className="page-head">
        <h1>404 — Esta página no existe</h1>
        <p>La dirección puede haber cambiado o la página aún no está publicada.</p>
      </div>
      <div className="card" style={{ maxWidth: 520 }}>
        <p style={{ color: 'var(--muted)' }}>Rutas seguras de la casa:</p>
        <ul className="check-list" style={{ marginTop: '.5rem' }}>
          <li><Link href="/" style={{ color: 'var(--accent)' }}>Ir al inicio</Link></li>
          <li><Link href="/cursos" style={{ color: 'var(--accent)' }}>Explorar el catálogo de cursos</Link></li>
          <li><Link href="/simulador" style={{ color: 'var(--accent)' }}>Ver el simulador (próximamente)</Link></li>
        </ul>
      </div>
    </div>
  );
}
