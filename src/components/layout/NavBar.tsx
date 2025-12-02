'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function NavBar() {
  const { data: session, status } = useSession();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { cartCount } = useCartContext();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Handcrafted Haven
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Marketplace
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons - Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="flex space-x-3">
                <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <Link
                  href="/dashboard"
                  className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors font-medium text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition transition-background font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <div>
              <Link
                href="/cart"
                className="relative flex items-center gap-1 font-medium text-black"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 md:right-6 h-4 w-4 text-xs bg-amber-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow">
                    {cartCount}
                  </span>
                )}
                <span className="hidden md:block">Cart</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
            <div className="flex flex-col space-y-3">
              {/* Mobile Navigation Links */}
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                {status === "loading" ? (
                  <div className="space-y-2">
                    <div className="h-9 bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-9 bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                ) : session ? (
                  <div className="space-y-3">
                    <div className="px-3 py-2">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900">
                        {session.user?.name || session.user?.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block w-full bg-amber-500 text-white px-3 py-2 rounded-md text-center hover:bg-amber-600 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                      className="block w-full bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-center hover:bg-gray-300 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block w-full text-gray-700 border border-gray-300 px-3 py-2 rounded-md text-center hover:bg-gray-50 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full bg-amber-500 text-white px-3 py-2 rounded-md text-center hover:bg-amber-600 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}