"use client";

import React, { useRef } from "react";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import AnimatedButton from "./AnimatedButton";
import Image from "next/image";




const ServicesDataEn = [
  {
    id: "01",
    title: <>Apartments</>,
    description: "Modern 1, 2, 3+ BHK apartments in prime city locations, ready to move or under construction.",
    link: "/properties/type/apartment",
            icon: "/property1.jpg",

  },
  
  {
    id: "02",
    title: <>Independent Houses</>,
    description: "Spacious independent houses and individual homes in residential neighbourhoods.",
    link: "/properties/type/independent-house",
            icon: "/property2.jpg",

  },
  {
    id: "03",
    title: <>Villas</>,
    description: "Premium villas in gated communities with privacy, amenities, and landscaped surroundings.",
    link: "/properties/type/villa",
            icon: "/property3.jpg",

  },
  {
    id: "04",
    title: <>Residential Plots</>,
    description: "Verified residential plots and house sites suitable for building your dream home.",
    link: "/properties/type/residential-plot",
            icon: "/property4.jpg",

  },
  {
    id: "05",
    title: <>Commercial Buildings</>,
    description: "Shops, showrooms, office floors, and mixed-use buildings in business-friendly areas.",
    link: "/properties/type/commercial-building",
            icon: "/property1.jpg",

  },
  {
    id: "06",
    title: <>Office Spaces</>,
    description: "Furnished and unfurnished office spaces for startups, SMEs, and corporate teams.",
    link: "/properties/type/office-space",
            icon: "/property2.jpg",

  },
  {
    id: "07",
    title: <>Retail Shops</>,
    description: "High-footfall street-facing and mall retail shops ideal for all types of businesses.",
    link: "/properties/type/shop",
            icon: "/property3.jpg",

  },
  {
    id: "08",
    title: <>Farmland</>,
    description: "Agricultural land and farm properties suitable for cultivation and long-term investment.",
    link: "/properties/type/farmland",
            icon: "/property4.jpg",

  },
  {
    id: "09",
    title: <>Industrial / Warehouse</>,
    description: "Godowns, warehouses, and industrial sheds with easy access to major highways.",
    link: "/properties/type/industrial-warehouse",
            icon: "/property1.jpg",

  },
  {
    id: "10",
    title: <>Holiday Homes</>,
    description: "Resort-style homes and vacation retreats in scenic and tourist-friendly locations.",
    link: "/properties/type/holiday-home",
            icon: "/property2.jpg",

  },
  {
    id: "11",
    title: <>Studio Homes</>,
    description: "Compact, budget-friendly studio homes ideal for students, singles, and working professionals.",
    link: "/properties/type/studio-home",
            icon: "/property3.jpg",

  },
  {
    id: "12",
    title: <>PG / Hostel</>,
    description: "Paying guest rooms and hostel accommodations for students and working people.",
    link: "/properties/type/pg-hostel",
            icon: "/property4.jpg",

  },
  {
    id: "13",
    title: <>Luxury Properties</>,
    description: "High-end luxury villas, penthouses, and signature residences with premium amenities.",
    link: "/properties/type/luxury",
            icon: "/property1.jpg",

  },
  {
    id: "14",
    title: <>Waterfront Properties</>,
    description: "Homes and plots near beaches, rivers, and backwaters with scenic water views.",
    link: "/properties/type/waterfront",
            icon: "/property2.jpg",

  },
];



const Services = () => {
  const data = ServicesDataEn;

  const fadeRef = useRef<HTMLHeadingElement>(null);
  useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-14 lg:py-20 bg-[var(--siteColor)] rounded-3xl">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }} className="heading flex flex-col items-center max-w-[650px] mx-auto mb-14 mx-auto px-6">
          <div className="flex items-center gap-2 mb-3 uppercase text-xs lg:text-sm text-white">
            <Image src="/favicon.png" alt="Logo" width={30} height={30} className="object-contain" />

           Kerala Best Properties
          </div>
          <h2 ref={fadeRef} className="text-center fade-up-stagger text-3xl lg:text-[36px] font-medium mb-1 leading-tight  text-white">
           Explore by Property Type
          </h2>
        </motion.div>
        <div className="service-slide">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}


            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}

            speed={2000}
            // centeredSlides={true}
            observer={true}
            observeParents={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
            }}
            className="mySwiper cursor-grab"
          >
            {data.map((choose, index) => (
              <SwiperSlide key={`${choose.id}-${index}`}>
                <div
                  className="group bg-[#236b7d] rounded-3xl p-5 sm:p-7  relative h-full min-h-[240px] lg:min-h-[330px] flex flex-col justify-end relative overflow-hidden"
                >
                  <div className="absolute w-full h-full left-0 top-0 service-card-overlay lg:opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                    <Image src={choose.icon} alt="service" width={350} height={350} className="object-cover w-full h-full" />
                  </div>


                  <div className="relative z-1">
                    <h3 className="text-lg md:text-xl leading-tight font-semibold text-white mt-2 group-hover:opacity-0 lg:block hidden transition-all duration-500">{choose.title}</h3>

                    {/* Description */}
                    <div className="absolute bottom-[0px] z-1  lg:h-0 lg:opacity-0 translate-y-4 group-hover:opacity-100 group-hover:h-auto group-hover:translate-y-0 transition-all duration-500 overflow-hidden">
                      <h3 className="text-lg md:text-2xl leading-tight font-semibold text-white mt-2 ">{choose.title}</h3>
                      <p className="text-xs text-[#D9D9D9] sm:text-md lg:mt-2 font-light max-w-[250px] mt-2">{choose.description}</p>

                      {/* <AnimatedButton href="{choose.link}" label="Learn More" className="w-fit transparent-btn2 mt-3" /> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Services;