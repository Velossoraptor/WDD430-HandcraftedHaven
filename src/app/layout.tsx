import type { Metadata } from "next";
// Assuming Geist fonts are correctly configured
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";

// 💡 Import the NavBar component
import NavBar from '@/components/layout/NavBar'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven Dashboard", // Updated title
  description: "Seller dashboard and artisan marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        {/* 1. The NavBar is placed here to appear on every page */}
        <NavBar /> 
        
        {/* 2. The main page content */}
        <main>
            {children}
        </main>
        
      </body>
    </html>
  );
}