"use client";

import { useEffect } from "react";

/** One passive listener feeds the cursor position to whichever `.glass-hover` card is under the pointer. */
export default function SpotlightProvider() {
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target instanceof Element ? e.target.closest(".glass-hover") : null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
