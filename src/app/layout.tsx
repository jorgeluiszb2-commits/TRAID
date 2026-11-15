import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  icons: { icon: '/favicon.svg' },
  title: {
    default: 'TRAID — Aprende trading e inversión con seguridad',
    template: '%s · TRAID',
  },
  description:
    'TRAID es una plataforma educativa en español para aprender trading, inversión y mercados financieros: cursos, guías, ejercicios y un simulador de dinero ficticio. No ejecuta operaciones reales.',
};

export const viewport: Viewport = {
  themeColor: '#060a13',
  colorScheme: 'dark',
};

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/simulador', label: 'Simulador' },
  { href: '/registro', label: 'Crear cuenta' },
] as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#main-content">Saltar al contenido principal</a>

        <div className="edu-banner" role="status">
          TRAID es una herramienta educativa. No ejecuta operaciones reales ni ofrece asesoría financiera personalizada.
        </div>

        <header className="site-header">
          <div className="container">
            <Link className="brand" href="/" aria-label="TRAID, página de inicio">
              <span className="brand-mark" aria-hidden="true">₿</span>
              <span>
                <span className="brand-name">TRAID</span>
                <span className="brand-tag">Aprende antes de operar</span>
              </span>
            </Link>
            <nav aria-label="Navegación principal">
              <ul className="site-nav">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main id="main-content">{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>
              <strong>TRAID es una herramienta educativa. No ejecuta operaciones reales ni ofrece asesoría financiera personalizada.</strong>
              {' '}TRAID no se conecta a exchanges, brokers, wallets ni bancos; no custodia dinero; no acepta depósitos ni retiros; no promete ganancias ni presenta ninguna inversión como segura.
              Cualquier simulación de mercado usa datos de prueba y no predice resultados.
            </p>
            <p style={{ marginTop: '.5rem' }}>
              © 2026 TRAID · Plataforma educativa de mercados financieros.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
