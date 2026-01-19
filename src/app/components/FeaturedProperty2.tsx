// app/components/Property3.tsx
"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import Image from "next/image";
import Link from "next/link";
import type { SoldProperty } from "@/app/Properties/getSoldProperties";
import AnimatedButton from "./AnimatedButton";


type Property3Props = {
    properties: SoldProperty[];
};

export default function Property3({ properties }: Property3Props) {
    const fadeRef = useRef<HTMLHeadingElement>(null);
    useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);

    return (
        <section
            id="Property3"
            className="py-14 lg:py-24 relative bg-white rounded-3xl"
        >
            <div className="max-w-[1400px] mx-auto px-6 ">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="heading flex flex-col md:flex-row md:items-center justify-between mb-4 lg:mb-10"
                >
                    <div className="max-w-[400px]">
                        <div className="flex items-center gap-2 text-site mb-3 uppercase text-xs lg:text-sm">
                            <Image
                                src="/favicon.png"
                                alt="Logo"
                                width={30}
                                height={30}
                                className="object-contain"
                            />
                            Best Properties
                        </div>
                        <h2
                            ref={fadeRef}
                            className="fade-up-stagger text-3xl lg:text-[36px] font-medium mb-1 leading-tight text-site"
                        >
                            Best Solded Properties in Kerala
                        </h2>
                    </div>
                    <div className="hidden lg:block">
                        <AnimatedButton href="/Properties" label="View More" className="mt-6 w-fit" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
                    {properties.map((item) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="group bg-[var(--background2)] p-2 border border-[var(--siteColor3)] rounded-2xl relative transition-all duration-500 relative top-0 hover:top-[-5px]"
                        >
                            <span className="block relative">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={400}
                                    height={400}
                                    className="aspect-[2/1.5] object-cover rounded-xl"
                                />
                                <div className="absolute top-[10px] right-[10px] flex gap-2">
                                    <span className="bg-[#DC2626] text-white font-light text-xs rounded-full px-2 py-[2px]">
                                        Solded
                                    </span>
                                </div>
                            </span>

                            <div className="p-3">
                                <div className="flex gap-4 items-center mb-2">
                                    <h3 className="text-[18px] font-semibold">{item.title}</h3>
                                </div>
                                <p className="text-sm leading-snug text-1 font-light">
                                    {item.land}
                                </p>
                                <p className="text-sm leading-snug text-1 py-1 font-light">
                                    {item.location}
                                </p>
                                {/* {item.price && (
                  <p className="text-sm leading-snug text-1 font-medium">
                    {item.price}
                  </p>
                )} */}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="lg:hidden">
                                    <AnimatedButton href="/Properties" label="View More" className="mt-6 w-fit  mx-auto" />
                                </div>
            </div>
        </section>
    );
}
