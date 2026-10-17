// Full class names so Tailwind can see them (this folder is in tailwind.config content).
const SPAN = { 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 6: "lg:col-span-6" };

/**
 * Lays items out on a 6-column grid so every row is completely filled.
 *   normal card = 2 columns, wide (featured) card = 4 columns.
 * Items are placed in order. When the next item doesn't fit, the row is closed and any leftover
 * space is absorbed by stretching that row:  [2] / [4] -> full width,  [2,2] -> 3 + 3.
 * Possible rows: [2,2,2]  [4,2]  [2,4]  [3,3]  [6]
 */
export function assignSpans(items, isWide = (item) => Boolean(item.featured)) {
  const rows = [];
  let row = [];
  let used = 0;

  for (const item of items) {
    const w = isWide(item) ? 4 : 2;
    if (used + w > 6) {
      rows.push(row);
      row = [];
      used = 0;
    }
    row.push({ item, w });
    used += w;
  }
  if (row.length) rows.push(row);

  return rows.flatMap((r) => {
    const total = r.reduce((sum, c) => sum + c.w, 0);
    if (total < 6) {
      if (r.length === 1) r[0].w = 6;
      else r.forEach((c) => (c.w = 3)); // only [2,2] can reach here
    }
    return r.map((c) => ({ item: c.item, cols: c.w, span: SPAN[c.w] }));
  });
}
