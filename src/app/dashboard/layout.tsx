"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
/*********** Lucid icon***********/
import { X, Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuClick = () => {
    setMenuOpen((open) => !open);
  };

  // Close menu on route change (good for mobile UX)
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [pathname, menuOpen]);

  const navLinks = [
    { label: "Overview", href: "/dashboard" }, // Assumes root /dashboard is the overview
    { label: "Products", href: "/dashboard/products" },
    { label: "Orders", href: "/dashboard/orders" },
    { label: "Reviews", href: "/dashboard/reviews" },
    { label: "Profile", href: "/dashboard/profile" },
    { label: "Billing", href: "/dashboard/billing" },
    { label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* -------------------- Sidebar Container -------------------- */}
      <aside className="relative">
        {/* Mobile Menu Toggle (Visible only on small screens) */}
        <span
          aria-label="Open menu"
          onClick={handleMenuClick}
          className="lg:hidden cursor-pointer fixed right-4 top-4 z-50 bg-white p-2 rounded-md shadow-lg transition duration-200 hover:scale-105"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-amber-700" />
          ) : (
            <Menu className="w-6 h-6 text-amber-700" />
          )}
        </span>

        {/* Sidebar Panel - Fixed on Desktop, Collapsible on Mobile */}
        <div
          className={`${
            menuOpen ? "w-64 h-full shadow-xl" : "w-0"
          } fixed left-0 top-0 lg:left-0 lg:top-0 lg:w-64 lg:h-screen lg:shadow-xl 
             bg-white dark:bg-gray-900 dark:text-gray-100 p-4 transition-all duration-300 ease-in-out z-40 overflow-y-auto`}
        >
          {/* Logo/Branding */}
          <div className="text-xl font-bold text-amber-700 mb-6 mt-2">
            Handcrafted Haven
          </div>

          {/* Navigation */}
          <nav
            // The lg:flex ensures navigation is always visible on desktop
            className={`
              ${
                menuOpen ? "flex flex-col" : "hidden"
              } lg:flex lg:flex-col space-y-1
            `}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`hover:bg-amber-100 dark:hover:bg-amber-900 p-2 rounded-lg transition duration-150 ease-in-out font-medium flex items-center ${
                  pathname === link.href
                    ? "bg-amber-600 text-white shadow-md" // Active state
                    : "text-gray-700 dark:text-gray-300 hover:text-amber-700" // Inactive state
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 w-full p-4 lg:p-8">{children}</main>
    </div>
  );
}
