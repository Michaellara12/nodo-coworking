import { expect, test } from "@playwright/test";

/* Suite del sitio público: no necesita Supabase. */

test.describe("Sitio web de Innfiltrados", () => {
  test("el home muestra el hero, los clientes y las misiones 2026", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Aprende del conocimiento de otros/ })
    ).toBeVisible();

    await expect(page.getByText("Nos hemos innfiltrado en…")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Misiones internacionales 2026" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "¡China, descréstame!" })).toBeVisible();

    /* los CTA de misiones llevan al WhatsApp real */
    const cta = page.getByRole("link", { name: /Quiero saber más/ }).first();
    await expect(cta).toHaveAttribute("href", /wa\.me\/573005393295/);
  });

  test("la navegación lleva a las páginas internas", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /Cómo funciona/ }).click();
    await expect(page).toHaveURL(/forma-de-trabajar/);
    await expect(
      page.getByRole("heading", { name: /Así funciona/ })
    ).toBeVisible();

    await page.getByRole("link", { name: /Comunidad/ }).first().click();
    await expect(page).toHaveURL(/comunidad/);
    await expect(
      page.getByRole("heading", { name: /Más que un viaje/ })
    ).toBeVisible();
  });

  test("el formulario de contacto está completo", async ({ page }) => {
    await page.goto("/contacto");

    await expect(page.getByRole("heading", { name: /Listo para/ })).toBeVisible();
    await expect(page.getByLabel("Nombre *")).toBeVisible();
    await expect(page.getByLabel("Empresa *")).toBeVisible();
    await expect(page.getByLabel(/Qué reto quiere resolver/)).toBeVisible();
  });

  test("el sitio enlaza a la plataforma y sin sesión redirige al login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Plataforma" }).first().click();

    await expect(page).toHaveURL(/plataforma\/login/);
    await expect(page.getByRole("heading", { name: "¡Hola de nuevo!" })).toBeVisible();
  });
});
