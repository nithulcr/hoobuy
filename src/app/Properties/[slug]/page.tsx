"use client";
import React, { useState, use } from "react";
import Image from "next/image"; // Import the Image component
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { properties } from "../data";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function PropertyPage({ params }: PageProps) {
    const { slug } = use(params);
    const [activeImage, setActiveImage] = useState(0);
    const property = properties.find((p) => p.slug === slug);

    if (!property) return notFound(); // Keep the conditional return after hook calls

    return (
        <div className="property-page">
            <Header />


            <main className=" container mx-auto px-6 max-w-[1400px] py-10  grid grid-cols-2 gap-8 mt-[80px]">
                {/* Left: media */}
                <div className="property-media gap-3">
                    <div className="main-image">
                        <Image
                            src={property.images[activeImage]}
                            alt={property.title}
                            width={800} // Example width, adjust as needed
                            height={420} // Example height, adjust as needed
                            className="w-full h-[420px] object-cover rounded-xl"
                        />
                    </div>
                    <div className="thumb-row flex gap-2">
                        {property.images.map((img, idx) => (
                            <button
                                key={img}
                                onClick={() => setActiveImage(idx)}
                                className={`border rounded-md overflow-hidden cursor-pointer ${idx === activeImage ? "border-site" : "border-transparent"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${property.title} ${idx + 1}`}
                                    width={80} // Example width, adjust as needed
                                    height={64} // Example height, adjust as needed
                                    className="w-20 h-16 object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: details */}
                <div className="property-info flex-1 flex flex-col gap-3">
                    <div className="mt-2">
                       
                        <span className="flex gap-2 items-center w-fit rounded-full bg-amber-500 text-white text-xs px-3 py-1">
                            <Image
                            src="/crown.png"
                            alt="Business for Success"
                            width={14}
                            height={14}
                            className=" "
                        /> {property.range}
                        </span>
                    </div>
                    <h1 className="text-3xl font-semibold">{property.title}</h1>
                    <p className="text-xl text-site font-semibold">
                        {property.price}
                    </p>
                    <p className="text-sm text-gray-600">{property.location}</p>



                    <h3 className="mt-4 font-semibold text-lg">About this property</h3>
                    <p className="text-sm leading-relaxed">
                        {property.description}
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button className="primary bg-site text-white px-4 py-2 rounded-md text-sm">
                            Contact Agent
                        </button>
                        <button className="secondary bg-gray-200 px-4 py-2 rounded-md text-sm">
                            Schedule a Visit
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}