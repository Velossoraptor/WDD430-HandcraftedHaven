'use client'; // Required for usePathname

import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Package, Star, Settings, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

// --- Navigation Links Structure (same as before) ---
const navItems = [
  { 
    name: 'Dashboard Overview', 
    href: '/dashboard', 
    icon: LayoutDashboard,
  },
  { 
    name: 'Product Listings', 
    href: '/dashboard/products', 
    icon: ShoppingBag, 
  },
  { 
    name: 'Orders & Fulfillment', 
    href: '/dashboard/orders', 
    icon: Package, 
  },
  { 
    name: 'Reviews & Ratings', 
    href: '/dashboard/reviews', 
    icon: Star, 
  },
];

const secondaryItems = [
  { 
    name: 'Seller Profile', 
    href: '/dashboard/profile', 
    icon: User, 
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings, 
  },
];

// --- Component ---
export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-4 shadow-xl shrink-0">
      
      {/* 🌟 Branding/Logo Area */}
      <div className="flex items-center h-16 border-b border-gray-700 mb-6 px-2">
        <span className="text-2xl font-bold text-amber-400">Handcrafted Haven</span>
      </div>

      <nav className="flex-1 space-y-8" aria-label="Main Dashboard Navigation">
        
        {/* Primary Links */}
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                {/* 🟢 FIX: Moved styling to Link and removed <a> tag */}
                <Link 
                  href={item.href}
                  className={`
                    flex items-center p-3 rounded-lg transition duration-150 group
                    ${active 
                      ? 'bg-amber-600 text-white font-semibold shadow-md' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  <item.icon 
                    className="w-5 h-5 mr-4" 
                    aria-hidden="true" 
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Separator and Secondary Links */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Account
          </p>
          <ul className="space-y-2">
            {secondaryItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  {/* 🟢 FIX: Moved styling to Link and removed <a> tag */}
                  <Link 
                    href={item.href}
                    className={`
                      flex items-center p-3 rounded-lg transition duration-150 group text-sm
                      ${active 
                        ? 'bg-amber-600 text-white font-semibold' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                    aria-current={active ? 'page' : undefined}
                  >
                    <item.icon 
                      className="w-4 h-4 mr-4" 
                      aria-hidden="true" 
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 🚪 Footer (e.g., Logout or Help) */}
      <div className="mt-8 border-t border-gray-700 pt-4">
          <button className="flex items-center w-full p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition duration-150">
            Log Out
          </button>
      </div>

    </div>
  );
}