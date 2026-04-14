"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import React, { useState } from "react";
import CartSheet from "./cart-sheet";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import UserMenu from "./user-menu";

/**
 * @description The main navigation component.
 *
 * @returns {JSX.Element} - The navigation component.
 */
export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("Navbar");

  /**
   * Handle search form submission.
   *
   * @param {React.FormEvent} e - Event object.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      // Redirect to search results page with query parameter.
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const routes = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/categories", label: t("categories") },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-white border-b">
      <div className="container mx-auto md:py-6 md:px-8 flex h-16 items-center">
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-sm text-bold hidden">Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8 px-12">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="pt-4 border-t space-y-4">
                  <UserMenu />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link className="flex items-center gap-2 ml-4 md:ml-0 md:mr-8" href="/">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold text-xl">Green Life</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="font-medium transition-colors hover:text-primary"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Search & Cart & Auth */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto px-4 md:px-0">
          <form onSubmit={handleSearch} className="hidden xl:flex items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("search")}
                className="w-full md:w-[150px] lg:w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => router.push("/search")}
          >
            <Search className="w-5 h-5" />
          </Button>

          <LocaleSwitcher />

          {/* Sheet */}
          <CartSheet />

          <div className="hidden lg:block ml-2">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
