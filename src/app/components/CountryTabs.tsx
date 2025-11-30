"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';

const Countrys = [
  { href: "/countrys/france-certificate-attestation", label: "France Certificate Attestation" },
  { href: "/countrys/australia-certificate-attestation", label: "Australia Certificate Attestation" },
  { href: "/countrys/lebanon-certificate-attestation", label: "Lebanon Certificate Attestation" },
  { href: "/countrys/bvi-certificate-attestation", label: "BVI Certificate Attestation" },
  { href: "/countrys/russia-certificate-attestation", label: "Russia Certificate Attestation" },
  { href: "/countrys/spain-certificate-attestation", label: "Spain Certificate Attestation" },
  { href: "/countrys/portugal-certificate-attestation", label: "Portugal Certificate Attestation" },
  { href: "/countrys/uk-certificate-attestation", label: "UK Certificate Attestation" },
  { href: "/countrys/usa-certificate-attestation", label: "USA Certificate Attestation" },
  { href: "/countrys/canada-certificate-attestation", label: "Canada Certificate Attestation" },
  { href: "/countrys/italy-certificate-attestation", label: "Italy Certificate Attestation" },
  { href: "/countrys/india-certificate-attestation", label: "India Certificate Attestation" },
  { href: "/countrys/sri-lanka-certificate-attestation", label: "Sri Lanka Certificate Attestation" },
  { href: "/countrys/uae-certificate-attestation", label: "UAE Certificate Attestation" },
  { href: "/countrys/germany-certificate-attestation", label: "Germany Certificate Attestation" },
  { href: "/countrys/philippines-certificate-attestation", label: "Philippines Certificate Attestation" },
  { href: "/countrys/pakistan-certificate-attestation", label: "Pakistan Certificate Attestation" },
  { href: "/countrys/bangladesh-certificate-attestation", label: "Bangladesh Certificate Attestation" },
  { href: "/countrys/nepal-certificate-attestation", label: "Nepal Certificate Attestation" },
  { href: "/countrys/afghanistan-certificate-attestation", label: "Afghanistan Certificate Attestation" },
  { href: "/countrys/south-africa-certificate-attestation", label: "South Africa Certificate Attestation" },
  { href: "/countrys/kenya-certificate-attestation", label: "Kenya Certificate Attestation" },
  { href: "/countrys/nigeria-certificate-attestation", label: "Nigeria Certificate Attestation" },
  { href: "/countrys/egypt-certificate-attestation", label: "Egypt Certificate Attestation" },
  { href: "/countrys/jordan-certificate-attestation", label: "Jordan Certificate Attestation" },
  { href: "/countrys/turkey-certificate-attestation", label: "Turkey Certificate Attestation" },
  { href: "/countrys/qatar-certificate-attestation", label: "Qatar Certificate Attestation" },
  { href: "/countrys/oman-certificate-attestation", label: "Oman Certificate Attestation" },
  { href: "/countrys/bahrain-certificate-attestation", label: "Bahrain Certificate Attestation" },
  { href: "/countrys/kuwait-certificate-attestation", label: "Kuwait Certificate Attestation" },
  { href: "/countrys/china-certificate-attestation", label: "China Certificate Attestation" },
  { href: "/countrys/hong-kong-certificate-attestation", label: "Hong Kong Certificate Attestation" },
  { href: "/countrys/malaysia-certificate-attestation", label: "Malaysia Certificate Attestation" },
  { href: "/countrys/singapore-certificate-attestation", label: "Singapore Certificate Attestation" },
  { href: "/countrys/indonesia-certificate-attestation", label: "Indonesia Certificate Attestation" },
  { href: "/countrys/thailand-certificate-attestation", label: "Thailand Certificate Attestation" },
  { href: "/countrys/japan-certificate-attestation", label: "Japan Certificate Attestation" },
  { href: "/countrys/south-korea-certificate-attestation", label: "South Korea Certificate Attestation" },
  { href: "/countrys/netherlands-certificate-attestation", label: "Netherlands Certificate Attestation" },
  { href: "/countrys/belgium-certificate-attestation", label: "Belgium Certificate Attestation" },
  { href: "/countrys/switzerland-certificate-attestation", label: "Switzerland Certificate Attestation" },
  { href: "/countrys/sweden-certificate-attestation", label: "Sweden Certificate Attestation" },
  { href: "/countrys/denmark-certificate-attestation", label: "Denmark Certificate Attestation" },
  { href: "/countrys/austria-certificate-attestation", label: "Austria Certificate Attestation" },
  { href: "/countrys/norway-certificate-attestation", label: "Norway Certificate Attestation" },
  { href: "/countrys/poland-certificate-attestation", label: "Poland Certificate Attestation" },
  { href: "/countrys/romania-certificate-attestation", label: "Romania Certificate Attestation" },
  { href: "/countrys/greece-certificate-attestation", label: "Greece Certificate Attestation" },
  { href: "/countrys/cyprus-certificate-attestation", label: "Cyprus Certificate Attestation" },
  { href: "/countrys/brazil-certificate-attestation", label: "Brazil Certificate Attestation" },
  { href: "/countrys/mexico-certificate-attestation", label: "Mexico Certificate Attestation" }
];

