import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "52Startup | Make India Great Again",
  description: "52 Startups. 52 Weeks. One Mission. Building the future of India, one week at a time.",
  keywords: ["Startup", "India", "Entrepreneurship", "Build in Public", "52 startups in 52 weeks"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans tracking-tight">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
