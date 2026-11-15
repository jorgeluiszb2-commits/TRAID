# AGENTS.md — Guía para agentes de IA en TRAID

## Qué es TRAID
Plataforma web educativa en español para aprender trading, inversión y mercados financieros.
**No ejecuta operaciones reales ni ofrece asesoría financiera personalizada.** Decisiones de
producto y de despliegue: la persona propietaria (jorgeluiszb2-commits).

## Reglas de trabajo

- Cada agente trabaja en su rama `agent/<nombre-de-ia>`. Nunca en `main` ni en ramas ajenas.
- Commits pequeños, mensaje breve en presente («añade catálogo con búsqueda»).
- Nunca subir `.env`, `.env.local`, claves ni datos personales. `.gitignore` ya protege `.env*`.
- No borres ni reemplaces trabajo de otros agentes sin acordar la propiedad de los archivos.
- Toda página relevante debe mostrar: «TRAID es una herramienta educativa. No ejecuta operaciones reales ni ofrece asesoría financiera personalizada.»
- Nada de promesas de ganancias ni recomendaciones personalizadas. Todo ejemplo de mercado se marca como simulado/ficticio.

## Stack
Next.js (App Router) · TypeScript estricto · React 19 · Supabase (datos/auth) · Vercel (deploy).

## Estructura
```
app/                  # rutas (App Router)
  globals.css         # sistema de diseño (vigilar tokens CSS)
  layout.tsx          # cabecera, aviso permanente, pie legal
  page.tsx            # inicio
  cursos/             # catálogo (page) + [slug]/page.tsx (detalle)
src/lib/types.ts      # tipos de dominio
src/lib/supabase/     # clientes Supabase (nunca claves secretas fuera del servidor)
src/data/             # datos de ejemplo claramente marcados
public/               # estáticos
```

## Convenciones
- TypeScript `strict` + `noUncheckedIndexedAccess`; sin `any` salvo necesidad justificada.
- Componentes cliente solo cuando hay interactividad (`'use client'`).
- Rutas de detalle estáticas con `generateStaticParams` + `dynamicParams = false`.
- Accesibilidad: etiquetas en formularios, teclado operativo, `aria-live` para mensajes.
- Contenido en español; código e identificadores en inglés.

## Verificación antes de publicar
1. `git status --short --branch` → debes estar en tu rama.
2. `npm run check` y `npm run build` sin errores.
3. Revisa que no entra ningún archivo de entorno; `git diff --cached` antes del commit.
4. Publica en tu rama y comparte los hashes; el PR a `main` lo abre la persona propietaria.

## Estado actual (entrega 1)
Sitio público: inicio, catálogo con búsqueda/filtros, detalle de curso, páginas informativas
(simulador, registro, login) y cliente Supabase degradante cuando faltan variables.
Pendiente: auth, RLS/migraciones, lecciones, cuestionarios, simulador, tutor de IA.
