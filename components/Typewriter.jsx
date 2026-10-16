"use client";

import { useEffect, useMemo, useState } from "react";

const TYPE_MS = 95; // per character typed
const DELETE_MS = 55; // per character backspaced
const HOLD_MS = 1700; // pause on a finished word
const GAP_MS = 350; // pause on an empty line

/**
 * Types each word (with its trailing period), holds, then backspaces it
 * character by character before typing the next one.
 * SSR renders the first word complete, so there is no empty flash and
 * reduced-motion users simply see a static word.
 */
export default function Typewriter({ words = [] }) {
  const key = words.join("|");
  const list = useMemo(() => words.filter(Boolean).map((w) => (w.endsWith(".") ? w : `${w}.`)), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const [s, setS] = useState({ i: 0, n: list[0]?.length ?? 0, phase: "hold" });

  useEffect(() => {
    if (list.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { i, n, phase } = s;
    let delay;
    let next;
    if (phase === "hold") {
      delay = HOLD_MS;
      next = { i, n, phase: "delete" };
    } else if (phase === "delete") {
      if (n > 0) {
        delay = DELETE_MS;
        next = { i, n: n - 1, phase: "delete" };
      } else {
        delay = GAP_MS;
        next = { i: (i + 1) % list.length, n: 0, phase: "type" };
      }
    } else if (n < list[i].length) {
      delay = TYPE_MS;
      next = { i, n: n + 1, phase: "type" };
    } else {
      delay = 0;
      next = { i, n, phase: "hold" };
    }
    const t = setTimeout(() => setS(next), delay);
    return () => clearTimeout(t);
  }, [s, list]);

  if (!list.length) return null;

  const shown = list[s.i].slice(0, s.n);
  const hasDot = shown.endsWith(".");
  const body = hasDot ? shown.slice(0, -1) : shown;

  return (
    <span>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {body}
        {hasDot && <span className="text-sky-500">.</span>}
        <span
          className={`ml-1 inline-block h-[0.78em] w-[0.055em] translate-y-[0.04em] rounded-full bg-sky-500 ${
            s.phase === "hold" ? "animate-caret" : ""
          }`}
        />
      </span>
    </span>
  );
}
