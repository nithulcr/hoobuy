"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, PanInfo } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FeaturedProperty3 from "../../components/FeaturedProperty3";

import { properties } from "../data";
import AnimatedButton from "../../components/AnimatedButton";
import { MapPin, Map } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function PropertyPage({ params }: PageProps) {
    const { slug } = use(params);
    const [activeImage, setActiveImage] = useState(0); // This must be called unconditionally
    const property = properties.find((p) => p.slug === slug);

    if (!property) return notFound();
    const totalImages = property.images.length;

    const goPrev = () => {
        setActiveImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    };

    const goNext = () => {
        setActiveImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    };

    const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 80; // drag distance in px

        if (info.offset.x > threshold) {
            goPrev(); // dragged right
        } else if (info.offset.x < -threshold) {
            goNext(); // dragged left
        }
        // if smaller than threshold, it just snaps back to current slide
    };

    return (
        <div className="property-page">
            <Header />

            <main className="pb-14 lg:pb-24 mx-auto px-1 lg:px-6 max-w-[1400px] py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-[80px]">
                {/* LEFT: draggable slider */}
                <div className="property-media flex flex-col gap-3 lg:sticky lg:top-[100px] h-fit">
                    <div className="relative overflow-hidden rounded-xl select-none">
                        <motion.div
                            className="flex"
                            drag="x"
                            dragElastic={0.2}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragDirectionLock
                            onDragEnd={handleDragEnd}
                            animate={{ x: `-${activeImage * 100}%` }}
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            style={{ touchAction: "pan-y" }} // allow vertical page scroll while dragging horizontally
                        >
                            {property.images.map((img, idx) => (
                                <div key={img} className="min-w-full">
                                    <Image
                                        src={img}
                                        alt={`${property.title} ${idx + 1}`}
                                        width={800}
                                        height={420}
                                        className="w-full h-[420px] object-cover rounded-xl"
                                    />
                                </div>
                            ))}
                        </motion.div>

                        {/* Arrows */}
                        <button
                            type="button"
                            onClick={goPrev}
                            className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl"
                        >
                            ›
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {property.images.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImage(i)}
                                    className={`w-2 h-2 rounded-full ${i === activeImage ? "bg-white" : "bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="thumb-row flex gap-2">
                        {property.images.map((img, idx) => (
                            <button
                                key={img}
                                type="button"
                                onClick={() => setActiveImage(idx)}
                                className={`border rounded-md overflow-hidden cursor-pointer ${idx === activeImage ? "border-site" : "border-transparent"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${property.title} ${idx + 1}`}
                                    width={80}
                                    height={64}
                                    className="w-20 h-16 object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT: details */}
                <div className="property-info flex-1 flex flex-col gap-3">
                    <div className="mt-2">
                        <span className="flex gap-2 items-center w-fit rounded-full bg-amber-500 text-white text-xs px-3 py-1">
                            <Image src="/crown.png" alt="Premium" width={14} height={14} />
                            {property.range}
                        </span>
                    </div>
                    <h1 className="text-3xl font-semibold">{property.title}</h1>
                    <p className="text-xl text-site font-semibold">{property.price}</p>
                    <p className="text-md text-gray-600 flex gap-2 items-center bg-white w-fit px-3 py-1 rounded-3xl"><MapPin size={16} className={`text-site `} />{property.location}</p>
                   <div>
                    <h3 className="font-medium text-md my-2">Property Details:</h3>
                     <p className="text-sm leading-relaxed text-gray-700 ">  {property.description}</p>
                   </div>
                    <div className="mt-3 flex items-center flex-wrap gap-2 lg:gap-4">

                        <AnimatedButton label="Contact Us" className="w-fit" />
                        <AnimatedButton label="Whatsapp Us" className="w-fit transparent-btn transparent-btn4  whatsapp-btn" />


                    </div>


                    <div className="bg-white rounded-2xl p-6 my-3">
                        <div className="flex items-center gap-2 justify-between mb-2 border-b border-gray-200 pb-3">
                            <h3 className="font-semibold text-lg">Address</h3>
                            
                        </div>
                        <div className="block-content-wrap">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 list-none">
                                <li className="flex">
                                    <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong id="address-label" className="text-sm font-semibold">
                                            Address:
                                        </strong>
                                        <span aria-labelledby="address-label" className="text-right text-sm text-gray-700">
                                            Behind infopark phase 2, Kakkanad
                                        </span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong id="city-label" className="text-sm font-semibold">
                                            District:
                                        </strong>
                                        <span aria-labelledby="city-label" className="text-right text-sm text-gray-700">
                                            Ernakulam
                                        </span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong id="state-label" className="text-sm font-semibold">
                                            State/county:
                                        </strong>
                                        <span aria-labelledby="state-label" className="text-right text-sm text-gray-700">
                                            Kerala
                                        </span>
                                    </div>
                                </li>

                               

                                <li className="flex">
                                    <div className="list-lined-item w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong id="area-label" className="text-sm font-semibold">
                                            Locality:
                                        </strong>
                                        <span aria-labelledby="area-label" className="text-right text-sm text-gray-700">
                                            Ernakulam, Kakkanad, Kochi
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
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
                                        <span className="text-sm text-gray-800">₹1,15,00,000</span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Property Size</strong>
                                        <span className="text-sm text-gray-800">1886 sqft</span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Land Area</strong>
                                        <span className="text-sm text-gray-800">4 Cent</span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Bedrooms</strong>
                                        <span className="text-sm text-gray-800">3</span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Bathrooms</strong>
                                        <span className="text-sm text-gray-800">3</span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Parking Spaces</strong>
                                        <span className="text-sm text-gray-800">2</span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Year Built</strong>
                                        <span className="text-sm text-gray-800">2025</span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Property Type</strong>
                                        <span className="text-sm text-gray-800">
                                            House, Single Family Home, Villa
                                        </span>
                                    </div>
                                </li>

                                <li className="flex">
                                    <div className="w-full flex justify-between py-2 border-b border-gray-200 gap-2">
                                        <strong className="text-sm font-semibold">Property Status</strong>
                                        <span className="text-sm text-gray-800">For Sale</span>
                                    </div>
                                </li>
                            </ul>
                        </div>


                    </div>
                    <div className="bg-white rounded-2xl p-6 my-3">
                        <div className="flex items-center gap-2 justify-between mb-2 border-b border-gray-200 pb-3">
                            <h3 className="font-semibold text-lg">Features</h3>

                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <div

                                className=" rounded-4xl text-white relative bg-[var(--siteColor)]"
                            >
                                <h3 className="text-[12px] py-1 px-3 font-light">Balcony</h3>

                            </div>
                            <div
 
                                className=" rounded-4xl text-white relative bg-[var(--siteColor)]"
                            >
                                <h3 className="text-[12px]  py-1 px-3 font-light">Calm and Quiet area</h3>

                            </div>
                             <div
 
                                className=" rounded-4xl text-white relative bg-[var(--siteColor)]"
                            >
                                <h3 className="text-[12px]  py-1 px-3 font-light">Car porch</h3>

                            </div>
                             <div
 
                                className=" rounded-4xl text-white relative bg-[var(--siteColor)]"
                            >
                                <h3 className="text-[12px]  py-1 px-3 font-light">Compound wall</h3>

                            </div>
                             <div
 
                                className=" rounded-4xl text-white relative bg-[var(--siteColor)]"
                            >
                                <h3 className="text-[12px]  py-1 px-3 font-light">Dining room</h3>

                            </div>
                             <div
 
                                className=" rounded-4xl text-white relative bg-[var(--siteColor)]"
                            >
                                <h3 className="text-[12px]  py-1 px-3 font-light">Drawing room</h3>

                            </div>
                             <div
 
                                className=" rounded-4xl text-white relative bg-[var(--siteColor)]"
                            >
                                <h3 className="text-[12px]  py-1 px-3 font-light">Electricity connection</h3>

                            </div>
                        </div>


                    </div>

                </div>
            </main>
             <FeaturedProperty3 />

            <Footer />
        </div>
    );
}
