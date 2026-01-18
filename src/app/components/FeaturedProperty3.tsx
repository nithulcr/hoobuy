"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import { PropertyItem } from "./Property"; // Import the PropertyItem type

export default function Property({ properties }: { properties: PropertyItem[] }) {
    const fadeRef = useRef<HTMLHeadingElement>(null);
    useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);

    return (
        <section id="property" className="py-14 lg:py-24   relative bg-white rounded-3xl">
            <div className="max-w-[1400px] mx-auto px-6 ">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }} className="heading flex flex-col md:flex-row   md:items-center justify-between mb-10">
                    <div className="max-w-[400px]">
                        <div className="flex items-center gap-2 text-site mb-3 uppercase text-xs lg:text-sm">
                            <Image src="/favicon.png" alt="Logo" width={30} height={30} className="object-contain" />
                           Features
                        </div>
                        <h2 ref={fadeRef} className="fade-up-stagger text-3xl lg:text-[36px] font-medium mb-1 leading-tight text-site">
                            Related Properties
                        </h2>
                    </div>
                    <AnimatedButton label="View More" className="mt-6 w-fit" />
                </motion.div>

                <div
                    
                    className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  relative  ">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="group bg-[var(--background2)] p-2 border border-[var(--siteColor3)] rounded-2xl relative transition-all duration-500 relative top-0 hover:top-[-5px]"
                        >

                            <span className="block relative">
                                <Image src={property.icon} alt="image" width={400} height={400} className="aspect-[2/1.5] object-cover rounded-xl" />
                                <div className="absolute top-[10px] right-[10px] flex gap-2">

                                    <span className="bg-[#ffa500] text-white font-light text-xs rounded-full px-2 py-[4px] flex  gap-1">
                                        <Image
                                                    src="/crown.png"
                                                    alt="Business for Success"
                                                    width={14}
                                                    height={14}
                                                    className=" "
                                                  />
                                         {property.range}</span>

                                </div>
                                <Link href={`/Properties/${property.slug}`} className="absolute bottom-[10px] right-[10px] bg-white p-1 rounded-full">
                                    <svg width="22" height="22" viewBox="0 0 24 24" className="whatsapp" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.05 4.90999C18.1331 3.9841 17.041 3.24996 15.8375 2.75036C14.634 2.25075 13.3431 1.99568 12.04 1.99999C6.57999 1.99999 2.12999 6.44999 2.12999 11.91C2.12999 13.66 2.58999 15.36 3.44999 16.86L2.04999 22L7.29999 20.62C8.74999 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.26999 20.92 6.77999 19.05 4.90999ZM12.04 20.15C10.56 20.15 9.10999 19.75 7.83999 19L7.53999 18.82L4.41999 19.64L5.24999 16.6L5.04999 16.29C4.22754 14.9771 3.79091 13.4593 3.78999 11.91C3.78999 7.36999 7.48999 3.66999 12.03 3.66999C14.23 3.66999 16.3 4.52999 17.85 6.08999C18.6176 6.85386 19.2259 7.76254 19.6396 8.76332C20.0533 9.76411 20.2642 10.8371 20.26 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 13.99C16.31 13.87 15.09 13.27 14.87 13.18C14.64 13.1 14.48 13.06 14.31 13.3C14.14 13.55 13.67 14.11 13.53 14.27C13.39 14.44 13.24 14.46 12.99 14.33C12.74 14.21 11.94 13.94 11 13.1C10.26 12.44 9.76999 11.63 9.61999 11.38C9.47999 11.13 9.59999 11 9.72999 10.87C9.83999 10.76 9.97999 10.58 10.1 10.44C10.22 10.3 10.27 10.19 10.35 10.03C10.43 9.85999 10.39 9.71999 10.33 9.59999C10.27 9.47999 9.76999 8.25999 9.56999 7.75999C9.36999 7.27999 9.15999 7.33999 9.00999 7.32999H8.52999C8.35999 7.32999 8.09999 7.38999 7.86999 7.63999C7.64999 7.88999 7.00999 8.48999 7.00999 9.70999C7.00999 10.93 7.89999 12.11 8.01999 12.27C8.13999 12.44 9.76999 14.94 12.25 16.01C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.69 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.03 14.27C16.96 14.16 16.81 14.11 16.56 13.99Z" fill="#09424D" />
                                    </svg>
                                </Link>
                            </span>

                            <div className="p-3">
                                <div className="flex gap-4 items-center mb-2">

                                    <h3 className="text-[18px] font-semibold">{property.title}</h3>
                                </div>
                                <p className="text-sm  leading-snug text-1 font-light">
                                    {property.land}
                                </p>
                                <p className="text-sm  leading-snug text-1 py-1 font-light">
                                    {property.location}
                                </p>
                                <div className="text-sm mt-2">
                                    <div className="flex gap-3">
                                        <span>Price:</span>
                                        <span className="text-site text-sm">{property.price}</span>
                                    </div>
                                   
                                </div>
                                <Link
                                    href={`/Properties/${property.slug}`}
                                    className="flex items-center gap-2 mt-4 font-medium text-sm justify-end">
                                    View More
                                    <svg width="18" height="18" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-210 transition-transform duration-300">
                                        <circle cx="11.1884" cy="11.1398" r="11.1443" fill="#0A4235" />
                                        <path d="M14.4393 8.68561L6.39134 13.3321C6.27649 13.3984 6.1927 13.5076 6.15837 13.6357C6.12405 13.7638 6.14202 13.9003 6.20832 14.0151C6.27463 14.13 6.38384 14.2138 6.51193 14.2481C6.64002 14.2824 6.77649 14.2644 6.89134 14.1981L14.9393 9.55163L13.6039 14.5327C13.5696 14.6609 13.5875 14.7976 13.6539 14.9126C13.7203 15.0275 13.8297 15.1114 13.9579 15.1458C14.0862 15.1802 14.2228 15.1622 14.3378 15.0958C14.4528 15.0294 14.5367 14.9201 14.5711 14.7918L16.2182 8.64469C16.2353 8.58119 16.2397 8.51494 16.2311 8.44973C16.2226 8.38451 16.2013 8.32163 16.1684 8.26468C16.1355 8.20772 16.0917 8.15781 16.0395 8.11781C15.9873 8.0778 15.9277 8.04849 15.8642 8.03155L9.71706 6.38443C9.58881 6.35007 9.45216 6.36806 9.33717 6.43445C9.22219 6.50084 9.13828 6.61018 9.10392 6.73843C9.06955 6.86669 9.08754 7.00334 9.15393 7.11832C9.22032 7.23331 9.32966 7.31722 9.45792 7.35158L14.4393 8.68561Z" fill="white" />
                                    </svg>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
