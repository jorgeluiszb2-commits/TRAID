import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente de Supabase para el navegador (componentes cliente).
 *
 * Solo usa la clave PUBLICABLE (o la anon en proyectos legacy).
 * Nunca metas aquí claves secretas / service_role.
 *
 * Devuelve `null` si el proyecto aún no está configurado: la interfaz
 * debe degradar con elegancia y avisar de que la cuenta llegará pronto.
 */
export function createBrowserSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return null;
  }
  return createClient(url, publishableKey);
}

/** true cuando el proyecto tiene las variables públicas mínimas definidas. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
