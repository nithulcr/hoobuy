// src/lib/getPropertyLocations.ts
export type PropertyLocationTerm = {
  id: number;
  name: string;
  slug: string;
};

export async function getPropertyLocations(): Promise<PropertyLocationTerm[]> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) {
    console.error("NEXT_PUBLIC_WP_API_URL is missing");
    return [];
  }

  // REST base must match your taxonomy key: `property-location`
  const res = await fetch(`${base}/property-location?per_page=100`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed property locations:", res.status);
    return [];
  }

  const terms = (await res.json()) as PropertyLocationTerm[];
  return terms;
}
