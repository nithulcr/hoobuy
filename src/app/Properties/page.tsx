"use client";
import React, { useRef } from "react";
import { useStaggeredFadeUp } from "../components/useStaggeredFadeUp";


import Header from "../components/Header";
import Hero2 from "../components/Hero2";
import AllProperties from "../components/AllProperties";



import Footer from "../components/Footer";





export default function Properties() {
  const fadeRef = useRef<HTMLHeadingElement>(null);
  useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);
  return (
    <>
      <Header />
      <Hero2
        heading_en="Our Properties"
        breadcrumbPosition="left"
      />
      
      
      <AllProperties />
      <Footer />

    </>
  );
}
