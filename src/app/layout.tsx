// src/app/layout.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

import { getPropertyTypes } from "../lib/getPropertyTypes";
import BodyClassManager from "./components/BodyClassManager";
import Header from "./components/Header";
import SmoothScrollWrapper from "./SmoothScrollWrapper";
import "./globals.css";

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

  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased mx-2 md:mx-5`}>
        <BodyClassManager />
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
