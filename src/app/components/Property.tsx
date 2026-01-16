"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";

export type PropertyItem = {
  id: number;
  slug: string;
  title: string;
  land: string;
  location: string;
  price: string;
  range: string;
  icon: string;
  // Names, e.g. ["Agricultural / Farmland"]
  typeNames: string[];
  // Slugs, e.g. ["agricultural-farmland"]
  typeSlugs: string[];
};

export default function Property({ properties }: { properties: PropertyItem[] }) {
  const fadeRef = useRef<HTMLHeadingElement>(null);
  useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);

  return (
    <section id="property" className="pb-10 lg:pb-14 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative"
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="group bg-white p-2 border border-[var(--siteColor3)] rounded-2xl relative transition-all duration-500 top-0 hover:top-[-5px]"
            >
              <span className="block relative">
                <Image
                  src={property.icon}
                  alt={property.title}
                  width={400}
                  height={400}
                  className="aspect-[2/1.5] object-cover rounded-xl"
                />

                {/* Top-right badge */}
                <div className="absolute top-[10px] right-[10px] flex gap-2">
                  <span className="bg-[#ffa500] text-white font-light text-xs rounded-full px-2 py-[4px] flex gap-1">
                    <Image
                      src="/crown.png"
                      alt="Premium"
                      width={14}
                      height={14}
                    />
                    {property.range}
                  </span>
                </div>

                {/* WhatsApp icon */}
                <Link
                  href=""
                  className="absolute bottom-[10px] right-[10px] bg-white p-1 rounded-full"
                >
                  {/* svg omitted for brevity – keep your existing SVG */}
                </Link>
              </span>

              <div className="p-3">
                <div className="flex gap-4 items-center mb-2">
                  <h3 className="text-[18px] font-semibold">
                    {property.title}
                  </h3>
                </div>

                <p className="text-sm leading-snug text-1 font-light">
                  {property.land}
                </p>
                <p className="text-sm leading-snug text-1 py-1 font-light">
                  {property.location}
                </p>

                <div className="text-sm mt-2">
                  <div className="flex gap-3">
                    <span>Price:</span>
                    <span className="text-site text-sm">
                      {property.price}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/Properties/${property.slug}`}
                  className="flex items-center gap-2 mt-4 font-medium text-sm justify-end"
                >
                  View More
                  {/* arrow svg – keep your current one */}
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
