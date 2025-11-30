"use client"
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { countriesData } from './data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero2 from "../components/Hero2";

const AllCountrysPage = () => {
    const [selectedLetter, setSelectedLetter] = useState('All');

    const groupedCountries = useMemo(() => {
        const sorted = [...countriesData].sort((a, b) => a.title.localeCompare(b.title));
        const grouped = sorted.reduce((acc, country) => {
            const firstLetter = country.title.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(country);
            return acc;
        }, {} as { [key: string]: typeof countriesData });
        return grouped;
    }, []);

    const sortedLetters = Object.keys(groupedCountries).sort();
    const alphabet = ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

    return (
        <>
            <Header />
            <Hero2
                heading_en="All Countries"
                breadcrumbPosition="left"
            />
            <section className="py-12 lg:py-20">
                <div className="max-w-[1360px] mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {alphabet.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => setSelectedLetter(letter)}
                                className={`lg:px-6 px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors cursor-pointer ${selectedLetter === letter ? 'bg-[var(--siteColor)] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>

                    {sortedLetters.map((letter) => {
                        if (selectedLetter === 'All' || selectedLetter === letter) {
                            return (
                                <div key={letter} id={letter} className="mb-10">
                                    <h2 className="text-md md:text-lg mb-6  bg-white  px-4 py-2 rounded-lg">{letter}</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                        {groupedCountries[letter].map((country) => (
                                            <Link href={`/countrys/${country.slug}`} key={country.slug}>
                                                <div className="flex flex-col items-center transition-all duration-300">
                                                    <div className="w-12 h-12 mb-3 relative">
                                                        <Image
                                                            src={country.logo}
                                                            alt={country.title}
                                                            layout="fill"
                                                            objectFit="contain"
                                                            className="h-12"
                                                        />
                                                    </div>
                                                    <h2 className="text-sm md:text-md font-medium text-center">{country.title}</h2>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AllCountrysPage;
