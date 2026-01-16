// src/lib/getPropertyTypes.ts
export type PropertyTypeTerm = {
  id: number;
  name: string;
  slug: string;
};

export async function getPropertyTypes(): Promise<PropertyTypeTerm[]> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) {
    console.error("NEXT_PUBLIC_WP_API_URL is missing");
    return [];
  }

  const res = await fetch(`${base}/property-type?per_page=100`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed property types:", res.status);
    return [];
  }

  const terms = (await res.json()) as PropertyTypeTerm[];
  return terms;
}
