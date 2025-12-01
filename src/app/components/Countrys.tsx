"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import Image from "next/image";




const Districts = [
  {
    icon: <></>,
    title: "Thiruvananthapuram",
    link: "/",
  },
  {
    icon: <></>,
    title: "Kollam",
    link: "/",
  },
  {
    icon: <></>,
    title: "Pathanamthitta",
    link: "/",
  },
  {
    icon: <></>,
    title: "Alappuzha",
    link: "/",
  },
  {
    icon: <></>,
    title: "Kottayam",
    link: "/",
  },
  {
    icon: <></>,
    title: "Idukki",
    link: "/",
  },
  {
    icon: <></>,
    title: "Ernakulam",
    link: "/",
  },
  {
    icon: <></>,
    title: "Thrissur",
    link: "/",
  },
  {
    icon: <></>,
    title: "Palakkad",
    link: "/",
  },
  {
    icon: <></>,
    title: "Malappuram",
    link: "/",
  },
  {
    icon: <></>,
    title: "Kozhikode",
    link: "/",
  },
  {
    icon: <></>,
    title: "Wayanad",
    link: "/",
  },
  {
    icon: <></>,
    title: "Kannur",
    link: "/",
  },
  {
    icon: <></>,
    title: "Kasaragod",
    link: "/",
  },
];


export default function DistrictsPage() {
    const features = Districts;
    const fadeRef = useRef<HTMLHeadingElement>(null);
    useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);
    const row1 = features.slice(0, 6);
    const row2 = features.slice(6, 11);
    const row3 = features.slice(11, 14);

    return (
        <section id="features" className="py-12 lg:py-20  relative ">
            <div className="max-w-[1360px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }} className="heading flex flex-col items-center max-w-[500px] mx-auto mb-5">
                    <div className="flex items-center gap-2 text-site mb-3 uppercase text-xs lg:text-sm">
                        <Image
                            src="/favicon.png"
                            alt="Logo"
                            width={30}
                            height={30}
                            className="object-contain"
                        />
                        Experts All
                    </div>
                    <h2 ref={fadeRef} className="text-center fade-up-stagger text-3xl lg:text-[36px] font-medium mb-1 leading-tight text-site">
                        Explore by Property District
                    </h2>
                </motion.div>
                <div className="flex flex-col lg:gap-3 gap-2 bg-white rounded-2xl p-10 w-fit mx-auto">

                    <div
                        className="flex items-center justify-center flex-wrap lg:gap-3 gap-2  relative  ">
                        {row1.map((feature, index) => (
                            <motion.div
                                key={`${feature.title}-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div

                                    className="flex items-center gap-1 lg:gap-2 rounded-4xl p-[2px] text-white relative bg-[var(--siteColor)]"
                                >

                                    <span className="flex items-center justify-center bg-white rounded-full p-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >

                                            <path
                                                d="M12 2C8.686 2 6 4.686 6 8c0 4.418 4.5 9.5 5.43 10.55a1 1 0 0 0 1.14 0C13.5 17.5 18 12.418 18 8c0-3.314-2.686-6-6-6z"
                                                fill="#1a5867"
                                            />

                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="2.5"
                                                fill="#ffffffff"
                                            />
                                        </svg>

                                    </span>
                                    <h3 className="lg:text-[15px] text-[12px] lg:pr-4 pr-2 font-light">{feature.title}</h3>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div
                        className="flex items-center justify-center flex-wrap lg:gap-3 gap-2  relative  ">
                        {row2.map((feature, index) => (
                            <motion.div
                                key={`${feature.title}-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div

                                    className="flex items-center gap-1 lg:gap-2 rounded-4xl p-[2px] text-white relative bg-[var(--siteColor)]"
                                >

                                    <span className="flex items-center justify-center bg-white rounded-full p-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >

                                            <path
                                                d="M12 2C8.686 2 6 4.686 6 8c0 4.418 4.5 9.5 5.43 10.55a1 1 0 0 0 1.14 0C13.5 17.5 18 12.418 18 8c0-3.314-2.686-6-6-6z"
                                                fill="#1a5867"
                                            />

                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="2.5"
                                                fill="#ffffffff"
                                            />
                                        </svg>

                                    </span>
                                    <h3 className="lg:text-[15px] text-[12px] lg:pr-4 pr-2 font-light">{feature.title}</h3>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div
                        className="flex items-center justify-center flex-wrap lg:gap-3 gap-2  relative  ">
                        {row3.map((feature, index) => (
                           <motion.div
                                key={`${feature.title}-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div

                                    className="flex items-center gap-1 lg:gap-2 rounded-4xl p-[2px] text-white relative bg-[var(--siteColor)]"
                                >

                                    <span className="flex items-center justify-center bg-white rounded-full p-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >

                                            <path
                                                d="M12 2C8.686 2 6 4.686 6 8c0 4.418 4.5 9.5 5.43 10.55a1 1 0 0 0 1.14 0C13.5 17.5 18 12.418 18 8c0-3.314-2.686-6-6-6z"
                                                fill="#1a5867"
                                            />

                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="2.5"
                                                fill="#ffffffff"
                                            />
                                        </svg>

                                    </span>
                                    <h3 className="lg:text-[15px] text-[12px] lg:pr-4 pr-2 font-light">{feature.title}</h3>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


            </div>
        </section >
    );
}
