# TRAID

**TRAID es una herramienta educativa. No ejecuta operaciones reales ni ofrece asesoría financiera personalizada.**

Plataforma educativa en español para aprender trading, inversión y mercados financieros: cursos, guías, ejercicios, un simulador con dinero ficticio y un tutor de IA (futura integración). Sin dinero real, sin conexiones a exchanges ni wallets, sin promesas de rentabilidad.

---

## Requisitos

- Node.js ≥ 20.9 (recomendado ≥ 22) y npm.
- Opcional: proyecto en [Supabase](https://supabase.com/) para autenticación y datos (la app arranca sin él, con funciones limitadas).

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellena las variables cuando tengas Supabase
npm run dev                  # http://localhost:3000
```

## Verificaciones

```bash
npm run check   # tsc --noEmit (TypeScript estricto)
npm run lint    # ESLint (config de Next, core-web-vitals)
npm run build   # build de producción de Next.js
```

## Variables de entorno

Copia `.env.example` a `.env.local`. **Nunca** subas `.env.local` ni compartas valores reales.

| Variable | Uso | Notas |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | navegador y servidor | URL pública del proyecto |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | navegador y servidor | Clave publicable (o `NEXT_PUBLIC_SUPABASE_ANON_KEY` en proyectos legacy) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | alternativa legacy | Misma naturaleza que la publicable |
| `SUPABASE_SERVICE_ROLE_KEY` | solo servidor | Nunca en el navegador ni en `NEXT_PUBLIC_*` |
| `NEXT_PUBLIC_SITE_URL` | metadatos/enlaces | `http://localhost:3000` en local |

Si faltan las variables de Supabase, la app funciona igualmente: las páginas de cuenta muestran «próximamente» y el catálogo usa datos de ejemplo.

## Configurar Supabase (cuando esté disponible)

1. Crea un proyecto en Supabase.
2. Project Settings → API: copia la URL y la clave **publishable** (o **anon** en legacy); la **service_role** solo para servidor.
3. Define las variables en `.env.local` y en el panel de **Vercel** → Environment Variables (Production y Preview).
4. Próximamente: migraciones SQL versionadas en `supabase/migrations/` (perfil, roles, cursos, inscripciones, progreso, simulador) con **Row Level Security** desde la primera tabla, ejecutables por el propietario con la CLI de Supabase o desde el editor SQL.

## Desplegar en Vercel

1. Importa el repositorio desde la cuenta del propietario.
2. Framework: Next.js (detección automática).
3. Project → Settings → Environment Variables: mismas variables que `.env.local`.
4. Cada push a rama genera un *preview deployment*; la fusión en `main` alimenta producción. Los despliegues y variables los autoriza el propietario.

Nada de este proyecto maneja dinero real.

## Estructura

Ver `AGENTS.md`. En resumen:

```
src/app/                  # rutas (App Router)
  globals.css             # sistema de diseño (Tailwind v4 + tokens propios)
  layout.tsx              # aviso educativo permanente, cabecera, pie legal
  page.tsx                # inicio
  cursos/                 # catálogo (búsqueda/filtros) + [slug]/ detalle
  simulador, registro, login/   # páginas informativas
src/lib/                  # tipos y acceso a datos (Supabase degradante)
src/data/                 # datos de ejemplo claramente marcados
```

## Estado y hoja de ruta

**Entrega 1:** scaffold Next.js + TypeScript estricto, sitio público (inicio, catálogo, detalle de curso, páginas informativas), cliente Supabase degradante, aviso educativo permanente, accesibilidad básica.

**Siguientes entregas:** autenticación con Supabase Auth (registro/login/recuperación), migraciones y RLS, área del estudiante, área del profesor, cuestionarios y progreso real, simulador de dinero ficticio, tutor de IA tras la decisión de proveedor del propietario.

## Límites y avisos

- TRAID no ejecuta operaciones reales ni se conecta a exchanges, brokers, wallets ni bancos.
- No custodia dinero ni acepta depósitos o retiros.
- No promete ganancias ni presenta ninguna inversión como segura.
- Los precios de ejemplo del futuro simulador serán **datos de prueba**, no del mercado real.
- Material educativo; no es asesoría financiera personalizada.
