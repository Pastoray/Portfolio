"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const safeZone = (tz) => {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return tz;
  } catch {
    return "UTC";
  }
};

/**
 * The site owner's current local time (from profile.timezone), shown inline.
 * Colours follow the surrounding text (opacity only), so it is correct in light and dark themes.
 * Sun/moon reflects day or night in that timezone.
 */
export default function LocalTime({ timezone = "UTC" }) {
  const tz = safeZone(timezone);
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  let h = "--";
  let m = "--";
  let s = "--";
  let offset = "";
  let isDay = true;

  if (now) {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" })
        .formatToParts(now)
        .map((p) => [p.type, p.value])
    );
    h = parts.hour;
    m = parts.minute;
    s = parts.second;
    const hour = Number(h);
    isDay = hour >= 6 && hour < 19;
    offset =
      new Intl.DateTimeFormat("en", { timeZone: tz, timeZoneName: "shortOffset" }).formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "";
  }

  const Icon = isDay ? Sun : Moon;

  return (
    <div role="timer" aria-label="Local time" className="flex items-center justify-center gap-2 text-sm">
      <Icon className={`h-4 w-4 shrink-0 ${isDay ? "text-amber-500" : "text-indigo-400"}`} />
      <span className="font-medium tabular-nums">
        {h}:{m}:{s}
      </span>
      <span className="text-slate-500 dark:text-slate-400">local time{offset && ` · ${offset}`}</span>
    </div>
  );
}
