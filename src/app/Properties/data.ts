// app/Properties/data.ts
import { PropertyItem } from "../components/Property";

type WPTerm = {
  taxonomy: string;
  name: string;
  slug: string;
};

type WPProperty = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: {
    badge?: string;
    price?: string;
    location?: string;
    land?: string;
    range?: string;

     property_class?: "premium" | "standard" | "affordable" | "solded";
  };
  meta?: {
    badge?: string;
    price?: string;
    location?: string;
    land?: string;
    range?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
    "wp:term"?: WPTerm[][];
  };
};

type PropertySource = {
  badge?: string;
  price?: string;
  location?: string;
  land?: string;
  range?: string;

  property_class?: "premium" | "standard" | "affordable" | "solded";
};

export async function getProperties(): Promise<PropertyItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/property?_embed&per_page=100`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return [];

  const data: WPProperty[] = await res.json();

  return data.map((p) => {
    const src: PropertySource = p.acf ?? p.meta ?? {};

    const typeNames: string[] = [];
    const typeSlugs: string[] = [];

    const locationNames: string[] = [];
    const locationSlugs: string[] = [];

    const termGroups = p._embedded?.["wp:term"] ?? [];
    termGroups.forEach((group) => {
      group.forEach((term: WPTerm) => {
        if (term?.taxonomy === "property-type") {
          if (typeof term.name === "string") typeNames.push(term.name);
          if (typeof term.slug === "string") typeSlugs.push(term.slug);
        }
        if (term?.taxonomy === "property-location") {
          if (typeof term.name === "string") locationNames.push(term.name);
          if (typeof term.slug === "string") locationSlugs.push(term.slug);
        }
      });
    });

    return {
      id: p.id,
      slug: p.slug,
      title: p.title.rendered,
      land: src.land ?? "",
      location: src.location ?? "",
      price: src.price ?? "",
      range: src.range ?? "", // Added range here
      icon:
        p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        "/fallback-property.jpg",
      typeNames,
      typeSlugs,
      // NEW: used by the location dropdown filter
      locationNames,
      locationSlugs,
      property_class: src.property_class,
    };
  });
}
