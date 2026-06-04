import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://lilmoochi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lil Moochi — The Future of Boxing",
    template: "%s | Lil Moochi Boxing",
  },
  description:
    "5 years old. Unstoppable heart. Meet Lil Moochi, the youngest boxing prodigy taking the world by storm.",
  keywords: [
    "lil moochi",
    "boxing prodigy",
    "youth boxing",
    "junior boxing",
    "moochi boxing",
  ],
  authors: [{ name: "Lil Moochi" }],
  creator: "Lil Moochi",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Lil Moochi Boxing",
    title: "Lil Moochi — The Future of Boxing",
    description: "5 years old. Unstoppable heart. Watch the youngest boxing prodigy train, compete, and dominate.",
    images: [
      {
        url: "/images/IMG_1114.jpeg",
        width: 1600,
        height: 1236,
        alt: "Lil Moochi training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Moochi — The Future of Boxing",
    description: "5 years old. Unstoppable heart.",
    images: ["/images/IMG_1114.jpeg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <Analytics />
        <CartProvider>
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
