'use client';

import { useState, useEffect } from "react";
import Preloader from "./Preloader";
import Header from "./Header";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import FeaturedProperty from "./FeaturedProperty";
import FeaturedProperty2 from "./FeaturedProperty2";
import ProjectScroller from "./ProjectScroller";




import Features from "./Features";
import Services from "./Services";


import Countrys from "./Countrys";
import Testimonials from "./Testimonials";
import Process from "./Process";


import Footer from "./Footer";

export default function HomePageClient() {
  const [showContent, setShowContent] = useState(false);
  const [shouldShowPreloader, setShouldShowPreloader] = useState(true);

  useEffect(() => {
    console.log("HomePageClient mounted");
    if (typeof window !== 'undefined' && sessionStorage.getItem("hasSeenPreloader")) {
      console.log("hasSeenPreloader is true, not showing preloader");
      setShouldShowPreloader(false);
      setShowContent(true); // Immediately show content if preloader not needed
    } else {
      console.log("hasSeenPreloader is false, showing preloader");
    }
  }, []);

  const handlePreloaderComplete = () => {
    console.log("Preloader complete, setting hasSeenPreloader to true");
    sessionStorage.setItem("hasSeenPreloader", "true");
    setShouldShowPreloader(false);
    setShowContent(true);
  };

  return (
    <div>
      {shouldShowPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {showContent && (
        <>
         
          <Hero />
          <AboutSection />
          <FeaturedProperty />
          <ProjectScroller />
          <FeaturedProperty2 />
          <Features />
          <Services />
          <Countrys />
          <Testimonials />
          <Process />
          <Footer />
        </>
      )}
    </div>
  );
}
