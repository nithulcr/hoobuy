import Header from "../components/Header";
import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";
import Property, { PropertyItem } from "../components/Property";

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
  };
};

type PropertySource = {
  badge?: string;
  price?: string;
  location?: string;
  land?: string;
  range?: string;
};

async function getProperties(): Promise<PropertyItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/property?_embed&per_page=100`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return [];

  const data: WPProperty[] = await res.json();

  return data.map((p) => {
    const src: PropertySource = p.acf ?? p.meta ?? {};

    return {
      id: p.id,
      slug: p.slug,
      title: p.title.rendered,
      land: src.land ?? "",
      location: src.location ?? "",
      price: src.price ?? "",
      range: src.range ?? src.badge ?? "",
      icon:
        p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        "/fallback-property.jpg",
    };
  });
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <>
      <Header />
      <Hero2 heading_en="Our Properties" breadcrumbPosition="left" />
      <Property properties={properties} />
      <Footer />
    </>
  );
}
