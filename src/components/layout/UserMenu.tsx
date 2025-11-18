// src/components/layout/UserMenu.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

// Mock Authentication State (same as in NavBar.tsx)
const userName = "Jane Doe (Artisan)";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Handle Log Out action (placeholder)
  const handleLogout = () => {
    setIsOpen(false);
    console.log("Logging out user...");
    // In a real app: call API to log out, then redirect to home/login
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          className="flex items-center p-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-150"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          <User className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="py-1">
            
            {/* User Info */}
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 font-semibold truncate">
              {userName}
            </div>

            {/* Menu Items */}
            <Link 
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LayoutDashboard className="w-4 h-4 mr-3 text-amber-600" />
              Seller Dashboard
            </Link>
            
            <Link 
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Settings className="w-4 h-4 mr-3 text-gray-500" />
              Profile & Settings
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              role="menuitem"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}