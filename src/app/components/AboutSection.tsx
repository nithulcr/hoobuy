"use client";

import React, { useRef, useEffect } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "About Us",
    subtitle: "Built with modern technology",
    description:
      "HooBuy Real Estate is a Kerala-based property platform dedicated to making buying and selling homes simple, transparent, and stress‑free. With deep local market knowledge and a growing network of trusted partners, HooBuy connects buyers, sellers, and investors with the right opportunities at the right time. The team supports clients through each step of the journey – property discovery, site visits, negotiations, documentation, and closing – with honest guidance and timely communication.",
    videoSrc: "./video.mp4",
    bgClassLeft: "eight",
    bgClassRight: "seven",
    reverse: false,
  },
];

const Services = () => {
  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>(
      ".large-growing-images.small"
    );

    wrappers.forEach((wrapper) => {
      const left = wrapper.querySelector<HTMLElement>(".growing-image.small");
      const right = wrapper.querySelector<HTMLElement>(".growing-image.right");

      if (!left || !right) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.fromTo(
        left,
        { width: "80%" },
        { width: "35%", ease: "none" },
        0
      ).fromTo(
        right,
        { width: "20%" },
        { width: "65%", ease: "none" },
        0
      );
    });

    // optional cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const service = services[0];
  const fadeRef = useRef<HTMLHeadingElement>(null);
  useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);

  return (
    <section id="services" className="section py-14 lg:py-24 overflow-hidden px-3 lg:px-6">
      <div className="grid-wrapper max-w-[1400px] mx-auto lg:px-6">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="service-list grid gap-y-10 lg:gap-y-30">
              <div
                className={`service-item flex flex-col lg:grid gap-x-20 items-center w-full ${
                  service.reverse
                    ? "lg:grid-cols-[1fr_50%] flex-col-reverse"
                    : "lg:grid-cols-[50%_1fr]"
                }`}
              >
                {!service.reverse && (
                  <ServiceMedia
                    videoSrc={service.videoSrc}
                    bgClassLeft={service.bgClassLeft}
                    bgClassRight={service.bgClassRight}
                  />
                )}

                <div className="service-info max-w-[500px] pt-10 lg:pt-0 gap-y-10">
                  <div className="medium-width-intro overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5 }}
                      className="heading flex flex-col max-w-[500px] mx-auto mb-4"
                    >
                      <div className="flex items-center gap-2 text-site mb-3 uppercase text-xs lg:text-sm">
                        <Image
                          src="/favicon.png"
                          alt="Logo"
                          width={30}
                          height={30}
                          className="object-contain"
                        />
                        {service.title}
                      </div>
                      <h2
                        ref={fadeRef}
                        className="fade-up-stagger text-3xl lg:text-[36px] font-medium mb-1 leading-tight text-site"
                      >
                        {service.subtitle}
                      </h2>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-[16px] font-light">
                        {service.description}
                      </p>
                    </motion.div>
                  </div>

                  <AnimatedButton label="Buy a Property" className="mt-6 w-fit" />
                </div>

                {service.reverse && (
                  <ServiceMedia
                    videoSrc={service.videoSrc}
                    bgClassLeft={service.bgClassLeft}
                    bgClassRight={service.bgClassRight}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceMedia = ({
  videoSrc,
  bgClassLeft,
  bgClassRight,
}: {
  videoSrc: string;
  bgClassLeft: string;
  bgClassRight: string;
}) => (
  <div className="service-image w-full">
    <div className="large-growing-images small flex gap-4 w-full rounded-2xl lg:rounded-4xl">
      <div className="growing-image small relative" style={{ width: "80%" }}>
        <div className={`growing-background ${bgClassLeft} absolute inset-0`}>
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="growing-image right relative" style={{ width: "20%" }}>
        <div className={`growing-background ${bgClassRight} absolute inset-0`} />
      </div>
    </div>
  </div>
);

export default Services;
