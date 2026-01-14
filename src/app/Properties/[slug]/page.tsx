"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { properties } from "../data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PropertyPage({ params }: PageProps) {
  // 1) Read slug from params
  const { slug } = use(params);

  // 2) Find property
  const property = properties.find((p) => p.slug === slug);
  if (!property) return notFound();

  // 3) Slider / drag state
  const [activeImage, setActiveImage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const totalImages = property.images.length;

  const goPrev = () => {
    setActiveImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const startDrag = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
    setDragX(0);
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging || startX === null) return;
    const diff = clientX - startX;
    setDragX(diff); // move image with pointer
  };

  const endDrag = (clientX: number) => {
    if (!isDragging || startX === null) return;
    const diff = clientX - startX;
    const threshold = 80; // pixels to trigger slide

    if (diff > threshold) {
      goPrev(); // swipe right -> previous
    } else if (diff < -threshold) {
      goNext(); // swipe left -> next
    }

    setIsDragging(false);
    setStartX(null);
    setDragX(0); // snap back to center
  };

  return (
    <div className="property-page">
      <Header />

      <main className="container mx-auto px-6 max-w-[1400px] py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-[80px]">
        {/* Left: media slider */}
        <div className="property-media flex flex-col gap-3">
          <div
            className="relative main-image overflow-hidden rounded-xl cursor-grab select-none"
            onTouchStart={(e) => startDrag(e.touches[0].clientX)}
            onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
            onTouchEnd={(e) => endDrag(e.changedTouches[0].clientX)}
            onMouseDown={(e) => {
              e.preventDefault();
              startDrag(e.clientX);
            }}
            onMouseMove={(e) => {
              if (!isDragging) return;
              moveDrag(e.clientX);
            }}
            onMouseUp={(e) => endDrag(e.clientX)}
            onMouseLeave={() => {
              if (!isDragging) return;
              setIsDragging(false);
              setStartX(null);
              setDragX(0);
            }}
          >
            {/* track that moves with drag */}
            <div
              className="flex"
              style={{
                transform: `translateX(${dragX}px)`,
                transition: isDragging ? "none" : "transform 0.3s ease",
              }}
            >
              <Image
                src={property.images[activeImage]}
                alt={property.title}
                width={800}
                height={420}
                className="w-full h-[420px] object-cover rounded-xl flex-shrink-0"
              />
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className="thumb-row flex gap-2">
            {property.images.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`border rounded-md overflow-hidden cursor-pointer ${
                  idx === activeImage ? "border-site" : "border-transparent"
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

        {/* Right: details */}
        <div className="property-info flex-1 flex flex-col gap-3">
          <div className="mt-2">
            <span className="flex gap-2 items-center w-fit rounded-full bg-amber-500 text-white text-xs px-3 py-1">
              <Image
                src="/crown.png"
                alt="Business for Success"
                width={14}
                height={14}
              />
              {property.range}
            </span>
          </div>
          <h1 className="text-3xl font-semibold">{property.title}</h1>
          <p className="text-xl text-site font-semibold">{property.price}</p>
          <p className="text-sm text-gray-600">{property.location}</p>

          <h3 className="mt-4 font-semibold text-lg">About this property</h3>
          <p className="text-sm leading-relaxed">{property.description}</p>

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
