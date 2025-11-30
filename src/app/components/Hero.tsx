"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import Image from "next/image";
import ContactForm from "./ContactForm";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import Link from 'next/link';



const Hero = () => {
    const fadeRef = useRef<HTMLHeadingElement>(null);
    useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);

    return (
        <>
            <section className="bg-[url('/bg4.jpg')] bg-right-bottom bg-cover hero-section  bottom-shape overflow-hidden relative w-full md:min-h-[calc(100vh-150px)] rounded-[16px] flex flex-col justify-center items-center relative mt-[75px] lg:mt-[85px] lg:mt-[120px] pb-14 lg:pb-[70px] pt-14 lg:pt-[70px]">


                <div className="max-w-[1360px]   grid lg:grid-cols-2 gap-5 px-6">
                    <div className="py-6 lg:py-10 flex items-center">
                        <motion.div initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }} className="relative hero-text  text-white z-10 max-w-3xl  max-w-[700px]">

                            <div className="flex items-center gap-1 mb-3 uppercase text-sm">
                                 <Image src="/favicon.png" alt="Logo" width={30} height={30} className="object-contain" />
                                Get to Know Us
                            </div>
                            <h1 ref={fadeRef} className="fade-up-stagger text-3xl lg:text-[36px] xl:text-[56px] font-semibold mb-1 leading-tight">
                                Sail Into <span className="text-[var(--siteColor2)]">Smart Property</span> Deals
                              
                            </h1>
                            <p className="text-lg font-light max-w-[500px]">Experience luxury living with our premium properties. Enjoy special discounts and priority access for a limited time only.</p>

                            <div className="mt-4 lg:mt-5 flex items-center flex-wrap gap-6">
                                
                                <AnimatedButton  label="Buy a Property" className="w-fit" />
                                <AnimatedButton  label="Sell a Property" className="w-fit transparent-btn transparent-btn4" />

                                
                            </div>
                          

                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }} className="relative z-10 hidden">

                        <ContactForm />


                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Hero;
