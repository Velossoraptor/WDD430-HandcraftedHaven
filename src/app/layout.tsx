import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import { CartProvider } from "@/components/context/CartContext";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { verifySession } from "@/_lib/session";

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
  // Extract user ID from session if available for CartProvider context
  const session = await verifySession();

  const buyerId = session?.id;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <CartProvider buyerId={buyerId}>
          <NavBar />
          <main>
            {children}
            <ToastContainer />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
