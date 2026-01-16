// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

import { Toaster } from "react-hot-toast";
import SmoothScrollWrapper from "./SmoothScrollWrapper";

import Header from "./components/Header";
import { getPropertyTypes } from "../lib/getPropertyTypes";

export const metadata: Metadata = {
  title: "HooBuy",
  description: "HooBuy",
  keywords: "",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const propertyTypes = await getPropertyTypes();

  console.log("RootLayout propertyTypes length:", propertyTypes.length);

  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased mx-2 md:mx-5">
        {/* Render Header only here, always with propertyTypes */}
        <Header propertyTypes={propertyTypes} />

        <SmoothScrollWrapper>
          {children}
          <Toaster />
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
