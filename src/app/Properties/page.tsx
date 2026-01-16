// app/Properties/page.tsx

import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";
import PropertiesClientPage from "./PropertiesClientPage";
import { getProperties } from "./data";
import { getPropertyTypes } from "@/lib/getPropertyTypes";

type Props = {
  searchParams: { type?: string }; // e.g. ?type=agricultural-farmland
};

export default async function PropertiesPage({ searchParams }: Props) {
  const properties = await getProperties();
  const propertyTypes = await getPropertyTypes();

  const selectedSlug = searchParams.type?.trim() || undefined;

  return (
    <>

      <Hero2
        heading_en={
          selectedSlug
            ? `Our Properties`
            : "Our Properties"
        }
        breadcrumbPosition="left"
      />
      <PropertiesClientPage
        properties={properties}
        propertyTypes={propertyTypes}
        initialSelectedSlug={selectedSlug}
      />
      <Footer />
    </>
  );
}
