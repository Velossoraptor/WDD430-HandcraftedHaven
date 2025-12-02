import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { CartProvider } from "@/components/context/CartContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven Dashboard",
  description: "Seller dashboard and artisan marketplace.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // Extract user ID from session if available for CartProvider context
  const buyerId = session?.user?.id || session?.user?.sub || null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <SessionProvider session={session}>
          <CartProvider buyerId={buyerId}>
            <NavBar />
            <main>
              {children}
              <ToastContainer />
            </main>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
