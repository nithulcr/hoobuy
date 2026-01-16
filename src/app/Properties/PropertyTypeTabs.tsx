"use client";

import { PropertyTypeTerm } from "@/lib/getPropertyTypes";

type PropertyTypeTabsProps = {
  propertyTypes: PropertyTypeTerm[];
  selectedSlug: string | undefined;
  onSelect: (slug: string | undefined) => void;
};

export default function PropertyTypeTabs({
  propertyTypes,
  selectedSlug,
  onSelect,
}: PropertyTypeTabsProps) {
  return (
    <section className="property_types py-6 lg:py-10">
      <div className="max-w-[1400px] mx-auto lg:px-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect(undefined)}
          className={`px-2 lg:px-4 py-1 rounded-full text-xs lg:text-sm border transition-colors cursor-pointer ${
            !selectedSlug
              ? "bg-[var(--siteColor)] text-white border-[var(--siteColor)]"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          All
        </button>

        {propertyTypes.map((type) => (
          <button
            key={type.slug}
            type="button"
            onClick={() => onSelect(type.slug)}
            className={`px-2 lg:px-4 py-1 rounded-full text-xs lg:text-sm border transition-colors cursor-pointer ${
              selectedSlug === type.slug
                ? "bg-[var(--siteColor)] text-white border-[var(--siteColor)]"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </section>
  );
}
