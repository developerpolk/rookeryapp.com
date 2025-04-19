import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rookery",
  description: "Join the waitlist for Rookery — the app that helps you remember your network before you need it.",
  openGraph: {
    title: "Rookery",
    description: "Join the waitlist for Rookery — one month of premium free for early signups.",
    url: "https://rookeryapp.com",
    siteName: "Rookery",
    images: [
      {
        url: "https://rookeryapp.com/preview.png", // Optional image preview
        width: 1200,
        height: 630,
        alt: "Rookery Waitlist",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rookery",
    description: "Join the waitlist for Rookery — the app that helps you remember your network.",
    images: ["https://rookeryapp.com/preview.png"],
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
        <Toaster position="bottom-right"/>
        {children}
        <Analytics /> 
        <SpeedInsights/>
      </body>
    </html>
  );
}
