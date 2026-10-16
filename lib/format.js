const fmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

export function formatMonth(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : fmt.format(d);
}

export function formatRange(start, end) {
  const from = formatMonth(start);
  const to = end ? formatMonth(end) : "Present";
  return from ? `${from} – ${to}` : to;
}

export const asArray = (v) => (Array.isArray(v) ? v : []);
