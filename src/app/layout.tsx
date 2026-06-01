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
  title: 'Lil Moochi — The Future of Boxing',
  description: '5 years old. Unstoppable heart. Meet Lil Moochi, the youngest boxing prodigy taking the world by storm.',
  openGraph: {
    title: 'Lil Moochi — The Future of Boxing',
    description: '5 years old. Unstoppable heart.',
    url: 'https://lilmoochi.com',
    siteName: 'Lil Moochi',
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
