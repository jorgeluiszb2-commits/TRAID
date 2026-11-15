import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulador de dinero ficticio',
  description: 'El simulador de TRAID llegará: saldo, cartera e historial ficticios para practicar sin riesgo. Nada de dinero real.',
};

export default function SimulatorPage() {
  return (
    <div className="container">
      <div className="page-head">
        <h1>Simulador de trading (próximamente)</h1>
        <p>
          Practicarás con saldo, cartera e historial <strong>ficticios</strong>. Los precios que
          verás serán datos simulados generados localmente (o de un proveedor con licencia,
          si el propietario lo configura): <strong>no representan el mercado real</strong>.
        </p>
      </div>

      <div className="notice-grid">
        <div className="card">
          <h2>SIMULACIÓN — DATOS DE PRUEBA — SIN DINERO REAL</h2>
          <p style={{ color: 'var(--muted)', marginTop: '.35rem' }}>
            El simulador no ejecuta órdenes reales, no se conecta a exchanges ni a brokers
            y no mueve dinero. Todo lo que ocurra aquí es práctica.
          </p>
        </div>
        <div className="card">
          <h2>Qué podrás hacer</h2>
          <ul className="check-list">
            <li>Comprar y vender con saldo ficticio y validaciones</li>
            <li>Seguir una cartera y un historial de operaciones de prueba</li>
            <li>Reiniciar la simulación cuando lo necesites</li>
            <li>Ver tu progreso y practicar estrategias sin riesgo</li>
          </ul>
        </div>
        <div className="card">
          <h2>Lo que nunca hará</h2>
          <ul className="check-list">
            <li>Predicciones de mercado ni promesas de rentabilidad</li>
            <li>Recomendaciones personalizadas sobre qué comprar</li>
            <li>Conexión con tu banco, broker o wallet</li>
            <li>Depósitos o retiros, reales o «de prueba» fuera de la app</li>
          </ul>
        </div>
      </div>

      <div className="panel-note">
        <strong>Estado:</strong> en desarrollo. Se publicará en una entrega próxima con
        revisión independiente. Mientras tanto, el mejor simulador eres tú con el catálogo
        de cursos de ejemplo.
      </div>
    </div>
  );
}
