'use client';

import { Menu, Search, Bell, UserCircle } from 'lucide-react';
import React from 'react';


export default function Header() { 

  
  return (
    // Header for the main content area
    <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between shrink-0">
      
      {/* 📱 Mobile Menu Toggle (Visible on smaller screens) */}
      <button 
        className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
        aria-label="Toggle navigation menu"
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* 🔎 Search Bar */}
      <div className="hidden sm:flex-1 sm:max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          <input 
            type="search"
            placeholder="Search listings, orders, or customers..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-amber-500 transition duration-150"
            aria-label="Search dashboard"
          />
        </div>
      </div>
      
      {/* 🔔 User Actions and Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        
        {/* Notifications */}
        <button 
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition relative"
          aria-label="View notifications"
        >
          <Bell className="w-6 h-6" aria-hidden="true" />
          {/* Unread indicator */}
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" aria-hidden="true"></span>
        </button>

        {/* User Profile / Menu */}
        <button 
          className="flex items-center space-x-2 text-gray-700 hover:text-amber-700 transition"
          aria-label="Open user profile menu"
        >
          <UserCircle className="w-8 h-8 text-gray-400" aria-hidden="true" />
          <span className="hidden sm:block text-sm font-medium">Artisan User</span>
        </button>
      </div>
    </header>
  );
}