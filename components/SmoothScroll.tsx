"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
