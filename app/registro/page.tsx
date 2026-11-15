import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear cuenta (próximamente)',
  description: 'Las cuentas de TRAID llegarán con la configuración de Supabase Auth por parte del propietario del proyecto.',
};

export default function RegisterPage() {
  return (
    <div className="container">
      <div className="page-head">
        <h1>Crear cuenta (próximamente)</h1>
        <p>
          Las cuentas de estudiantes y profesores llegarán cuando el propietario del proyecto
          configure <strong>Supabase Auth</strong>. Esta página aún no recoge datos: no verás
          aquí ningún formulario hasta que la autenticación esté revisada.
        </p>
      </div>
      <div className="notice-grid">
        <div className="card">
          <h2>Mientras tanto</h2>
          <p style={{ color: 'var(--muted)' }}>
            Explora el <a href="/cursos" style={{ color: 'var(--accent)' }}>catálogo de cursos</a> de
            ejemplo. No necesitas cuenta para leerlo.
          </p>
        </div>
        <div className="card">
          <h2>Qué necesitaremos</h2>
          <p style={{ color: 'var(--muted)' }}>
            Un proyecto de Supabase (base de datos, autenticación con verificación de correo) y las
            variables <code>NEXT_PUBLIC_SUPABASE_URL</code> y{' '}
            <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> configuradas por el propietario,
            nunca compartidas por chat ni por commits.
          </p>
        </div>
        <div className="card">
          <h2>Lo que nunca pediremos</h2>
          <ul className="check-list">
            <li>Contraseñas fuera del flujo seguro de Supabase</li>
            <li>Claves privadas, frases semilla o datos bancarios</li>
            <li>Más datos personales de los imprescindibles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
