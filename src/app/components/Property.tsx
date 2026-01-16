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
            <div className="max-w-[1400px] mx-auto lg:px-6">
                <div
                   
                    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 relative"
                >
                    {properties.map((property) => (
                        <Link
                            href={`/Properties/${property.slug}`}
                            key={property.id}
                            className="group bg-white p-2 border border-[var(--siteColor3)] rounded-lg lg:rounded-2xl relative transition-all duration-500 top-0 hover:top-[-5px]"
                        >
                            <span className="block relative">
                                <Image
                                    src={property.icon}
                                    alt={property.title}
                                    width={400}
                                    height={400}
                                    className="aspect-[2/1.5] object-cover rounded-md lg:rounded-xl"
                                />

                                {/* Top-right badge */}
                                <div className="absolute top-[10px] right-[10px] flex gap-2">
                                    <span className="bg-[#ffa500] text-white font-light text-[10px] lg:text-xs rounded-full px-1 py-[2px] lg:px-2 lg:py-[4px] flex gap-1">
                                        <Image
                                            src="/crown.png"
                                            alt="Premium"
                                            width={14}
                                            height={14}
                                            className="pl-[2px]"
                                        />
                                        {property.range}
                                    </span>
                                </div>

                               
                            </span>

                            <div className="lg:px-3 py-3">
                                <div className="flex gap-4 items-center lg:mb-2 mb-1">
                                    <h3 className="text-[18px] font-semibold">
                                        {property.title}
                                    </h3>
                                </div>

                                <p className="text-xs lg:text-sm leading-snug text-1 font-light">
                                    {property.land}
                                </p>
                                <p className="text-xs lg:text-sm leading-snug text-1 py-1 font-light">
                                    {property.location}
                                </p>

                                <div className="text-xs lg:text-sm lg:mt-2">
                                    <div className="flex gap-3">
                                        <span>Price:</span>
                                        <span className="text-site text-xs lg:text-sm">
                                            {property.price}
                                        </span>
                                    </div>
                                </div>

                                <span
                                   
                                    className="flex items-center gap-2 mt-4 font-medium text-xs lg:text-sm justify-end"
                                >
                                    View More
                                  <svg width="18" height="18" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-210 transition-transform duration-300">
                                        <circle cx="11.1884" cy="11.1398" r="11.1443" fill="#0A4235" />
                                        <path d="M14.4393 8.68561L6.39134 13.3321C6.27649 13.3984 6.1927 13.5076 6.15837 13.6357C6.12405 13.7638 6.14202 13.9003 6.20832 14.0151C6.27463 14.13 6.38384 14.2138 6.51193 14.2481C6.64002 14.2824 6.77649 14.2644 6.89134 14.1981L14.9393 9.55163L13.6039 14.5327C13.5696 14.6609 13.5875 14.7976 13.6539 14.9126C13.7203 15.0275 13.8297 15.1114 13.9579 15.1458C14.0862 15.1802 14.2228 15.1622 14.3378 15.0958C14.4528 15.0294 14.5367 14.9201 14.5711 14.7918L16.2182 8.64469C16.2353 8.58119 16.2397 8.51494 16.2311 8.44973C16.2226 8.38451 16.2013 8.32163 16.1684 8.26468C16.1355 8.20772 16.0917 8.15781 16.0395 8.11781C15.9873 8.0778 15.9277 8.04849 15.8642 8.03155L9.71706 6.38443C9.58881 6.35007 9.45216 6.36806 9.33717 6.43445C9.22219 6.50084 9.13828 6.61018 9.10392 6.73843C9.06955 6.86669 9.08754 7.00334 9.15393 7.11832C9.22032 7.23331 9.32966 7.31722 9.45792 7.35158L14.4393 8.68561Z" fill="white" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
