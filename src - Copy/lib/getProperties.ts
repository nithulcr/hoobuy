export interface Property {
  id: string;
  slug: string; // Added slug
  icon: string; // URL of the featured image
  title: string;
  land: string;
  location: string;
  price: string;
  badge: string;
  link: string;
}

interface WordPressPropertyRaw {
  id: number;
  slug: string; // Added slug
  title: {
    rendered: string;
  };
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
  acf?: { // Assuming ACF is used
    land?: string;
    location?: string;
    price?: string;
    badge?: string;
  };
  // Add other properties if needed
}

export async function getLatestProperties(): Promise<Property[]> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) {
    console.error("NEXT_PUBLIC_WP_API_URL is missing");
    return [];
  }

  // IMPORTANT: ensure your CPT slug here matches what you see in /wp-json/wp/v2/types
  const WORDPRESS_API_URL = `${base}/property?_embed&orderby=date&order=desc&per_page=8`;

  try {
    const response = await fetch(WORDPRESS_API_URL, {
      // cache: "no-store", or next: { revalidate: 60 } if you use App Router
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("WordPress API Response Error:", {
        url: WORDPRESS_API_URL,
        status: response.status,
        statusText: response.statusText,
        body,
      });
      return [];
    }

    const rawProperties = await response.json();

    if (!Array.isArray(rawProperties)) {
      console.error("Unexpected properties payload:", rawProperties);
      return [];
    }

    const properties: Property[] = rawProperties.map((prop: WordPressPropertyRaw) => {
      const acf = prop.acf ?? {};
      return {
        id: String(prop.id),
        slug: prop.slug, // Mapped slug
        title: prop.title?.rendered ?? "Untitled",
        land: acf.land ?? "N/A",
        location: acf.location ?? "N/A",
        price: acf.price ?? "N/A",
        badge: acf.badge ?? "Premium",
        link: prop.link ?? "#", // WordPress API link, will be overridden in component
        icon:
          prop._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
          "/property1.jpg",
      };
    });

    return properties;
  } catch (error) {
    console.error(
      "Failed to fetch latest properties. Check network, CORS, or API URL.",
      error
    );
    return [];
  }
}
