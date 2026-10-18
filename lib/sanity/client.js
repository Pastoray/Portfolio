import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "./env";

let client;

/**
 * Lazily created so importing this file never throws when Sanity isn't configured.
 * Reads published content from the Sanity CDN; the dataset is public, so no token is needed.
 */
export function getClient() {
  if (!client) {
    client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });
  }
  return client;
}
