/* Tipos de la plataforma interna. Reflejan supabase/schema.sql. */

export type Rol = "innfiltrado" | "admin";

export type Profile = {
  id: string;
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  email: string;
  role: Rol;
  created_at: string;
};

export type MisionColor =
  | "yellow"
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "lilac"
  | "purple";

export type MisionEstado = "abierta" | "agotada" | "finalizada";

export type Mision = {
  id: string;
  titulo: string;
  destino: string;
  tipo: "internacional" | "colombia";
  anio: number;
  mes: number;
  descripcion: string;
  incluye: string[];
  tags: string[];
  cupos: number;
  precio: number;
  moneda: "USD" | "COP";
  color: MisionColor;
  imagen: string;
  estado: MisionEstado;
  created_at: string;
};

export type MetodoPago = "tarjeta" | "pse" | "transferencia";

export type InscripcionEstado = "pendiente" | "pagada" | "cancelada";

export type Inscripcion = {
  id: string;
  mision_id: string;
  user_id: string;
  estado: InscripcionEstado;
  metodo_pago: MetodoPago;
  monto: number;
  moneda: string;
  created_at: string;
  /* embeds de PostgREST */
  mision?: Mision;
  profile?: Profile;
};

export const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

/* Tailwind necesita las clases literales: mapa color → clases de la marca */
export const COLOR_BG: Record<MisionColor, string> = {
  yellow: "bg-yellow",
  red: "bg-red",
  blue: "bg-blue",
  green: "bg-green",
  orange: "bg-orange",
  lilac: "bg-lilac",
  purple: "bg-purple",
};

export function formatoPrecio(precio: number, moneda: string) {
  const simbolo = moneda === "COP" ? "COP $" : "USD $";
  return `${simbolo}${precio.toLocaleString("es-CO")}`;
}

export function nombreMes(mes: number) {
  return MESES[mes - 1] ?? "";
}
