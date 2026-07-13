import type { Page, Route } from "@playwright/test";

/*
 * Mock de Supabase por interceptación de red: los tests de la plataforma no
 * tocan el proyecto real. Simula GoTrue (/auth/v1) y PostgREST (/rest/v1)
 * con estado en memoria por test.
 */

export type MockUser = {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  empresa: string;
  role: "innfiltrado" | "admin";
};

export type MockState = {
  user: MockUser;
  misiones: Record<string, unknown>[];
  inscripciones: Record<string, unknown>[];
};

const b64url = (obj: object) =>
  Buffer.from(JSON.stringify(obj)).toString("base64url");

function fakeJwt(userId: string) {
  return `${b64url({ alg: "HS256", typ: "JWT" })}.${b64url({
    sub: userId,
    role: "authenticated",
    exp: 4102444800,
  })}.firma-falsa`;
}

export function misionFixture(extra: Partial<Record<string, unknown>> = {}) {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    titulo: "¡China, descréstame!",
    destino: "Shenzhen · Shanghái",
    tipo: "internacional",
    anio: 2026,
    mes: 5,
    descripcion:
      "Ocho días dentro del ecosistema que fabrica el futuro: plantas 4.0, gigantes del e-commerce y hardware que pasa de idea a producto en semanas.",
    incluye: ["8 días · 7 noches", "Vuelos internos y hoteles", "Playbook de hallazgos"],
    tags: ["Innovación", "IA aplicada"],
    cupos: 24,
    precio: 8900,
    moneda: "USD",
    color: "red",
    imagen: "/images/innfiltrados/mision-1.jpg",
    estado: "abierta",
    created_at: "2026-01-01T00:00:00Z",
    ...extra,
  };
}

export function usuarioFixture(extra: Partial<MockUser> = {}): MockUser {
  return {
    id: "22222222-2222-4222-8222-222222222222",
    email: "laura@alpina.com",
    password: "espia2026",
    nombre: "Laura",
    apellido: "Gómez",
    empresa: "Alpina",
    role: "innfiltrado",
    ...extra,
  };
}

function authUserJson(u: MockUser) {
  return {
    id: u.id,
    aud: "authenticated",
    role: "authenticated",
    email: u.email,
    email_confirmed_at: "2026-01-01T00:00:00Z",
    app_metadata: { provider: "email" },
    user_metadata: { nombre: u.nombre, apellido: u.apellido, empresa: u.empresa },
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  };
}

function sessionJson(u: MockUser) {
  return {
    access_token: fakeJwt(u.id),
    token_type: "bearer",
    expires_in: 3600 * 24 * 365,
    expires_at: 4102444800,
    refresh_token: "refresh-falso",
    user: authUserJson(u),
  };
}

function profileRow(u: MockUser) {
  return {
    id: u.id,
    nombre: u.nombre,
    apellido: u.apellido,
    empresa: u.empresa,
    cargo: "",
    email: u.email,
    role: u.role,
    created_at: "2026-01-01T00:00:00Z",
  };
}

const json = (route: Route, body: unknown, status = 200) =>
  route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });

/* filtros PostgREST tipo campo=eq.valor presentes en la query */
function aplicarFiltros(url: URL, filas: Record<string, unknown>[]) {
  let out = filas;
  for (const [campo, valor] of url.searchParams.entries()) {
    if (["select", "order", "limit", "offset", "on_conflict", "columns"].includes(campo)) continue;
    if (typeof valor === "string" && valor.startsWith("eq.")) {
      const v = valor.slice(3);
      out = out.filter((f) => String(f[campo]) === v);
    }
  }
  return out;
}

export async function mockSupabase(page: Page, state: MockState): Promise<MockState> {
  /* ——— GoTrue ——— */
  await page.route("**/auth/v1/**", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const path = url.pathname;

    if (path.endsWith("/token") && url.searchParams.get("grant_type") === "password") {
      const body = req.postDataJSON() as { email?: string; password?: string };
      const emailDemoEsperado =
        state.user.role === "admin" ? "admin@innfiltrados.com" : "laura@alpina.com";
      if (body.email === emailDemoEsperado && body.password === state.user.password) {
        return json(route, sessionJson(state.user));
      }
      return json(
        route,
        { error: "invalid_grant", error_description: "Invalid login credentials" },
        400
      );
    }
    if (path.endsWith("/token")) return json(route, sessionJson(state.user));
    if (path.endsWith("/user")) return json(route, authUserJson(state.user));
    if (path.endsWith("/logout")) return route.fulfill({ status: 204, body: "" });
    if (path.endsWith("/signup")) {
      return json(route, { user: authUserJson(state.user), session: sessionJson(state.user) });
    }
    return json(route, {}, 404);
  });

  /* ——— PostgREST ——— */
  await page.route("**/rest/v1/**", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const tabla = url.pathname.split("/rest/v1/")[1]?.split("?")[0] ?? "";
    const accept = req.headers()["accept"] ?? "";
    const quiereObjeto = accept.includes("vnd.pgrst.object");
    const select = url.searchParams.get("select") ?? "*";

    const conEmbeds = (fila: Record<string, unknown>) => {
      const out = { ...fila };
      if (tabla === "inscripciones" && select.includes("mision:misiones")) {
        out.mision = state.misiones.find((m) => m.id === fila.mision_id) ?? null;
      }
      if (tabla === "inscripciones" && select.includes("profile:profiles")) {
        out.profile = profileRow(state.user);
      }
      return out;
    };

    const datos = () => {
      if (tabla === "profiles") return [profileRow(state.user)];
      if (tabla === "misiones") return state.misiones;
      if (tabla === "inscripciones") return state.inscripciones;
      return [];
    };

    if (req.method() === "GET") {
      const filas = aplicarFiltros(url, datos()).map(conEmbeds);
      if (quiereObjeto) {
        if (filas.length === 0) return json(route, { message: "no rows" }, 406);
        return json(route, filas[0]);
      }
      return json(route, filas);
    }

    if (req.method() === "POST") {
      const body = req.postDataJSON() as Record<string, unknown>;
      const fila = {
        id: `nuevo-${Math.random().toString(36).slice(2, 10)}`,
        created_at: new Date().toISOString(),
        ...body,
      };
      if (tabla === "misiones") state.misiones.push(fila);
      if (tabla === "inscripciones") state.inscripciones.push(fila);
      return json(route, quiereObjeto ? conEmbeds(fila) : [conEmbeds(fila)], 201);
    }

    if (req.method() === "PATCH") {
      const cambios = req.postDataJSON() as Record<string, unknown>;
      const filas = aplicarFiltros(url, datos());
      for (const f of filas) Object.assign(f, cambios);
      return route.fulfill({ status: 204, body: "" });
    }

    return json(route, {}, 404);
  });

  return state;
}

export async function iniciarSesion(page: Page, user: MockUser) {
  await page.goto("/plataforma/login");
  await page
    .getByRole("button", {
      name: user.role === "admin" ? /Entrar como administrador/ : /Entrar como infiltrado/,
    })
    .click();
  await page.waitForURL("**/plataforma");
}
