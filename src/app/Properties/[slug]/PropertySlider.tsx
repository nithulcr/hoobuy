"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";

type SliderProps = {
  images: string[];
  title: string;
};

export default function PropertySlider({ images, title }: SliderProps) {
  // Optional: debug
  console.log("Slider images:", images);

  const cleaned = (images || []).filter(
    (u) => typeof u === "string" && u.trim() !== ""
  );

  const safeImages = cleaned.length ? cleaned : ["/bg.jpg"];

  const [activeImage, setActiveImage] = useState(0);
  const totalImages = safeImages.length || 1;

  const goPrev = () =>
    setActiveImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));

  const goNext = () =>
    setActiveImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 80;
    if (info.offset.x > threshold) goPrev();
    else if (info.offset.x < -threshold) goNext();
  };

  return (
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
          style={{ touchAction: "pan-y" }}
        >
          {safeImages.map((img, idx) => (
            <div key={img + idx} className="min-w-full">
              <Image
                src={img}
                alt={`${title} ${idx + 1}`}
                width={800}
                height={420}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </motion.div>

        {totalImages > 1 && (
          <>
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
          </>
        )}

        {totalImages > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`w-2 h-2 rounded-full ${
                  i === activeImage ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {totalImages > 1 && (
        <div className="thumb-row grid grid-cols-6 gap-1 lg:gap-2">
          {safeImages.map((img, idx) => (
            <button
              key={img + idx}
              type="button"
              onClick={() => setActiveImage(idx)}
              className={`border rounded-sm lg:rounded-md overflow-hidden cursor-pointer ${
                idx === activeImage ? "border-site" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${title} ${idx + 1}`}
                width={80}
                height={64}
                className="w-full aspect-[1/.7] object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
