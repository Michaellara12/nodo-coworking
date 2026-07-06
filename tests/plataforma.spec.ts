import { expect, test } from "@playwright/test";
import {
  iniciarSesion,
  misionFixture,
  mockSupabase,
  usuarioFixture,
} from "./helpers/supabase-mock";

/* Suite de la plataforma interna: Supabase simulado por interceptación de red. */

test.describe("Plataforma — acceso", () => {
  test("sin sesión, /plataforma redirige al login", async ({ page }) => {
    await page.goto("/plataforma");
    await expect(page).toHaveURL(/plataforma\/login/);
  });

  test("credenciales inválidas muestran error", async ({ page }) => {
    await mockSupabase(page, {
      user: usuarioFixture(),
      misiones: [misionFixture()],
      inscripciones: [],
    });

    await page.goto("/plataforma/login");
    await page.getByLabel("Email corporativo *").fill("laura@alpina.com");
    await page.getByLabel("Contraseña *").fill("clave-mala");
    await page.getByRole("button", { name: "Entrar a la plataforma" }).click();

    await expect(page.getByText("Email o contraseña incorrectos.")).toBeVisible();
  });

  test("login correcto lleva al dashboard con saludo y misiones", async ({ page }) => {
    await mockSupabase(page, {
      user: usuarioFixture(),
      misiones: [misionFixture()],
      inscripciones: [],
    });

    await iniciarSesion(page, usuarioFixture());

    await expect(page.getByRole("heading", { name: "¡Hola, Laura!" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "¡China, descréstame!" })).toBeVisible();
  });
});

test.describe("Plataforma — inscripción y pago", () => {
  test("flujo completo: ver misión → pagar con tarjeta → aparece en mis misiones", async ({
    page,
  }) => {
    await mockSupabase(page, {
      user: usuarioFixture(),
      misiones: [misionFixture()],
      inscripciones: [],
    });
    await iniciarSesion(page, usuarioFixture());

    /* catálogo → detalle */
    await page.getByRole("link", { name: /02 Misiones/ }).click();
    await expect(page).toHaveURL(/plataforma\/misiones$/);
    await page.getByRole("link", { name: /Ver misión/ }).first().click();
    await expect(
      page.getByRole("heading", { name: "¡China, descréstame!", level: 1 })
    ).toBeVisible();
    await expect(page.getByText("USD $8.900").first()).toBeVisible();

    /* detalle → checkout */
    await page.getByRole("link", { name: /Inscribirme a esta misión/ }).click();
    await expect(page.getByRole("heading", { name: "¿Cómo quieres pagar?" })).toBeVisible();

    /* pagar con tarjeta */
    await page.getByLabel("Número de tarjeta *").fill("4242 4242 4242 4242");
    await page.getByLabel("Nombre en la tarjeta *").fill("LAURA GÓMEZ");
    await page.getByLabel("Vencimiento *").fill("12/27");
    await page.getByLabel("CVC *").fill("123");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: /Pagar USD \$8\.900/ }).click();

    await expect(
      page.getByRole("heading", { name: "¡Cupo confirmado, innfiltrado!" })
    ).toBeVisible();

    /* aparece en mis misiones como pagada */
    await page.getByRole("link", { name: "Ver mis misiones" }).click();
    await expect(page).toHaveURL(/mis-misiones/);
    await expect(page.getByText("Pagada", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "¡China, descréstame!" })
    ).toBeVisible();
  });

  test("con transferencia el cupo queda pendiente", async ({ page }) => {
    await mockSupabase(page, {
      user: usuarioFixture(),
      misiones: [misionFixture()],
      inscripciones: [],
    });
    await iniciarSesion(page, usuarioFixture());

    await page.goto(`/plataforma/misiones/${misionFixture().id}/pago`);
    await page.getByRole("button", { name: /Transferencia/ }).click();
    await expect(page.getByText("Datos para la transferencia")).toBeVisible();
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Reservar mi cupo" }).click();

    await expect(page.getByRole("heading", { name: "¡Cupo reservado!" })).toBeVisible();

    await page.getByRole("link", { name: "Ver mis misiones" }).click();
    await expect(page.getByText("Pago pendiente")).toBeVisible();
  });
});

test.describe("Plataforma — administración", () => {
  test("un innfiltrado normal no ve el panel admin", async ({ page }) => {
    await mockSupabase(page, {
      user: usuarioFixture(),
      misiones: [misionFixture()],
      inscripciones: [],
    });
    await iniciarSesion(page, usuarioFixture());

    await page.goto("/plataforma/admin");
    await expect(page.getByRole("heading", { name: /Zona restringida/ })).toBeVisible();
  });

  test("el admin no puede inscribirse a misiones", async ({ page }) => {
    const admin = usuarioFixture({
      email: "natalia@innfiltrados.com",
      nombre: "Natalia",
      role: "admin",
    });
    await mockSupabase(page, {
      user: admin,
      misiones: [misionFixture()],
      inscripciones: [],
    });
    await iniciarSesion(page, admin);

    /* la navegación no ofrece “Mis misiones” */
    await expect(page.getByRole("link", { name: /Mis misiones/ })).toHaveCount(0);

    /* el detalle ofrece gestionar, nunca inscribirse */
    await page.goto(`/plataforma/misiones/${misionFixture().id}`);
    await expect(page.getByRole("link", { name: /Gestionar misión/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Inscribirme/ })).toHaveCount(0);

    /* la página de pago está bloqueada */
    await page.goto(`/plataforma/misiones/${misionFixture().id}/pago`);
    await expect(
      page.getByRole("heading", { name: /Los admins no se inscriben/ })
    ).toBeVisible();
  });

  test("el admin ve stats y calendario, y puede crear una misión", async ({ page }) => {
    const admin = usuarioFixture({
      email: "natalia@innfiltrados.com",
      nombre: "Natalia",
      apellido: "Ruiz",
      empresa: "Innfiltrados",
      role: "admin",
    });
    await mockSupabase(page, {
      user: admin,
      misiones: [misionFixture()],
      inscripciones: [],
    });
    await iniciarSesion(page, admin);

    /* acceso desde la navegación */
    await page.getByRole("link", { name: /Panel admin/ }).click();
    await expect(
      page.getByRole("heading", { name: "Centro de operaciones" })
    ).toBeVisible();
    await expect(page.getByText("Misiones abiertas")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Calendario de misiones" })
    ).toBeVisible();

    /* la misión existente aparece como chip en mayo */
    await expect(
      page.getByRole("link", { name: /¡China, descréstame!/ }).first()
    ).toBeVisible();

    /* crear una misión nueva desde el calendario */
    await page.getByLabel("Agregar misión en Julio 2026").click();
    await expect(page).toHaveURL(/nueva\?mes=7&anio=2026/);

    await page.getByLabel("Título de la misión *").fill("Retail sin fricción");
    await page.getByLabel("Destino *").fill("Ciudad de México");
    await page
      .getByLabel("Descripción *")
      .fill("Tres días dentro del retail que ya resolvió la última milla.");
    await page.getByLabel("Precio *").fill("4200");

    /* dropdown custom: cambiar el tipo a Colombia */
    await page.getByLabel("Tipo *").click();
    await page.getByRole("option", { name: "Colombia" }).click();

    await page.getByRole("button", { name: "Publicar misión" }).click();

    /* vuelve al panel y la nueva misión aparece en julio, como misión COL */
    await expect(page).toHaveURL(/plataforma\/admin$/);
    await expect(
      page.getByRole("link", { name: /Retail sin fricción COL/ }).first()
    ).toBeVisible();
  });
});
