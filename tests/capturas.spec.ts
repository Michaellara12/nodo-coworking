import { test } from "@playwright/test";
import {
  iniciarSesion,
  misionFixture,
  mockSupabase,
  usuarioFixture,
} from "./helpers/supabase-mock";

/* Genera capturas de la plataforma con datos simulados (solo demo visual).
 * No corre con `npm test`; actívala con: CAPTURAS=1 npx playwright test tests/capturas.spec.ts */

test.skip(!process.env.CAPTURAS, "Solo para generar capturas (CAPTURAS=1)");

const DIR = "capturas";

const MISIONES = [
  misionFixture(),
  misionFixture({
    id: "33333333-3333-4333-8333-333333333333",
    titulo: "Sector Finanzas",
    destino: "Nueva York, EE. UU.",
    mes: 6,
    precio: 6900,
    color: "blue",
    tags: ["Fintech", "Banca digital"],
    imagen: "/images/innfiltrados/mision-2.jpg",
  }),
  misionFixture({
    id: "44444444-4444-4444-8444-444444444444",
    titulo: "Siendo sostenibles",
    destino: "Ámsterdam · Copenhague",
    mes: 8,
    precio: 7400,
    color: "green",
    tags: ["ESG", "Economía circular"],
    imagen: "/images/meeting.jpg",
  }),
  misionFixture({
    id: "55555555-5555-4555-8555-555555555555",
    titulo: "Ruta de la innovación paisa",
    destino: "Medellín",
    tipo: "colombia",
    mes: 3,
    precio: 3900000,
    moneda: "COP",
    color: "orange",
    cupos: 24,
    tags: ["Innovación", "Startups"],
    imagen: "/images/insta-1.jpg",
  }),
];

test.use({ viewport: { width: 1440, height: 900 } });

test("capturas de la plataforma", async ({ page }) => {
  test.setTimeout(180_000);

  /* login */
  await page.goto("/plataforma/login");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${DIR}/01-login.png` });

  /* innfiltrado */
  await mockSupabase(page, {
    user: usuarioFixture(),
    misiones: MISIONES,
    inscripciones: [],
  });
  await iniciarSesion(page, usuarioFixture());
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/02-dashboard.png`, fullPage: true });

  await page.goto("/plataforma/misiones");
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/03-misiones.png`, fullPage: true });

  await page.goto(`/plataforma/misiones/${MISIONES[0].id}`);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/04-mision-detalle.png`, fullPage: true });

  await page.goto(`/plataforma/misiones/${MISIONES[0].id}/pago`);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/05-pago.png`, fullPage: true });

  /* pagar para capturar éxito + mis misiones */
  await page.getByLabel("Número de tarjeta *").fill("4242 4242 4242 4242");
  await page.getByLabel("Nombre en la tarjeta *").fill("LAURA GÓMEZ");
  await page.getByLabel("Vencimiento *").fill("12/27");
  await page.getByLabel("CVC *").fill("123");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Pagar USD/ }).click();
  await page.getByRole("heading", { name: /Cupo confirmado/ }).waitFor();
  await page.screenshot({ path: `${DIR}/06-pago-exitoso.png` });

  await page.goto("/plataforma/mis-misiones");
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/07-mis-misiones.png` });
});

test("capturas del panel admin", async ({ page }) => {
  test.setTimeout(180_000);
  const admin = usuarioFixture({
    email: "natalia@innfiltrados.com",
    nombre: "Natalia",
    apellido: "Ruiz",
    empresa: "Innfiltrados",
    role: "admin",
  });
  await mockSupabase(page, {
    user: admin,
    misiones: MISIONES,
    inscripciones: [
      {
        id: "ins-1",
        mision_id: MISIONES[0].id,
        user_id: admin.id,
        estado: "pagada",
        metodo_pago: "tarjeta",
        monto: 8900,
        moneda: "USD",
        created_at: "2026-02-10T00:00:00Z",
      },
      {
        id: "ins-2",
        mision_id: MISIONES[0].id,
        user_id: admin.id,
        estado: "pendiente",
        metodo_pago: "transferencia",
        monto: 8900,
        moneda: "USD",
        created_at: "2026-02-12T00:00:00Z",
      },
    ],
  });
  await iniciarSesion(page, admin);

  await page.goto("/plataforma/admin");
  await page.getByRole("heading", { name: "Centro de operaciones" }).waitFor();
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/08-admin-panel.png`, fullPage: true });

  await page.goto(`/plataforma/admin/misiones/${MISIONES[0].id}`);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/09-admin-mision.png`, fullPage: true });

  await page.goto("/plataforma/admin/misiones/nueva?mes=7&anio=2026");
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${DIR}/10-admin-nueva-mision.png`, fullPage: true });

  /* dropdown custom abierto */
  await page.getByLabel("Mes *").click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/11-dropdown-abierto.png` });
});
