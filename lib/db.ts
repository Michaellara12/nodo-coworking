"use client";

import { getSupabase } from "./supabase";
import type {
  Inscripcion,
  InscripcionEstado,
  MetodoPago,
  Mision,
  Profile,
} from "./types";

/* Capa de acceso a datos de la plataforma. Todas las funciones lanzan el
 * error de Supabase tal cual para que la UI decida (p. ej. setup pendiente). */

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await getSupabase()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchMisiones(): Promise<Mision[]> {
  const { data, error } = await getSupabase()
    .from("misiones")
    .select("*")
    .order("anio", { ascending: true })
    .order("mes", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchMision(id: string): Promise<Mision | null> {
  const { data, error } = await getSupabase()
    .from("misiones")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchMisInscripciones(userId: string): Promise<Inscripcion[]> {
  const { data, error } = await getSupabase()
    .from("inscripciones")
    .select("*, mision:misiones(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function crearInscripcion(input: {
  misionId: string;
  userId: string;
  metodoPago: MetodoPago;
  monto: number;
  moneda: string;
  estado: InscripcionEstado;
}): Promise<Inscripcion> {
  const { data, error } = await getSupabase()
    .from("inscripciones")
    .insert({
      mision_id: input.misionId,
      user_id: input.userId,
      metodo_pago: input.metodoPago,
      monto: input.monto,
      moneda: input.moneda,
      estado: input.estado,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function actualizarInscripcion(
  id: string,
  cambios: Partial<Pick<Inscripcion, "estado" | "metodo_pago">>
): Promise<void> {
  const { error } = await getSupabase()
    .from("inscripciones")
    .update(cambios)
    .eq("id", id);
  if (error) throw error;
}

/* ——— Admin ——— */

export async function crearMision(
  mision: Omit<Mision, "id" | "created_at">
): Promise<Mision> {
  const { data, error } = await getSupabase()
    .from("misiones")
    .insert(mision)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function actualizarMision(
  id: string,
  cambios: Partial<Omit<Mision, "id" | "created_at">>
): Promise<void> {
  const { error } = await getSupabase().from("misiones").update(cambios).eq("id", id);
  if (error) throw error;
}

export async function fetchInscripcionesDeMision(misionId: string): Promise<Inscripcion[]> {
  const { data, error } = await getSupabase()
    .from("inscripciones")
    .select("*, profile:profiles(*)")
    .eq("mision_id", misionId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchTodasInscripciones(): Promise<Inscripcion[]> {
  const { data, error } = await getSupabase()
    .from("inscripciones")
    .select("*, mision:misiones(*), profile:profiles(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
