"use client";
import { Button } from "@/src/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { signout } from "@/app/api/auth/(vendor-specific)/signout/route.js";
import { useRouter } from "next/navigation";
/*********** Lucid icon***********/
import { LogOut, X, Menu } from "lucide-react";
// import { apiUrl } from "@/config/baseUrlConfig";

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

  // Close menu on route change (using pathname as dependency)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Check if vendor is verified
  /*   useEffect(() => {
    const checkIfVendorisVerified = async () => {
      const res = await fetch(
        apiUrl("/api/vendor/verification/check-vendor-verification", {
          credentials: "same-origin",
        })
      );
      const data = await res.json();

      if (!res.ok || data.error) {
        setVerified(false);
        return;
      }

      const isVerified = data.success && data.isVerified;
      setVerified(isVerified);
    };
    checkIfVendorisVerified();

    // Restore short-lived dismissal for this session
    const dismissedFlag =
      typeof window !== "undefined" &&
      sessionStorage.getItem("dismiss_verify_banner");
    if (dismissedFlag) setDismissed(true);
  }, [verified, dismissed]); */

  // Signout
  /*  const router = useRouter();
  const handleSignout = async () => {
    try {
      await signout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }; */

  const navLinks = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Products", href: "/dashboard/products" },
    { label: "Profile", href: "/dashboard/profile" },
    { label: "Billing", href: "/dashboard/billing" },
  ];

  return (
    <div className="flex min-h-screen bg-(--background)">
      {/* Sidebar */}
      <aside className="relative">
        <span
          aria-label="Open menu"
          onClick={handleMenuClick}
          className="lg:hidden cursor-pointer fixed right-4 top-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        >
          {menuOpen ? <X /> : <Menu />}
        </span>

        <div
          className={`${
            menuOpen ? "w-64 h-full bg-[#fafafa] shadow shadow-md" : "w-0"
          } fixed left-0 top-0 lg:left-0 lg:top-0 lg:w-64 lg:h-screen dark:bg-(--background) dark:text-(--foreground) lg:bg-[#fafafa] lg:shadow lg:shadow-md p-4 transition-all duration-300 ease-in-out z-40`}
        >
          <nav
            className={`
                  ${
                    menuOpen ? "flex flex-col" : "hidden"
                  } lg:flex lg:flex-col space-y-2
               `}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`hover:bg-gray-300 hover:rounded dark:hover:bg-gray-600 dark:focus:bg-gray-600 p-2 focus:bg-gray-300 transition delay-50 duration-150 ease-in-out ${
                  pathname.endsWith(link.href) &&
                  "bg-gray-300 dark:bg-gray-600 p-2 rounded"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              //   onClick={handleSignout}
              type="submit"
              className="cursor-pointer flex items-center text-red-400"
            >
              <span>
                <LogOut className="w-4 transform rotate-180" />
              </span>
              Sign out
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="mt-15 lg:mt-0 lg:ml-64 w-full lg:p-8 p-4">
        {children}
      </main>
    </div>
  );
}
