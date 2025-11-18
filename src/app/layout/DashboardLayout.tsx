import React from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory (./Sidebar.tsx)


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    // Main container setup: min-h-screen ensures it takes up full screen height
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* 🧭 1. Sidebar */}
      {/* Sidebar component handles its own responsive hiding/showing */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-x-hidden">
        
        {/* 👤 2. Header (Top Navigation/User Info/Mobile Menu Toggle) */}
        {/* We will build this next, but it belongs here */}
        {/* <Header /> */} 
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-100 p-4 md:px-10 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Handcrafted Haven Seller</h1>
            {/* Placeholder for User Profile/Notifications */}
            <div className="text-gray-600">User Menu Placeholder</div>
        </header>

        {/* 💻 3. Main Content Area */}
        {/* flex-1 ensures the content area takes up all remaining vertical space */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}