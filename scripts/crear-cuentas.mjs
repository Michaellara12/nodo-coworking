/* Crea las cuentas demo de la plataforma (admin + innfiltrada).
 * Requiere haber ejecutado supabase/schema.sql y tener el .env configurado.
 * Uso: node scripts/crear-cuentas.mjs */

import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const APIKEY = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const CUENTAS = [
  {
    email: "admin@innfiltrados.com",
    password: "espia2026",
    data: {
      nombre: "Natalia",
      apellido: "Ruiz",
      empresa: "Innfiltrados",
      cargo: "Directora de misiones",
      codigo_equipo: "ESPIA2026",
    },
  },
  {
    email: "laura@alpina.com",
    password: "espia2026",
    data: {
      nombre: "Laura",
      apellido: "Gómez",
      empresa: "Alpina",
      cargo: "Gerente de innovación",
      codigo_equipo: "",
    },
  },
];

for (const cuenta of CUENTAS) {
  const res = await fetch(`${URL_BASE}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: APIKEY },
    body: JSON.stringify(cuenta),
  });
  const body = await res.json();
  if (!res.ok) {
    console.error(`✗ ${cuenta.email}: ${body.msg ?? body.error_description ?? res.status}`);
    continue;
  }
  const confirmada = Boolean(body.session ?? body.access_token);
  console.log(
    `✓ ${cuenta.email} creada${confirmada ? " y lista para entrar" : " — falta confirmar el email (desactiva Confirm email en Supabase)"}`
  );
}
