// app/Properties/[slug]/page.tsx

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "../../components/Footer";
import FeaturedProperty3 from "../../components/FeaturedProperty3";
import AnimatedButton from "../../components/AnimatedButton";
import { MapPin } from "lucide-react";
import { getProperties } from "../data";
import PropertySlider from "./PropertySlider";

type WPProperty = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    // main info
    property_class?: "premium" | "standard" | "affordable" | "solded";
    price?: string;
    location?: string;
    range?: string;
    property_summary?: string;

    // gallery image IDs (ACF Image return = ID)
    image1?: number | null;
    image2?: number | null;
    image3?: number | null;
    image4?: number | null;
    image5?: number | null;
    image6?: number | null;


    // address block
    address_line?: string;
    district?: string;
    state?: string;
    locality?: string;

    // details block
    property_size?: string;
    land_area?: string;
    bedrooms?: string;
    bathrooms?: string;
    parking_spaces?: string;
    year_built?: string;
    property_type?: string;
    property_status?: string;

    // features
    features?: string[];
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
  };
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getProperty(slug: string): Promise<WPProperty | null> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) return null;

  const res = await fetch(
    `${base}/property?slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;

  const data = (await res.json()) as WPProperty[];
  return data[0] ?? null;
}

// helper: resolve media ID to URL
async function getMediaUrl(id: number): Promise<string | null> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) return null;

  try {
    const res = await fetch(`${base}/media/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    const media = await res.json();
    const url: unknown = media?.source_url;
    return typeof url === "string" ? url : null;
  } catch {
    return null;
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;

  const wpProperty = await getProperty(slug);
  if (!wpProperty) return notFound();

  const acf = wpProperty.acf ?? {};

  // collect gallery image IDs from ACF
  const acfIds = [
    acf.image1,
    acf.image2,
    acf.image3,
    acf.image4,
    acf.image5,
    acf.image6,

  ].filter((id): id is number => typeof id === "number");

  const acfUrls = await Promise.all(acfIds.map((id) => getMediaUrl(id)));
  const imagesFromAcf = acfUrls.filter(
    (u): u is string => typeof u === "string" && u.trim() !== ""
  );

  const featured =
    wpProperty._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

  const images =
    imagesFromAcf.length > 0
      ? imagesFromAcf
      : featured
        ? [featured]
        : ["/fallback-property.jpg"];

  const descriptionRaw =
    acf.property_summary ?? wpProperty.content.rendered ?? "";
  const descriptionText = descriptionRaw.replace(/<[^>]+>/g, "");

  const property = {
    title: wpProperty.title.rendered,
    price: acf.price ?? "",
    location: acf.location ?? "",
    description: descriptionText,
    images,
    property_class: acf.property_class,
  };

  // address values
  const addr = {
    address: acf.address_line ?? "",
    district: acf.district ?? "",
    state: acf.state ?? "",
    locality: acf.locality ?? "",
  };

  // details values
  const details = {
    size: acf.property_size ?? "",
    landArea: acf.land_area ?? "",
    bedrooms: acf.bedrooms ?? "",
    bathrooms: acf.bathrooms ?? "",
    parking: acf.parking_spaces ?? "",
    yearBuilt: acf.year_built ?? "",
    type: acf.property_type ?? "",
    status: acf.property_status ?? "",
  };

  const featureList =
    Array.isArray(acf.features) && acf.features.length > 0
      ? acf.features
      : [];

  // Build WhatsApp message using title and slug
  const whatsappMessage = `I'm interested in this property: ${property.title}. You can view the property here: https://hoobuy-realestate.vercel.app//Properties/${slug}`;
  const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);

  // Fetch all properties and filter for related ones
  const allProperties = await getProperties();
  const relatedProperties = allProperties
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  return (
    <div className="property-page">
      <main className="pb-14 lg:pb-24 pt-5 lg:pt-10 mx-auto px-1 lg:px-6 max-w-[1400px]  grid grid-cols-1 lg:grid-cols-2 gap-8 mt-[80px]">
        {/* LEFT: slider */}
        <PropertySlider images={property.images} title={property.title} />

        {/* RIGHT: details */}
        <div className="property-info flex-1 flex flex-col gap-3">
          <div className="mt-2 property_class flex gap-2">
            {property.property_class === "premium" && (
              <span className="bg-[#FFA500] text-white font-light text-[10px] lg:text-xs rounded-full px-1 py-[2px] lg:px-2 lg:py-[4px] flex gap-1">
                <Image
                  src="/crown.png"
                  alt="Premium"
                  width={14}
                  height={14}
                  className="pl-[2px]"
                />
                Premium
              </span>
            )}

            {property.property_class === "standard" && (
              <span className="bg-[#1a3981] text-white font-light text-[10px] lg:text-xs rounded-full px-1 py-[2px] lg:px-2 lg:py-[4px] flex gap-1">
                <Image
                  src="/crown.png"
                  alt="Standard"
                  width={14}
                  height={14}
                  className="pl-[2px]"
                />
                Standard
              </span>
            )}

            {property.property_class === "affordable" && (
              <span className="bg-[#16A34A] text-white font-light text-[10px] lg:text-xs rounded-full px-1 py-[2px] lg:px-2 lg:py-[4px] flex gap-1">
                <Image
                  src="/crown.png"
                  alt="Affordable"
                  width={14}
                  height={14}
                  className="pl-[2px]"
                />
                Affordable
              </span>
            )}
            {property.property_class === "solded" && (
              <span className="bg-[#DC2626] text-white font-light text-[10px] lg:text-xs rounded-full px-1 py-[2px] lg:px-2 lg:py-[4px] flex gap-1">

                Solded
              </span>
            )}
          </div>


          <h1 className="text-3xl font-semibold">{property.title}</h1>
          <p className="text-2xl text-site font-semibold">
            {property.price ? `₹${property.price}` : ""}
          </p>
          <p className="text-md text-gray-600 flex gap-2 items-center bg-white w-fit pl-3 pr-4 py-1 rounded-3xl">
            <MapPin size={16} className="text-site" />
            {property.location}
          </p>

          <div>
            <h3 className="font-medium text-md my-2">Description:</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {property.description}
            </p>
          </div>

          {property.property_class !== "solded" && (
            <div className="mt-3 flex items-center flex-wrap gap-2 lg:gap-4 contact-buttons">
              <AnimatedButton href="tel:7293335555" label="Contact Us" className="w-fit" />
              <AnimatedButton
                href={`https://wa.me/7293335555?text=${encodedWhatsAppMessage}`}
                label="Whatsapp Us"
                className="w-fit transparent-btn transparent-btn5 whatsapp-btn"
              />
            </div>
          )}


          {/* Address */}
          <div className="bg-white rounded-2xl p-6 my-3">
            <div className="flex items-center gap-2 justify-between mb-2 border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-lg">Address</h3>
            </div>
            <div className="block-content-wrap">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 list-none">
                <li className="flex">
                  <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong
                      id="address-label"
                      className="text-sm font-semibold"
                    >
                      Address:
                    </strong>
                    <span
                      aria-labelledby="address-label"
                      className="text-right text-sm text-gray-700"
                    >
                      {addr.address}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong id="city-label" className="text-sm font-semibold">
                      District:
                    </strong>
                    <span
                      aria-labelledby="city-label"
                      className="text-right text-sm text-gray-700"
                    >
                      {addr.district}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong id="state-label" className="text-sm font-semibold">
                      State/county:
                    </strong>
                    <span
                      aria-labelledby="state-label"
                      className="text-right text-sm text-gray-700"
                    >
                      {addr.state}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong id="area-label" className="text-sm font-semibold">
                      Locality:
                    </strong>
                    <span
                      aria-labelledby="area-label"
                      className="text-right text-sm text-gray-700"
                    >
                      {addr.locality}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl p-6 my-3">
            <div className="flex items-center gap-2 justify-between mb-2 border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-lg">Details</h3>
            </div>
            <div className="detail-wrap">
              <ul
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 list-none"
                role="list"
              >
                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">Price</strong>
                    <span className="text-sm text-gray-800">
                      {property.price ? `₹${property.price}` : ""}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">
                      Property Size
                    </strong>
                    <span className="text-sm text-gray-800">
                      {details.size}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">
                      Land Area
                    </strong>
                    <span className="text-sm text-gray-800">
                      {details.landArea}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">Bedrooms</strong>
                    <span className="text-sm text-gray-800">
                      {details.bedrooms}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">Bathrooms</strong>
                    <span className="text-sm text-gray-800">
                      {details.bathrooms}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">
                      Parking Spaces
                    </strong>
                    <span className="text-sm text-gray-800">
                      {details.parking}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">
                      Year Built
                    </strong>
                    <span className="text-sm text-gray-800">
                      {details.yearBuilt}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">
                      Property Type
                    </strong>
                    <span className="text-sm text-gray-800">
                      {details.type}
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                    <strong className="text-sm font-semibold">
                      Property Status
                    </strong>
                    <span className="text-sm text-gray-800">
                      {details.status}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-6 my-3">
            <div className="flex items-center gap-2 justify-between mb-2 border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-lg">Features</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {featureList.map((feat) => (
                <div
                  key={feat}
                  className="rounded-4xl text-white relative bg-[var(--siteColor)]"
                >
                  <h3 className="text-[12px] py-1 px-3 font-light">{feat}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main >

      <FeaturedProperty3 properties={relatedProperties} />
      <Footer />
    </div >
  );
}
