import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

import { Toaster } from 'react-hot-toast';
import SmoothScrollWrapper from "./SmoothScrollWrapper";

export const metadata: Metadata = {
  title: 'HooBuy',
  description: 'HooBuy',
  keywords: '',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className="antialiased mx-2 md:mx-5">


        <SmoothScrollWrapper>
          {children}
          <Toaster />
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
