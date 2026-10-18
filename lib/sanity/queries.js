import groq from "groq";

// Written with the `groq` tag (TypeGen recognises this form in plain .js files) and with no string
// interpolation, so `npm run typegen` in studio-portfolio can validate each query against the schema.
// `pt::text(body)` gives plain text, used for reading time and as a fallback.

export const PROJECTS_QUERY = groq`
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    featured,
    liveUrl,
    repoUrl,
    technologies,
    image {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    "description": pt::text(body),
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{ _id, url, metadata { lqip, dimensions { width, height } } }
      }
    }
  }
`;

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    tags,
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    "content": pt::text(body),
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{ _id, url, metadata { lqip, dimensions { width, height } } }
      }
    }
  }
`;

export const GALLERY_QUERY = groq`
  *[_type == "galleryItem" && defined(image.asset)] | order(takenAt desc, _createdAt desc) {
    _id,
    title,
    caption,
    takenAt,
    image {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    }
  }
`;
