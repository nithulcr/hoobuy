"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BodyClassManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    const lowerPath = pathname.toLowerCase();
    const needsClass =
      lowerPath.startsWith("/blogs/") || lowerPath.startsWith("/properties/");

    if (needsClass) {
      body.classList.add("bg-header-main");
    } else {
      body.classList.remove("bg-header-main");
    }

    // Cleanup function to remove the class when the component unmounts
    // or before the next effect runs.
    return () => {
      body.classList.remove("bg-header-main");
    };
  }, [pathname]);

  return null;
};

export default BodyClassManager;
