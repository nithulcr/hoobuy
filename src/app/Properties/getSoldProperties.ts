// app/Properties/getSoldProperties.ts
type WPProperty = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: {
    property_class?: "premium" | "standard" | "affordable" | "solded";
    land?: string;
    location?: string;
    price?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
  };
};

export type SoldProperty = {
  id: string;
  slug: string;
  icon: string;
  title: string;
  land: string;
  location: string;
  price: string;
  status: "Solded";
  link: string;
};

export async function getSoldProperties(): Promise<SoldProperty[]> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) return [];

  const res = await fetch(
    `${base}/property?_embed&per_page=100`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return [];

  const data = (await res.json()) as WPProperty[];

  const sold = data
    .filter((p) => p.acf?.property_class === "solded")
    .slice(0, 8);

  return sold.map((p) => ({
    id: String(p.id),
    slug: p.slug,
    icon:
      p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      "/fallback-property.jpg",
    title: p.title.rendered,
    land: p.acf?.land ?? "",
    location: p.acf?.location ?? "",
    price: p.acf?.price ?? "",
    status: "Solded",
    link: `/Properties/${p.slug}`,
  }));
}
