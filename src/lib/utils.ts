export function parseSlug(slug?: string) {
  if (!slug) {
    throw new Error("Slug is missing");
  }

  const name = slug.replaceAll("-", " ").toLowerCase();

  return { name };
}
