"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/AboutUs", label: "About us" },
  {
    label: "Properties",
    href: "#",
    submenu: [
      { href: "", label: "Residential" },
      { href: "", label: "Commercial" },
      { href: "", label: "Agricultural / Farmland" },
      { href: "", label: "Industrial" },
      { href: "", label: "Mixed- Others" },
      { href: "/Properties", label: "All Properties" },
    ],
  },
  { href: "/blogs", label: "Blogs" },
  { href: "/ContactUs", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();

  const handleMenuToggle = () => {
    if (open) {
      setAnimation("animate-menuSlideUp");
      setTimeout(() => {
        setOpen(false);
        setAnimation(null);
      }, 300);
    } else {
      setOpen(true);
      setAnimation("animate-menuSlideDown");
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      document.body.classList.add("index-page");
    } else {
      document.body.classList.remove("index-page");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "content-center fixed top-0 left-0 z-50 transition-colors duration-300 bg-nav mx-2 md:mx-5 w-[-webkit-fill-available]",
        scrolled ? "bg-nav-cover" : "",
        pathname === "/" ? "index" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {pathname === "/" && (
        <div className="w-full bg-[var(--siteColor)] hidden min-[1024px]:block rounded-b-[16px]">
          <div className="text-white grid grid-cols-2 items-center text-sm max-w-[1400px] mx-auto">
            <div className="h-full">
              <div className="h-full max-w-[700px] flex items-center space-x-6 top-header-left relative ml-auto px-6 py-2">
                <p className="font-light">Time to Unlock Your Perfect Property?</p>
                <a href="#" className="flex items-center space-x-2 font-bold pr-5">
                  Contact Us
                  <svg
                    className="ml-2"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.793 7.50002H2.5C2.36739 7.50002 2.24021 7.5527 2.14645 7.64647C2.05268 7.74024 2 7.86741 2 8.00002C2 8.13263 2.05268 8.25981 2.14645 8.35357C2.24021 8.44734 2.36739 8.50002 2.5 8.50002H11.793L8.146 12.146C8.05211 12.2399 7.99937 12.3672 7.99937 12.5C7.99937 12.6328 8.05211 12.7601 8.146 12.854C8.23989 12.9479 8.36722 13.0007 8.5 13.0007C8.63278 13.0007 8.76011 12.9479 8.854 12.854L13.354 8.35402C13.4006 8.30758 13.4375 8.2524 13.4627 8.19165C13.4879 8.13091 13.5009 8.06579 13.5009 8.00002C13.5009 7.93425 13.4879 7.86913 13.4627 7.80839C13.4375 7.74764 13.4006 7.69247 13.354 7.64602L8.854 3.14602C8.76011 3.05213 8.63278 2.99939 8.5 2.99939C8.36722 2.99939 8.23989 3.05213 8.146 3.14602C8.05211 3.23991 7.99937 3.36725 7.99937 3.50002C7.99937 3.6328 8.05211 3.76013 8.146 3.85402L11.793 7.50002Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="h-full">
              <div className="max-w-[700px] h-full flex items-center justify-end overflow-hidden gap-8 relative px-6">
                <div className="flex flex-row gap-4 relative h-full header-top-social items-center">
                  {/* social icons unchanged */}
                  {/* ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={
          "second-header w-full " +
          (scrolled
            ? "rounded-b-[16px] bg-white border-b border-b-[rgba(0,0,0,0.1)] "
            : "") +
          (pathname === "/" ? " rounded-t-[16px]" : "rounded-b-[16px]")
        }
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between md:px-6 px-3 h-[80px] main-header z-10 relative">
          <div className="text-2xl font-bold h-full align-content-center flex">
            <Link href="/" className="items-center flex">
              <img
                src="/logo.png"
                alt="Logo"
                width={160}
                height={50}
                className="w-[140px] lg:w-[160px]"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="items-center gap-6 hidden md:flex h-full">
            <nav className="hidden lg:flex gap-6 h-full">
              {navItems.map((item) =>
                item.submenu ? (
                  <div
                    key={`${item.label}-${item.href}`}
                    className="relative h-full flex items-center"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdowns((prev) => ({
                          ...prev,
                          [item.label]: !prev[item.label],
                        }))
                      }
                      className={`place-items-center h-full cursor-pointer flex transition-colors duration-300 font-light text-md menu-item ${
                        pathname === item.href ? "menu-active" : ""
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-300 ${
                          openDropdowns[item.label] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdowns[item.label] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl bg-white rounded-b-xl shadow-lg z-60"
                      >
                        <div className="p-6 grid grid-cols-3 gap-x-8 gap-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`block py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md px-4 ${
                                pathname === subItem.href
                                  ? "megamenu-active-tab"
                                  : ""
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={`place-items-center flex transition-colors duration-300 font-light text-md menu-item ${
                      pathname === item.href ? "menu-active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <AnimatedButton href="https://wa.me/12345678" label="Let's Chat" className="w-fit" />
            <button onClick={handleMenuToggle} className="lg:hidden text-black">
              {open ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mob-menu lg:hidden bg-[var(--background2)] font-light px-4 pt-8 pb-20 shadow-md transition-all duration-300 origin-top ${
            animation || ""
          }`}
        >
          {navItems.map((item) =>
            item.submenu ? (
              <div key={item.label} className="p-2">
                <div
                  className="flex justify-between items-center"
                  onClick={() =>
                    setOpenDropdowns((prev) => ({
                      ...prev,
                      [item.label]: !prev[item.label],
                    }))
                  }
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-300 ${
                      openDropdowns[item.label] ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openDropdowns[item.label] && (
                  <div className="pl-1 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`block p-2 rounded-lg ${
                          pathname === subItem.href ? "megamenu-active-tab" : ""
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`block hover:text-[var(--siteColor)] p-2 rounded-lg ${
                  pathname === item.href ? "text-[var(--siteColor)] megamenu-active-tab" : ""
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </motion.div>
      )}
    </header>
  );
}
