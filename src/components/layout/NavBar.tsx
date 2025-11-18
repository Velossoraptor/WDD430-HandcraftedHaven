// src/components/layout/NavBar.tsx (UPDATED)
'use client';

import Link from 'next/link';
import { ShoppingBag, Home, Info, LogIn } from 'lucide-react';
import UserMenu from './UserMenu'; // 

// Mock Authentication State
const isAuthenticated = true; //

// Define the structure for the public links
const publicLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop All', href: '/shop', icon: ShoppingBag },
  { name: 'About Us', href: '/about', icon: Info },
];

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Branding/Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition">
              Handcrafted Haven
            </Link>
          </div>

          {/* Main Navigation Links (Desktop) */}
          <div className="hidden md:flex md:space-x-8">
            {publicLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150"
              >
                <item.icon className="w-4 h-4 mr-1" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth/Dashboard Links (Right Side) */}
          <div className="flex items-center">
            {isAuthenticated ? (
              // 💡 New User Menu Dropdown
              <UserMenu />
            ) : (
              <Link
                href="/login"
                className="flex items-center text-gray-600 hover:text-amber-600 border border-gray-300 hover:border-amber-600 py-1.5 px-3 rounded-md text-sm font-medium transition duration-150"
              >
                <LogIn className="w-4 h-4 mr-1" aria-hidden="true" />
                Log In
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}