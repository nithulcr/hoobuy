// app/Properties/PropertiesClientPage.tsx
"use client";

import { useState, useEffect } from "react";
import Property, { PropertyItem } from "../components/Property";
import { PropertyTypeTerm } from "@/lib/getPropertyTypes";
import { PropertyLocationTerm } from "@/lib/getPropertyLocations";
import PropertyTypeTabs from "./PropertyTypeTabs";

type PropertiesClientPageProps = {
  properties: PropertyItem[];
  propertyTypes: PropertyTypeTerm[];
  locations: PropertyLocationTerm[];
  initialSelectedSlug?: string;
  initialLocationSlug?: string;
};

export default function PropertiesClientPage({
  properties,
  propertyTypes,
  locations,
  initialSelectedSlug,
  initialLocationSlug,
}: PropertiesClientPageProps) {
  const [selectedTypeSlug, setSelectedTypeSlug] = useState<string | undefined>(
    initialSelectedSlug
  );
  const [selectedLocationSlug, setSelectedLocationSlug] = useState<
    string | undefined
  >(initialLocationSlug);

  useEffect(() => {
    setSelectedTypeSlug(initialSelectedSlug);
  }, [initialSelectedSlug]);

  useEffect(() => {
    setSelectedLocationSlug(initialLocationSlug);
  }, [initialLocationSlug]);

  const filteredProperties = properties.filter((p) => {
    const matchesType = selectedTypeSlug
      ? p.typeSlugs?.some(
          (slug) => slug.toLowerCase() === selectedTypeSlug.toLowerCase()
        )
      : true;

    const matchesLocation = selectedLocationSlug
      ? p.locationSlugs?.some(
          (slug) => slug.toLowerCase() === selectedLocationSlug.toLowerCase()
        )
      : true;

    return matchesType && matchesLocation;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Type tabs */}
        <PropertyTypeTabs
          propertyTypes={propertyTypes}
          selectedSlug={selectedTypeSlug}
          onSelect={setSelectedTypeSlug}
        />

        {/* Location dropdown */}
        <div className="property-location flex items-center gap-2">
          <label className="text-sm text-gray-700" htmlFor="location-filter">
            Nearest Location:
          </label>
          <select
            id="location-filter"
            value={selectedLocationSlug ?? ""}
            onChange={(e) =>
              setSelectedLocationSlug(e.target.value || undefined)
            }
            className="p-2 border rounded-md text-sm"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc.slug} value={loc.slug}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Property properties={filteredProperties} />
    </div>
  );
}
