"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import type { PropertyTypeTerm } from "../../lib/getPropertyTypes";


type HeaderProps = {
  propertyTypes?: PropertyTypeTerm[]; // optional
};

export default function Header({ propertyTypes = [] }: HeaderProps) {
  console.log("Header propertyTypes:", propertyTypes);
  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  const closeMenu = () => {
    setOpenDropdowns({});
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Also check if the click is on the menu toggle button
        const target = event.target as HTMLElement;
        if (!target.closest('button') || !target.closest('button')?.isSameNode(document.querySelector('.lg\\:hidden'))) {
          closeMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  

  

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

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, searchParams]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/AboutUs", label: "About us" },
    {
      label: "Properties",
      href: "#",
      submenu: [
        { href: "/Properties", label: "All Properties" },
        ...propertyTypes.map((term) => ({
          href: `/Properties?type=${encodeURIComponent(term.slug)}`,
          label: term.name,
        })),
      ],

    },
    { href: "/blogs", label: "Blogs" },
    { href: "/ContactUs", label: "Contact Us" },
  ];
  // ------------------------------------------------------------------

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
                <a href="tel:7293335555" className="flex items-center space-x-2 font-bold pr-5">
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

                  <a href="https://x.com" aria-label="X" target="_blank" rel="noopener noreferrer" className="w-5 h-5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.9281 12.1257C23.9281 5.68565 18.7015 0.458984 12.2615 0.458984C5.82147 0.458984 0.594803 5.68565 0.594803 12.1257C0.594803 17.7723 4.60814 22.474 9.92814 23.559V15.6257H7.5948V12.1257H9.92814V9.20899C9.92814 6.95732 11.7598 5.12565 14.0115 5.12565H16.9281V8.62565H14.5948C13.9531 8.62565 13.4281 9.15065 13.4281 9.79232V12.1257H16.9281V15.6257H13.4281V23.734C19.3198 23.1507 23.9281 18.1807 23.9281 12.1257Z" fill="white" />
                    </svg>

                  </a>
                  <a href="https://x.com" aria-label="X" target="_blank" rel="noopener noreferrer" className="w-5 h-5">
                    <svg width="18" height="18" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.028 0.977539C12.153 0.980539 12.724 0.986539 13.217 1.00054L13.411 1.00754C13.635 1.01554 13.856 1.02554 14.123 1.03754C15.187 1.08754 15.913 1.25554 16.55 1.50254C17.21 1.75654 17.766 2.10054 18.322 2.65554C18.8307 3.15527 19.2242 3.76001 19.475 4.42754C19.722 5.06454 19.89 5.79054 19.94 6.85554C19.952 7.12154 19.962 7.34254 19.97 7.56754L19.976 7.76154C19.991 8.25354 19.997 8.82454 19.999 9.94954L20 10.6955V12.0055C20.0024 12.7349 19.9948 13.4643 19.977 14.1935L19.971 14.3875C19.963 14.6125 19.953 14.8335 19.941 15.0995C19.891 16.1645 19.721 16.8895 19.475 17.5275C19.2242 18.1951 18.8307 18.7998 18.322 19.2995C17.8223 19.8082 17.2175 20.2017 16.55 20.4525C15.913 20.6995 15.187 20.8675 14.123 20.9175L13.411 20.9475L13.217 20.9535C12.724 20.9675 12.153 20.9745 11.028 20.9765L10.282 20.9775H8.97299C8.24325 20.9801 7.51351 20.9724 6.78399 20.9545L6.58999 20.9485C6.3526 20.9395 6.11526 20.9292 5.87799 20.9175C4.81399 20.8675 4.08799 20.6995 3.44999 20.4525C2.78282 20.2016 2.17843 19.8081 1.67899 19.2995C1.16993 18.7999 0.776098 18.1952 0.524989 17.5275C0.277989 16.8905 0.109989 16.1645 0.0599889 15.0995L0.0299889 14.3875L0.0249891 14.1935C0.0065551 13.4644 -0.00177913 12.735 -1.1037e-05 12.0055V9.94954C-0.00277893 9.22014 0.00455518 8.49074 0.021989 7.76154L0.028989 7.56754C0.036989 7.34254 0.046989 7.12154 0.058989 6.85554C0.108989 5.79054 0.276989 5.06554 0.523989 4.42754C0.775683 3.75974 1.17021 3.15498 1.67999 2.65554C2.17914 2.14709 2.78318 1.75361 3.44999 1.50254C4.08799 1.25554 4.81299 1.08754 5.87799 1.03754C6.14399 1.02554 6.36599 1.01554 6.58999 1.00754L6.78399 1.00154C7.51318 0.983772 8.24258 0.976104 8.97199 0.978539L11.028 0.977539ZM9.99999 5.97754C8.67391 5.97754 7.40214 6.50432 6.46446 7.44201C5.52677 8.37969 4.99999 9.65146 4.99999 10.9775C4.99999 12.3036 5.52677 13.5754 6.46446 14.5131C7.40214 15.4508 8.67391 15.9775 9.99999 15.9775C11.3261 15.9775 12.5978 15.4508 13.5355 14.5131C14.4732 13.5754 15 12.3036 15 10.9775C15 9.65146 14.4732 8.37969 13.5355 7.44201C12.5978 6.50432 11.3261 5.97754 9.99999 5.97754ZM9.99999 7.97754C10.394 7.97747 10.7841 8.05501 11.1481 8.20571C11.5121 8.35641 11.8428 8.57734 12.1215 8.85587C12.4001 9.13439 12.6211 9.46508 12.7719 9.82903C12.9228 10.193 13.0004 10.5831 13.0005 10.977C13.0006 11.371 12.923 11.7611 12.7723 12.1251C12.6216 12.4891 12.4007 12.8199 12.1222 13.0985C11.8436 13.3771 11.513 13.5982 11.149 13.749C10.785 13.8998 10.395 13.9775 10.001 13.9775C9.20534 13.9775 8.44228 13.6615 7.87967 13.0989C7.31706 12.5363 7.00099 11.7732 7.00099 10.9775C7.00099 10.1819 7.31706 9.41883 7.87967 8.85622C8.44228 8.29361 9.20534 7.97754 10.001 7.97754M15.251 4.47754C14.9195 4.47754 14.6015 4.60924 14.3671 4.84366C14.1327 5.07808 14.001 5.39602 14.001 5.72754C14.001 6.05906 14.1327 6.377 14.3671 6.61142C14.6015 6.84584 14.9195 6.97754 15.251 6.97754C15.5825 6.97754 15.9005 6.84584 16.1349 6.61142C16.3693 6.377 16.501 6.05906 16.501 5.72754C16.501 5.39602 16.3693 5.07808 16.1349 4.84366C15.9005 4.60924 15.5825 4.47754 15.251 4.47754Z" fill="white" />
                    </svg>

                  </a>
                  <a href="https://www.instagram.com/safe handsuae/" aria-label="X" target="_blank" rel="noopener noreferrer" className="w-5 h-5">
                    <svg width="18" height="18" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1036_725)">
                        <mask id="mask0_1036_725" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="19">
                          <path d="M0 0.977539H18V18.9775H0V0.977539Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_1036_725)">
                          <path d="M14.175 1.82129H16.9354L10.9054 8.73072L18 18.1344H12.4457L8.09229 12.4323L3.11657 18.1344H0.353571L6.80271 10.7416L0 1.82257H5.69571L9.62486 7.03357L14.175 1.82129ZM13.2043 16.4784H14.7343L4.86 3.39115H3.21943L13.2043 16.4784Z" fill="white" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_1036_725">
                          <rect width="18" height="18" fill="white" transform="translate(0 0.977539)" />
                        </clipPath>
                      </defs>
                    </svg>

                  </a>
                  <a href="https://linkedin.com" aria-label="Linkedin" target="_blank" rel="noopener noreferrer" className="w-5 h-5">
                    <svg width="24" height="24" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15 0.977539C15.7956 0.977539 16.5587 1.29361 17.1213 1.85622C17.6839 2.41883 18 3.18189 18 3.97754V15.9775C18 16.7732 17.6839 17.5363 17.1213 18.0989C16.5587 18.6615 15.7956 18.9775 15 18.9775H3C2.20435 18.9775 1.44129 18.6615 0.87868 18.0989C0.316071 17.5363 0 16.7732 0 15.9775V3.97754C0 3.18189 0.316071 2.41883 0.87868 1.85622C1.44129 1.29361 2.20435 0.977539 3 0.977539H15ZM5 7.97754C4.73478 7.97754 4.48043 8.0829 4.29289 8.27043C4.10536 8.45797 4 8.71232 4 8.97754V13.9775C4 14.2428 4.10536 14.4971 4.29289 14.6846C4.48043 14.8722 4.73478 14.9775 5 14.9775C5.26522 14.9775 5.51957 14.8722 5.70711 14.6846C5.89464 14.4971 6 14.2428 6 13.9775V8.97754C6 8.71232 5.89464 8.45797 5.70711 8.27043C5.51957 8.0829 5.26522 7.97754 5 7.97754ZM8 6.97754C7.73478 6.97754 7.48043 7.0829 7.29289 7.27043C7.10536 7.45797 7 7.71232 7 7.97754V13.9775C7 14.2428 7.10536 14.4971 7.29289 14.6846C7.48043 14.8722 7.73478 14.9775 8 14.9775C8.26522 14.9775 8.51957 14.8722 8.70711 14.6846C8.89464 14.4971 9 14.2428 9 13.9775V10.3175C9.305 9.97354 9.82 9.56954 10.393 9.32454C10.726 9.18254 11.227 9.12454 11.575 9.23454C11.6904 9.26383 11.7933 9.3298 11.868 9.42254C11.92 9.49254 12 9.64854 12 9.97754V13.9775C12 14.2428 12.1054 14.4971 12.2929 14.6846C12.4804 14.8722 12.7348 14.9775 13 14.9775C13.2652 14.9775 13.5196 14.8722 13.7071 14.6846C13.8946 14.4971 14 14.2428 14 13.9775V9.97754C14 9.30754 13.83 8.71154 13.476 8.23354C13.1503 7.8001 12.6944 7.48226 12.175 7.32654C11.273 7.04354 10.274 7.20054 9.607 7.48654C9.39347 7.57838 9.18545 7.68256 8.984 7.79854C8.94208 7.56813 8.82062 7.35974 8.6408 7.2097C8.46097 7.05967 8.23419 6.9775 8 6.97754ZM5 4.97754C4.73478 4.97754 4.48043 5.0829 4.29289 5.27043C4.10536 5.45797 4 5.71232 4 5.97754C4 6.24276 4.10536 6.49711 4.29289 6.68465C4.48043 6.87218 4.73478 6.97754 5 6.97754C5.26522 6.97754 5.51957 6.87218 5.70711 6.68465C5.89464 6.49711 6 6.24276 6 5.97754C6 5.71232 5.89464 5.45797 5.70711 5.27043C5.51957 5.0829 5.26522 4.97754 5 4.97754Z" fill="white" />
                    </svg>

                  </a>


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
          {/* Logo */}
          <div className="text-2xl font-bold h-full align-content-center flex">
            <Link href="/" className="items-center flex">
              <Image
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
                    ref={dropdownRef}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdowns((prev) => ({
                          ...prev,
                          [item.label]: !prev[item.label],
                        }))
                      }
                      className={`place-items-center h-full cursor-pointer flex transition-colors duration-300 font-light text-md menu-item ${pathname === item.href ? "menu-active" : ""
                        }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-300 ${openDropdowns[item.label] ? "rotate-180" : ""
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
                              onClick={() => setOpenDropdowns({})}
                              className={`block py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md px-4 ${
                                subItem.href ===
                                `${pathname}?type=${searchParams.get("type")}`
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
                    className={`place-items-center flex transition-colors duration-300 font-light text-md menu-item ${pathname === item.href ? "menu-active" : ""
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
            <AnimatedButton
              href="https://wa.me/7293335555"
              label="Let's Chat"
              className="w-fit"
            />
            <button onClick={handleMenuToggle} className="lg:hidden text-black">
              {open ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          ref={mobileMenuRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mob-menu lg:hidden bg-[var(--background2)] font-light px-4 pt-8 pb-20 shadow-md transition-all duration-300 origin-top ${animation || ""
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
                    className={`ml-1 transition-transform duration-300 ${openDropdowns[item.label] ? "rotate-180" : ""
                      }`}
                  />
                </div>
                {openDropdowns[item.label] && (
                  <div className="pl-1 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={closeMenu}
                        className={`block p-2 rounded-lg ${
                          pathname === subItem.href &&
                          searchParams.get("type") ===
                            new URLSearchParams(subItem.href.split("?")[1]).get("type")
                            ? "megamenu-active-tab"
                            : ""
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
                onClick={closeMenu}
                className={`block hover:text-[var(--siteColor)] p-2 rounded-lg ${pathname === item.href
                  ? "text-[var(--siteColor)] megamenu-active-tab"
                  : ""
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
