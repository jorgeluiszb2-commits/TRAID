import Link from 'next/link';

const PILLARS = [
  {
    icon: '📚',
    title: 'Aprende con cursos claros',
    body: 'Guías progresivas desde cero: cómo funcionan los mercados, qué es el riesgo, cómo leer un gráfico y cómo proteger tu capital de prueba.',
  },
  {
    icon: '🧪',
    title: 'Practica sin riesgo',
    body: 'Un simulador con saldo y cartera ficticios para experimentar compras y ventas. Nada es real, nada se envía a ningún mercado.',
  },
  {
    icon: '🧭',
    title: 'Decide con criterio',
    body: 'Ejercicios, cuestionarios y explicaciones, no recomendaciones. TRAID enseña a pensar; cada decisión de inversión es tuya y solo tuya.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Educación financiera, sin humo</p>
            <h1>Entiende los mercados <span>antes de arriesgar un euro</span>.</h1>
            <p className="lead">
              TRAID es una plataforma educativa en español sobre trading, inversión y mercados financieros:
              cursos para principiantes, ejercicios, y un simulador con dinero ficticio.
              Sin promesas de rentabilidad, sin recomendaciones y sin dinero real.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/cursos">Explorar cursos</Link>
              <Link className="btn btn-ghost" href="/simulador">Conocer el simulador</Link>
            </div>
          </div>
          <aside className="panel-note" aria-label="Límites del producto">
            <strong>Lo que TRAID nunca hace</strong>
            <ul className="check-list" style={{ marginTop: '.5rem' }}>
              <li>Ejecutar compras o ventas reales</li>
              <li>Conectar con tu banco, broker o wallet</li>
              <li>Pedir claves privadas, frases semilla o tarjetas</li>
              <li>Prometer beneficios ni presentar una inversión como segura</li>
              <li>Dar asesoría financiera personalizada</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="container" aria-labelledby="pillars-title">
        <h2 id="pillars-title" className="sr-only">Cómo funciona TRAID</h2>
        <div className="feature-grid">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="card">
              <div className="feature-icon" aria-hidden="true">{pillar.icon}</div>
              <h3 style={{ marginTop: '.5rem' }}>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container" aria-label="Contenido disponible">
        <div className="stat-strip">
          <div className="stat card"><b>8</b><span>cursos de ejemplo para empezar, desde nivel cero</span></div>
          <div className="stat card"><b>0 €</b><span>de riesgo: el simulador usa saldo y datos ficticios</span></div>
          <div className="stat card"><b>100%</b><span>educativo: decisiones siempre tuyas, sin recomendaciones</span></div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '3.5rem' }}>
        <div className="card">
          <h2>¿Por dónde empezar?</h2>
          <p style={{ color: 'var(--muted)', margin: '.5rem 0 1rem' }}>
            Si nunca has invertido, empieza por «Inversión desde cero». Si ya conoces lo básico,
            pasa a «Gestión del riesgo esencial». Y cuando quieras, practica en el simulador
            con datos ficticios.
          </p>
          <Link className="btn btn-primary" href="/cursos/inversion-desde-cero">Empezar el primer curso</Link>
        </div>
      </section>
    </>
  );
}
