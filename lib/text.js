/** Splits plain text into paragraphs on blank lines. */
export const paragraphs = (text) =>
  String(text ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

export function readingTime(text) {
  const words = String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return words ? Math.max(1, Math.round(words / 200)) : 0;
}
