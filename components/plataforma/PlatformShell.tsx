"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/Reveal";
import {
  ArrowUpRight,
  CloseIcon,
  Globe,
  LogoutIcon,
  MenuIcon,
} from "@/components/icons";
import { useAuth } from "./AuthProvider";
import { Cargando } from "./ui";

const NAV = [
  { n: "01", label: "Inicio", href: "/plataforma", bg: "bg-blue" },
  { n: "02", label: "Misiones", href: "/plataforma/misiones", bg: "bg-yellow" },
  { n: "03", label: "Mis misiones", href: "/plataforma/mis-misiones", bg: "bg-orange" },
];

/* los admins no se inscriben: sin “Mis misiones”, con panel de gestión */
const NAV_DE_ADMIN = [
  { n: "01", label: "Inicio", href: "/plataforma", bg: "bg-blue" },
  { n: "02", label: "Misiones", href: "/plataforma/misiones", bg: "bg-yellow" },
  { n: "03", label: "Panel admin", href: "/plataforma/admin", bg: "bg-purple" },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/plataforma" className="block select-none">
      <span className="flex items-center gap-1.5">
        <Image
          src="/images/innfiltrados/espia-v2.png"
          alt=""
          width={54}
          height={47}
          priority
          className={compact ? "w-6" : "w-8"}
        />
        <span
          className={`block font-black leading-none tracking-[-0.045em] ${
            compact ? "text-[17px]" : "text-[21px]"
          }`}
        >
          innfiltrados®
        </span>
      </span>
      <span
        className={`mt-1 block font-bold uppercase leading-snug tracking-[0.18em] text-ink/80 ${
          compact ? "text-[6px]" : "text-[7.5px]"
        }`}
      >
        Plataforma de misiones
      </span>
    </Link>
  );
}

function NavCard({
  item,
  index,
  active,
  onClick,
  className = "",
}: {
  item: (typeof NAV)[number];
  index: number;
  active: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.55, ease: EASE }}
      className={`flex ${className}`}
    >
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={`group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl p-3.5 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] ${
          active ? "bg-cream shadow-[inset_0_0_0_1.5px_#141414]" : item.bg
        }`}
      >
        <div className="flex items-start justify-between">
          <span className="text-[13px] font-bold">{item.n}</span>
          <ArrowUpRight
            className={`size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              active ? "rotate-45" : ""
            }`}
          />
        </div>
        <span className="text-[15px] font-bold leading-tight">{item.label}</span>
      </Link>
    </motion.div>
  );
}

function UserChip({ onLogout }: { onLogout: () => void }) {
  const { profile, user } = useAuth();
  const nombre = profile?.nombre || (user?.user_metadata?.nombre as string) || "Innfiltrado";
  const iniciales = `${nombre[0] ?? "I"}${(profile?.apellido?.[0] as string) ?? ""}`.toUpperCase();

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2.5 rounded-2xl border-[1.5px] border-ink/30 p-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lilac text-[13px] font-black">
          {iniciales}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold leading-tight">{nombre}</p>
          <p className="truncate text-[11px] font-semibold text-ink/60">
            {profile?.empresa || (profile?.role === "admin" ? "Administración" : "Innfiltrado")}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center justify-between rounded-full bg-ink px-4 py-3 text-[13px] font-semibold text-cream transition hover:text-yellow"
      >
        <span>Cerrar sesión</span>
        <LogoutIcon className="size-4" />
      </button>
    </div>
  );
}

export default function PlatformShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { session, cargando, esAdmin, salir } = useAuth();

  const esLogin = pathname === "/plataforma/login";

  useEffect(() => {
    if (cargando) return;
    if (!session && !esLogin) router.replace("/plataforma/login");
    if (session && esLogin) router.replace("/plataforma");
  }, [cargando, session, esLogin, router]);

  /* La página de login se muestra sin shell */
  if (esLogin) return <>{children}</>;

  if (cargando || !session) {
    return (
      <main className="grid min-h-svh place-items-center p-5">
        <Cargando texto="Abriendo la plataforma…" />
      </main>
    );
  }

  const items = esAdmin ? NAV_DE_ADMIN : NAV;
  const isActive = (href: string) =>
    href === "/plataforma" ? pathname === "/plataforma" : pathname.startsWith(href);

  const cerrarSesion = async () => {
    await salir();
    router.replace("/plataforma/login");
  };

  return (
    <>
      {/* ——— Sidebar escritorio ——— */}
      <aside className="fixed inset-y-5 left-5 z-40 hidden w-[164px] flex-col lg:flex">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Wordmark />
        </motion.div>

        <nav className="mt-5 flex flex-1 flex-col gap-3">
          {items.map((item, i) => (
            <NavCard key={item.n} item={item} index={i} active={isActive(item.href)} className="flex-1" />
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
          className="mt-3 space-y-2.5"
        >
          <Link
            href="/"
            className="flex items-center justify-between rounded-full border-[1.5px] border-ink px-4 py-2.5 text-[12.5px] font-bold transition-colors hover:bg-ink hover:text-cream"
          >
            <span>Ir al sitio web</span>
            <Globe className="size-4" />
          </Link>
          <UserChip onLogout={cerrarSesion} />
        </motion.div>
      </aside>

      {/* ——— Header móvil ——— */}
      <header className="fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-2xl border border-ink/10 bg-cream/85 py-2.5 pl-4 pr-2.5 backdrop-blur-md lg:hidden">
        <Wordmark compact />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="rounded-xl bg-ink p-2.5 text-cream"
        >
          <MenuIcon className="size-5" />
        </button>
      </header>

      {/* ——— Menú móvil ——— */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream p-4 lg:hidden"
          >
            <div className="flex items-center justify-between rounded-2xl border border-ink/10 py-2.5 pl-4 pr-2.5">
              <Wordmark compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="rounded-xl bg-ink p-2.5 text-cream"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <nav className="mt-4 grid flex-1 grid-cols-2 gap-3">
              {items.map((item, i) => (
                <NavCard
                  key={item.n}
                  item={item}
                  index={i}
                  active={isActive(item.href)}
                  onClick={() => setOpen(false)}
                  className="min-h-32"
                />
              ))}
            </nav>

            <div className="mt-4">
              <UserChip onLogout={cerrarSesion} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-svh space-y-5 p-4 pt-24 sm:p-5 sm:pt-24 lg:pt-5 lg:pl-[224px]">
        {children}
      </main>
    </>
  );
}
