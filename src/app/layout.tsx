import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julian.wiki",
  description: "Julian Picaza - Basque/Cuban-American creative technologist and systems designer known for bridging creative and technical domains across emerging technologies, product management, digital fabrication, and film/VFX production.",
  openGraph: {
    title: "Julian.wiki",
    description: "Julian Picaza - Creative technologist and systems designer bridging creative and technical domains",
    url: "https://julian.wiki",
    siteName: "Julian.wiki",
    images: [
      {
        url: "https://julian.wiki/lovable-uploads/86f0b0ce-1720-43fd-a784-ff699a4e7519.png",
        width: 1200,
        height: 1200,
        alt: "Julian Picaza - Portrait taken in 2020 by Catherine Just",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julian.wiki",
    description: "Julian Picaza - Creative technologist and systems designer",
    images: ["https://julian.wiki/lovable-uploads/86f0b0ce-1720-43fd-a784-ff699a4e7519.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
