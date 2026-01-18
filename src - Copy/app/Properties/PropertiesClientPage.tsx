"use client";

import { useState, useEffect } from "react";
import Property, { PropertyItem } from "../components/Property";
import { PropertyTypeTerm } from "@/lib/getPropertyTypes";
import PropertyTypeTabs from "./PropertyTypeTabs";

type PropertiesClientPageProps = {
  properties: PropertyItem[];
  propertyTypes: PropertyTypeTerm[];
  initialSelectedSlug?: string;
};

export default function PropertiesClientPage({
  properties,
  propertyTypes,
  initialSelectedSlug,
}: PropertiesClientPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(
    initialSelectedSlug
  );

  useEffect(() => {
    setSelectedSlug(initialSelectedSlug);
  }, [initialSelectedSlug]);

  const filteredProperties = selectedSlug
    ? properties.filter((p) =>
        p.typeSlugs?.some(
          (slug) => slug.toLowerCase() === selectedSlug.toLowerCase()
        )
      )
    : properties;

  return (
    <div>
      <PropertyTypeTabs
        propertyTypes={propertyTypes}
        selectedSlug={selectedSlug}
        onSelect={setSelectedSlug}
      />
      <Property properties={filteredProperties} />
    </div>
  );
}
