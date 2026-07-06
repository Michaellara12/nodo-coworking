"use client";

import { useState } from "react";
import Image from "next/image";
import { Campo, inputCls, BotonInk } from "./ui";
import Select from "./Select";
import { ArrowUpRight } from "@/components/icons";
import {
  COLOR_BG,
  MESES,
  type Mision,
  type MisionColor,
  type MisionEstado,
} from "@/lib/types";

/* Formulario de misión (crear/editar) para el panel admin. */

const COLORES: MisionColor[] = ["yellow", "red", "blue", "green", "orange", "lilac", "purple"];

const IMAGENES = [
  { src: "/images/innfiltrados/mision-1.jpg", label: "Recorrido en planta" },
  { src: "/images/innfiltrados/mision-2.jpg", label: "Sesión con líderes" },
  { src: "/images/meeting.jpg", label: "Workshop" },
  { src: "/images/insta-1.jpg", label: "Networking" },
  { src: "/images/insta-3.jpg", label: "Trabajo en equipo" },
  { src: "/images/insta-4.jpg", label: "Lounge" },
];

export type MisionFormValues = Omit<Mision, "id" | "created_at">;

export default function MisionForm({
  inicial,
  mesInicial,
  anioInicial,
  textoBoton = "Guardar misión",
  onSubmit,
}: {
  inicial?: Mision;
  mesInicial?: number;
  anioInicial?: number;
  textoBoton?: string;
  onSubmit: (values: MisionFormValues) => Promise<void>;
}) {
  const [color, setColor] = useState<MisionColor>(inicial?.color ?? "yellow");
  const [imagen, setImagen] = useState(inicial?.imagen ?? IMAGENES[0].src);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    const f = new FormData(e.currentTarget);
    try {
      await onSubmit({
        titulo: String(f.get("titulo")).trim(),
        destino: String(f.get("destino")).trim(),
        tipo: String(f.get("tipo")) as MisionFormValues["tipo"],
        anio: Number(f.get("anio")),
        mes: Number(f.get("mes")),
        descripcion: String(f.get("descripcion")).trim(),
        incluye: String(f.get("incluye"))
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        tags: String(f.get("tags"))
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        cupos: Number(f.get("cupos")),
        precio: Number(f.get("precio")),
        moneda: String(f.get("moneda")) as MisionFormValues["moneda"],
        color,
        imagen,
        estado: String(f.get("estado")) as MisionEstado,
      });
    } catch {
      setError("No se pudo guardar la misión. Revisa los datos e inténtalo de nuevo.");
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="titulo" label="Título de la misión *">
          <input
            id="titulo"
            name="titulo"
            required
            defaultValue={inicial?.titulo}
            placeholder="¡China, descréstame!"
            className={inputCls}
          />
        </Campo>
        <Campo id="destino" label="Destino *">
          <input
            id="destino"
            name="destino"
            required
            defaultValue={inicial?.destino}
            placeholder="Shenzhen · Shanghái"
            className={inputCls}
          />
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Campo id="tipo" label="Tipo *">
          <Select
            id="tipo"
            name="tipo"
            defaultValue={inicial?.tipo ?? "internacional"}
            options={[
              { value: "internacional", label: "Internacional" },
              { value: "colombia", label: "Colombia" },
            ]}
          />
        </Campo>
        <Campo id="mes" label="Mes *">
          <Select
            id="mes"
            name="mes"
            defaultValue={String(inicial?.mes ?? mesInicial ?? 1)}
            options={MESES.map((m, i) => ({ value: String(i + 1), label: m }))}
          />
        </Campo>
        <Campo id="anio" label="Año *">
          <Select
            id="anio"
            name="anio"
            defaultValue={String(inicial?.anio ?? anioInicial ?? 2026)}
            options={[2026, 2027, 2028].map((a) => ({ value: String(a), label: String(a) }))}
          />
        </Campo>
        <Campo id="cupos" label="Cupos *">
          <input
            id="cupos"
            name="cupos"
            type="number"
            min={1}
            required
            defaultValue={inicial?.cupos ?? 20}
            className={inputCls}
          />
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Campo id="precio" label="Precio *">
          <input
            id="precio"
            name="precio"
            type="number"
            min={0}
            required
            defaultValue={inicial?.precio ?? 0}
            className={inputCls}
          />
        </Campo>
        <Campo id="moneda" label="Moneda *">
          <Select
            id="moneda"
            name="moneda"
            defaultValue={inicial?.moneda ?? "USD"}
            options={[
              { value: "USD", label: "USD — Dólares" },
              { value: "COP", label: "COP — Pesos colombianos" },
            ]}
          />
        </Campo>
        <Campo id="estado" label="Estado *">
          <Select
            id="estado"
            name="estado"
            defaultValue={inicial?.estado ?? "abierta"}
            options={[
              { value: "abierta", label: "Inscripciones abiertas" },
              { value: "agotada", label: "Cupos agotados" },
              { value: "finalizada", label: "Finalizada" },
            ]}
          />
        </Campo>
      </div>

      <Campo id="descripcion" label="Descripción *">
        <textarea
          id="descripcion"
          name="descripcion"
          required
          rows={3}
          defaultValue={inicial?.descripcion}
          placeholder="¿Qué van a vivir los innfiltrados en esta misión?"
          className={`${inputCls} resize-none`}
        />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="incluye" label="Qué incluye (una línea por ítem)">
          <textarea
            id="incluye"
            name="incluye"
            rows={5}
            defaultValue={inicial?.incluye.join("\n")}
            placeholder={"8 días · 7 noches\nVuelos internos y hoteles"}
            className={`${inputCls} resize-none`}
          />
        </Campo>
        <div className="space-y-5">
          <Campo id="tags" label="Tags (separados por coma)">
            <input
              id="tags"
              name="tags"
              defaultValue={inicial?.tags.join(", ")}
              placeholder="Innovación, IA aplicada"
              className={inputCls}
            />
          </Campo>

          {/* color de la tarjeta */}
          <div>
            <p className="text-[14px] font-bold">Color de la tarjeta</p>
            <div className="mt-2 flex flex-wrap gap-2.5">
              {COLORES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                  aria-pressed={color === c}
                  className={`size-9 rounded-full transition-transform ${COLOR_BG[c]} ${
                    color === c
                      ? "scale-110 shadow-[0_0_0_2.5px_#f1e8e0,0_0_0_4.5px_#141414]"
                      : "hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* imagen */}
      <div>
        <p className="text-[14px] font-bold">Imagen de la misión</p>
        <div className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {IMAGENES.map((img) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setImagen(img.src)}
              aria-pressed={imagen === img.src}
              title={img.label}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-all ${
                imagen === img.src
                  ? "shadow-[0_0_0_2.5px_#f1e8e0,0_0_0_4.5px_#141414]"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt={img.label} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-2xl bg-red px-4 py-3 text-[14px] font-bold text-white">
          {error}
        </p>
      )}

      <BotonInk type="submit" disabled={guardando} className="w-full py-4 text-base sm:w-auto sm:px-10">
        {guardando ? "Guardando…" : textoBoton}
        <ArrowUpRight className="size-5" />
      </BotonInk>
    </form>
  );
}
