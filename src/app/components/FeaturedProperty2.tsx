"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";




const property2En = [
    {
        id: '01',
              icon: "/property1.jpg",

        title: "Land Solded",
        land: "land",
        location: "Mattannur, kannur, Kerala",
        price: "₹ 8lakh/cent",
        listed: "22 Nov 2025",
        status: "Solded",
        range: "Premium",


        link: "/"
    },
    {
        id: '02',
               icon: "/property2.jpg",

        title: "Land Solded",
        land: "land",
        location: "Mattannur, kannur, Kerala",
        price: "₹ 8lakh/cent",
        listed: "22 Nov 2025",
        status: "Solded",
        range: "Premium",


        link: "/"
    },
    {
        id: '03',
               icon: "/property4.jpg",

        title: "Land Solded",
        land: "land",
        location: "Mattannur, kannur, Kerala",
        price: "₹ 8lakh/cent",
        listed: "22 Nov 2025",
        status: "Solded",
        range: "Premium",


        link: "/"
    },
    {
        id: '04',
               icon: "/property3.jpg",

        title: "Land Solded",
        land: "land",
        location: "Mattannur, kannur, Kerala",
        status: "Solded",
    },

];

export default function Property2() {
    const property2 = property2En;
    const fadeRef = useRef<HTMLHeadingElement>(null);
    useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);


    return (
        <section id="property2" className="py-12 lg:py-20  relative bg-white rounded-3xl">
            <div className="max-w-[1360px] mx-auto px-3 lg:px-6 ">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }} className="heading flex  items-center justify-between mb-10">
                    <div className="max-w-[400px]">
                        <div className="flex items-center gap-2 text-site mb-3 uppercase text-sm">
                            <Image src="/favicon.png" alt="Logo" width={30} height={30} className="object-contain" />
                            Best Properties
                        </div>
                        <h2 ref={fadeRef} className="fade-up-stagger text-2xl lg:text-[36px] font-medium mb-1 leading-tight text-site">
                            Best Solded Properties  in Kerala
                        </h2>
                    </div>
                    <AnimatedButton label="View More" className="mt-6 w-fit" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  relative  ">
                    {property2.map((property2) => (
                        <div
                            key={property2.id}
                            className="group bg-[var(--background2)] p-2 border border-[var(--siteColor3)] rounded-2xl relative transition-all duration-500 relative top-0 hover:top-[-5px]"
                        >

                            <span className="block relative">
                                <Image src={property2.icon} alt="image" width={400} height={400} className="aspect-[2/1.5] object-cover rounded-xl" />
                                <div className="absolute top-[10px] right-[10px] flex gap-2">
                                    <span className=" bg-[#ffa500] text-white font-light text-xs rounded-full px-2 py-[2px]">{property2.status}</span>

                                </div>
                                
                            </span>

                            <div className="p-3">
                                <div className="flex gap-4 items-center mb-2">

                                    <h3 className="text-[18px] font-semibold">{property2.title}</h3>
                                </div>
                                <p className="text-sm  leading-snug text-1 font-light">
                                    {property2.land}
                                </p>
                                <p className="text-sm  leading-snug text-1 py-1 font-light">
                                    {property2.location}
                                </p>
                                
                            </div>

                        </div>
                    ))}
                </motion.div>
            </div>
        </section >
    );
}
