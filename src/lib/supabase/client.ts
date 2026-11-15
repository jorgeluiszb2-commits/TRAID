import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente de Supabase para el navegador (componentes cliente).
 *
 * Solo usa la clave PÚBLICA (publishable o anon en proyectos legacy).
 * Nunca metas aquí claves secretas / service_role.
 *
 * Devuelve `null` si el proyecto aún no está configurado: la interfaz
 * debe degradar con elegancia y avisar de que la cuenta llegará pronto.
 */
export function createBrowserSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publicKey) {
    return null;
  }
  return createClient(url, publicKey);
}

/** true cuando el proyecto tiene las variables públicas mínimas definidas. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );
}
