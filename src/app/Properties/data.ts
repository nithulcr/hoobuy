// src/app/Properties/data.ts
export interface PropertyItem {
  id: string;
  slug: string;
  icon: string;
  title: string;
  land: string;
  location: string;
  price: string;
  range: string;
  description: string;
  images: string[];
}

export const properties: PropertyItem[] = [
  {
    id: "01",
    slug: "land-for-sale-01",
    icon: "/property1.jpg",
    title: "Land for sale",
    land: "Land",
    location: "Mattannur, Kannur, Kerala",
    price: "₹ 8 lakh/cent",
    range: "Premium",
    description:
      "Prime roadside land suitable for residential or commercial development with easy access to town.",
    images: ["/property1.jpg", "/property2.jpg", "/property3.jpg"],
  },
  {
    id: "02",
    slug: "land-for-sale-02",
    icon: "/property2.jpg",
    title: "Land for sale",
    land: "Land",
    location: "Mattannur, Kannur, Kerala",
    price: "₹ 8 lakh/cent",
    range: "Premium",
    description:
      "Well-positioned plot with good frontage, ideal for villa projects and long‑term investment.",
    images: ["/property1.jpg", "/property2.jpg", "/property3.jpg"],
  },
  // ...repeat for ids 03–08 with unique slug and images if needed
];
