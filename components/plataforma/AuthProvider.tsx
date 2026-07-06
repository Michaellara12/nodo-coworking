"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, esErrorDeSetup } from "@/lib/supabase";
import { fetchProfile } from "@/lib/db";
import type { Profile } from "@/lib/types";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  /* true mientras se resuelve la sesión inicial */
  cargando: boolean;
  /* true si la base de datos aún no tiene el schema (correr supabase/schema.sql) */
  setupPendiente: boolean;
  esAdmin: boolean;
  salir: () => Promise<void>;
  recargarPerfil: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cargando, setCargando] = useState(true);
  const [setupPendiente, setSetupPendiente] = useState(false);

  const cargarPerfil = useCallback(async (userId: string) => {
    try {
      let p = await fetchProfile(userId);
      if (!p) {
        /* el trigger de signup puede tardar un instante en crear el perfil */
        await new Promise((r) => setTimeout(r, 900));
        p = await fetchProfile(userId);
      }
      setProfile(p);
      setSetupPendiente(false);
    } catch (error) {
      if (esErrorDeSetup(error as { code?: string })) setSetupPendiente(true);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    let activo = true;

    /* IMPORTANTE: nada de await de llamadas a Supabase dentro del callback de
     * onAuthStateChange — bloquea el initialize del cliente en INITIAL_SESSION
     * (deadlock documentado) y la app se queda cargando tras un F5. Por eso el
     * perfil se carga diferido con setTimeout. */
    const manejarSesion = (nueva: Session | null) => {
      if (!activo) return;
      setSession(nueva);
      const uid = nueva?.user?.id;
      if (!uid) {
        setProfile(null);
        setCargando(false);
        return;
      }
      setTimeout(() => {
        if (!activo) return;
        void cargarPerfil(uid).finally(() => {
          if (activo) setCargando(false);
        });
      }, 0);
    };

    supabase.auth.getSession().then(({ data }) => manejarSesion(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, nueva) =>
      manejarSesion(nueva)
    );

    return () => {
      activo = false;
      sub.subscription.unsubscribe();
    };
  }, [cargarPerfil]);

  const salir = useCallback(async () => {
    await getSupabase().auth.signOut();
    setProfile(null);
  }, []);

  const recargarPerfil = useCallback(async () => {
    if (session?.user) await cargarPerfil(session.user.id);
  }, [session, cargarPerfil]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      cargando,
      setupPendiente,
      esAdmin: profile?.role === "admin",
      salir,
      recargarPerfil,
    }),
    [session, profile, cargando, setupPendiente, salir, recargarPerfil]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
