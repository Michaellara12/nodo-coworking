"use client";

import { useEffect, type RefObject } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "framer-motion";

/*
 * Progreso 0→1 de una sección pineada (sticky), midiendo la geometría en vivo
 * en cada tick de scroll. A diferencia de useScroll({ target }), no cachea
 * offsets al montar: es inmune a medidas obsoletas por HMR, resize o carga
 * tardía de fuentes/imágenes, que hacían que la animación se desfasara del
 * scroll real.
 */
export function usePinnedProgress(
  ref: RefObject<HTMLElement | null>
): MotionValue<number> {
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();

  const actualizar = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;
    progress.set(Math.min(1, Math.max(0, -rect.top / total)));
  };

  useMotionValueEvent(scrollY, "change", actualizar);
  /* estado inicial y tras cada re-render (recoge cambios de layout) */
  useEffect(actualizar);

  return progress;
}
