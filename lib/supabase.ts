"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
 * Cliente de Supabase para el navegador (singleton).
 * La plataforma interna es 100% client-side: la sesión vive en localStorage.
 */

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          /* Sin esto, auth-js se bloquea en el Navigator LockManager al
           * restaurar sesión tras recargar la página (deadlock conocido
           * con React StrictMode). Uso single-tab, no necesitamos el lock. */
          lock: async (_name, _timeout, fn) => await fn(),
        },
      }
    );
  }
  return client;
}

/* PostgREST devuelve estos códigos cuando falta correr supabase/schema.sql */
export function esErrorDeSetup(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    error.code === "42P01" ||
    (error.message ?? "").includes("schema cache")
  );
}
