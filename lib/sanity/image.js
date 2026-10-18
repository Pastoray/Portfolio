import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./env";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Optimised CDN URL for a Sanity image field, or null when there is no image.
 * Respects the hotspot/crop set in the Studio and serves WebP/AVIF where supported.
 */
export function imageUrl(source, { width = 1600 } = {}) {
  if (!builder || !source?.asset) return null;
  return builder.image(source).width(width).auto("format").url();
}
