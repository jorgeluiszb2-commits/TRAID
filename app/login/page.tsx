import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar sesión (próximamente)',
  description: 'El inicio de sesión de TRAID llegará con la configuración de Supabase Auth.',
};

export default function LoginPage() {
  return (
    <div className="container">
      <div className="page-head">
        <h1>Iniciar sesión (próximamente)</h1>
        <p>
          El inicio de sesión con correo y contraseña estará disponible cuando el propietario
          configure Supabase Auth. Esta página no recoge credenciales todavía.
        </p>
      </div>
      <div className="notice-grid">
        <div className="card">
          <h2>¿Aún no hay cuenta?</h2>
          <p style={{ color: 'var(--muted)' }}>
            Mira el catálogo de <a href="/cursos" style={{ color: 'var(--accent)' }}>cursos</a>.
            Cuando se abran las inscripciones, podrás crear una cuenta y seguir tu progreso.
          </p>
        </div>
        <div className="card">
          <h2>Recuperación de contraseña</h2>
          <p style={{ color: 'var(--muted)' }}>
            También llegará con Supabase Auth (flujo de restablecimiento por correo). No
            implementaremos un flujo propio para no almacenar contraseñas en TRAID.
          </p>
        </div>
      </div>
    </div>
  );
}
