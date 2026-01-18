"use client";
import React, { useRef, useState } from "react";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import AnimatedButton from "./AnimatedButton";
import Image from "next/image";

// Define the Post interface
interface Post {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

const ProcessMain = ({ posts }: { posts: Post[] }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const fadeRef = useRef<HTMLHeadingElement>(null);
  useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);

  const data = posts.map(post => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    if (!featuredImage) {
      console.warn(`Featured image not found for post: "${post.title.rendered}"`);
    }
    return {
      img: featuredImage || '/blog1.png',
      title: post.title.rendered,
      date: new Date(post.date).toLocaleDateString(),
      link: `/blogs/${post.slug}`,
    };
  });

  return (
    <section className="py-14 lg:py-24  rounded-3xl">
      <div className="max-w-[1400px] mx-auto px-6 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }} className="heading flex flex-col gap-4 md:flex-row justify-between items-center  mx-auto mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-2 text-site mb-3 uppercase text-xs lg:text-sm justify-center md:justify-start">
              <Image src="/favicon.png" alt="Logo" width={30} height={30} className="object-contain" />
            News & Insights
            </div>
            <h2 ref={fadeRef} className="text-center md:text-left fade-up-stagger text-3xl lg:text-[36px]  font-medium mb-1 leading-tight text-site">
              Property Insights & Stories
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="previous-btn cursor-pointer" onClick={() => swiper?.slidePrev()}>
              <svg width="60" height="60" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.3876 25.731L28.8876 36.231L39.3876 46.731" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M36.3876 66.231C19.8186 66.231 6.38757 52.8 6.38757 36.231C6.38757 19.662 19.8186 6.23096 36.3876 6.23096C52.9566 6.23096 66.3876 19.662 66.3876 36.231C66.3876 52.8 52.9566 66.231 36.3876 66.231Z" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            </span>
            <span className="next-btn cursor-pointer" onClick={() => swiper?.slideNext()}>
              <svg width="60" height="60" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.3876 25.731L43.8876 36.231L33.3876 46.731" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M36.3876 66.231C52.9566 66.231 66.3876 52.8 66.3876 36.231C66.3876 19.662 52.9566 6.23096 36.3876 6.23096C19.8186 6.23096 6.38757 19.662 6.38757 36.231C6.38757 52.8 19.8186 66.231 36.3876 66.231Z" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>


            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }} className="process-slide -mr-8  -ml-8  md:mx-0">
          <Swiper
            modules={[Pagination, Navigation]}
            loop={true}


            // autoplay={{
            //   delay: 4000,
            //   disableOnInteraction: false,
            // }}

            speed={2000}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

            }}
            className="mySwiper cursor-grab"
            onSwiper={setSwiper}
          >
            {data.map((choose, index) => (
              <SwiperSlide key={`${choose.title}-${index}`}>
                <div
                  className="group bg-white rounded-3xl grid lg:grid-cols-2 gap-2 p-3 md:p-4 relative h-full min-h-[240px] lg:min-h-[330px]  relative overflow-hidden"
                >

                  <div className="relative min-h-[150px]">

                    <Image src={choose.img} alt="ProcessMain" layout="fill" className="object-cover issue-image w-full h-full rounded-xl" />

                  </div>

                  <div className="relative z-1 flex flex-col justify-between p-2 md:p-6">

                    <div className="">
                      <p className="text-xs bg-[#ECF0F0] rounded-lg px-4 py-1 text-[#626262] sm:text-sm inline-block font-normal max-w-[250px]">{choose.date}</p>

                      <h3 className="text-lg md:text-xl leading-tight font-semibold text-site  mt-2 min-h-[70px]">{choose.title}</h3>


                    </div>
                    <AnimatedButton href={choose.link} label="Learn More" className="w-fit transparent-btn2 transparent-btn3 mt-3" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessMain;