# TRAID

**TRAID es una herramienta educativa. No ejecuta operaciones reales ni ofrece asesoría financiera personalizada.**

Plataforma web educativa en español para aprender trading, inversión y mercados financieros: cursos, guías, ejercicios, un simulador con dinero ficticio y un tutor de IA (futura integración). Sin dinero real, sin conexiones a exchanges ni wallets, sin promesas de rentabilidad.

---

## Requisitos

- Node.js ≥ 20.9 (recomendado ≥ 22) y npm.
- Opcional: proyecto en [Supabase](https://supabase.com/) para autenticación y datos (la app arranca sin él, con funciones limitadas).

## Puesta en marcha (desarrollo local)

```bash
npm install
cp .env.example .env.local   # rellena las variables cuando tengas Supabase
npm run dev                  # http://localhost:3000
```

## Verificaciones

```bash
npm run check   # tsc --noEmit (TypeScript estricto)
npm run build   # build de producción de Next.js
```

## Variables de entorno

Copia `.env.example` a `.env.local`. **Nunca** subas `.env.local` ni compartas sus valores (ni por chat, issue, commit o PR).

| Variable | Dónde se usa | Notas |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | navegador y servidor | URL pública del proyecto |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | navegador y servidor | Clave publicable (o `anon` en proyectos legacy) |
| `NEXT_PUBLIC_SITE_URL` | metadatos/enlaces | `http://localhost:3000` en local; la URL de tu dominio en producción |

Las claves `service_role` / secretas solo pertenecen al código de servidor y **nunca** deben ir en variables `NEXT_PUBLIC_*`.

Si faltan las variables de Supabase, la app sigue funcionando: las páginas de cuenta muestran «próximamente» y los datos de cursos son de ejemplo.

## Configurar Supabase (cuando esté disponible)

1. Crea un proyecto en Supabase.
2. Project Settings → API: copia la URL y la clave **publishable** (o `anon`).
3. Define las variables de `.env.local` y verifica reiniciando `npm run dev`.
4. Próximamente: migraciones SQL versionadas en `supabase/migrations/` (perfil, roles, cursos, inscripciones, progreso, simulador) con **Row Level Security** ya habilitada desde la primera tabla. Las ejecutará el propietario del proyecto con la CLI de Supabase o desde el editor SQL.

## Desplegar en Vercel

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new) desde la cuenta del propietario.
2. Framework: Next.js (detección automática). No hacen falta ajustes de build por defecto.
3. Project → Settings → Environment Variables: define las mismas variables de `.env.local` para **Production** y **Preview**.
4. Cada push a una rama genera un *preview deployment*; al fusionar en `main`, producción. El propietario autoriza los despliegues y las variables.

No hay despliegue automático fuera de Vercel. Nada de este proyecto maneja dinero real.

## Estado y hoja de ruta

**Entrega 1 (esta rama):** scaffold Next.js + TypeScript estricto, sitio público (inicio, catálogo con búsqueda y filtros, detalle de curso, páginas de simulador/registro/login como contenido informativo), cliente Supabase degradante, aviso educativo permanente, accesibilidad básica.

**Siguientes entregas:** autenticación con Supabase Auth (registro/login/recuperación), migraciones y RLS, área del estudiante (progreso real), área del profesor (publicación de cursos), cuestionarios, simulador de dinero ficticio, tutor de IA tras la decisión de proveedor del propietario, moderación de comunidad.

## Estructura

Ver `AGENTS.md`. En resumen: `app/` (App Router), `src/lib/types.ts` (dominio), `src/lib/supabase/` (acceso a datos), `src/data/` (datos de ejemplo claramente marcados), `public/` (estáticos).

## Límites y avisos

- TRAID no ejecuta operaciones reales ni se conecta a exchanges, brokers, wallets ni bancos.
- No custodia dinero ni acepta depósitos o retiros.
- No promete ganancias ni presenta nada como seguro.
- Los precios de ejemplo del futuro simulador serán **datos de prueba**, no del mercado real.
- Este proyecto es material educativo; no es asesoría financiera personalizada.