export default function CountryTabs() {
    const pathname = usePathname();
    const [showAll, setShowAll] = useState(false);
    
    // Persist showAll state in localStorage to survive navigation
    useEffect(() => {
        const savedShowAll = localStorage.getItem('showAllCountries');
        if (savedShowAll === 'true') {
            setShowAll(true);
        }
    }, []);
    
    const toggleShowAll = () => {
        const newShowAll = !showAll;
        setShowAll(newShowAll);
        localStorage.setItem('showAllCountries', newShowAll.toString());
    };
    
    // Sort countries alphabetically by label
    const sortedCountrys = [...Countrys].sort((a, b) => 
        a.label.localeCompare(b.label)
    );
    
    // First 20 countries or all if showAll is true
    const displayCountrys = showAll ? sortedCountrys : sortedCountrys.slice(0, 20);
    
    return (
        <div className="pt-5 lg:pt-0 flex flex-col gap-5">
            <div className="bg-[var(--siteColor)] p-6 lg:p-8 rounded-[24px] hidden lg:block">
                <h4 className='text-2xl font-normal text-white mb-5'>Country</h4>
                <div className="flex items-center flex-wrap gap-3 ">
                    {displayCountrys.map((Country) => (
                        <Link 
                            key={Country.href} 
                            href={Country.href}
                            className={`px-4 py-3 rounded-[10px] flex items-center text-sm lg:text-[16px] gap-2 justify-between w-full ${pathname === Country.href ? 'bg-[#036072] active-service text-white' : 'bg-white'}`}
                        >
                            {Country.label}
                            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.6378 13.125H4.375C4.14294 13.125 3.92038 13.2172 3.75628 13.3813C3.59219 13.5454 3.5 13.7679 3.5 14C3.5 14.2321 3.59219 14.4546 3.75628 14.6187C3.92038 14.7828 4.14294 14.875 4.375 14.875H20.6378L14.2555 21.2555C14.0912 21.4198 13.9989 21.6426 13.9989 21.875C13.9989 22.1074 14.0912 22.3302 14.2555 22.4945C14.4198 22.6588 14.6426 22.7511 14.875 22.7511C15.1074 22.7511 15.3302 22.6588 15.4945 22.4945L23.3695 14.6195C23.451 14.5382 23.5156 14.4417 23.5597 14.3354C23.6039 14.2291 23.6266 14.1151 23.6266 14C23.6266 13.8849 23.6039 13.771 23.5597 13.6646C23.5156 13.5583 23.451 13.4618 23.3695 13.3805L15.4945 5.50551C15.3302 5.3412 15.1074 5.2489 14.875 5.2489C14.6426 5.2489 14.4198 5.3412 14.2555 5.50551C14.0912 5.66981 13.9989 5.89265 13.9989 6.12501C13.9989 6.35736 14.0912 6.58021 14.2555 6.74451L20.6378 13.125Z" fill="black" />
                            </svg>
                        </Link>
                    ))}
                </div>
                
                <div className="mt-4">
                    <button
                        onClick={toggleShowAll}
                        className="bg-white/20 w-full cursor-pointer hover:bg-white/30 text-white px-6 py-3 rounded-[10px] text-sm font-medium transition-all duration-200"
                    >
                        {showAll ? 'View less countries' : `View all countries (${Countrys.length - 20} more)`}
                    </button>
                </div>
            </div>
            
            <a className="bg-[var(--siteColor)] px-6 py-4 lg:px-8 lg:py-5 rounded-[24px] text-white flex items-center justify-between gap-4">
                <span className='flex-none text-xl'>Get a quote</span>
                <Image
                    src="/whatsapp.png"
                    alt="Get a quote via WhatsApp"
                    width={50}
                    height={50}
                    className="object-contain w-8 h-8"
                />
            </a>
        </div>
    );
}
