"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
export default function Header() {
 const user = useSelector((state: { user: { user: { name: string; email: string } } }) => state.user.user);
 const playerName = user?.name || null;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/about", label: "About" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-shadow bg-opacity-80 backdrop-blur-sm ${
        scrolled ? "shadow-md" : ""
      }`}
      aria-label="Main site header"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="h-16 flex items-center justify-between">
        
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-hidden
              >
                <rect width="24" height="24" rx="6" fill="url(#g)" />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#6366F1" />
                    <stop offset="1" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-semibold text-lg">Game-English</span>
            </Link>

     
            <nav className="hidden md:flex items-center gap-3 ml-4" aria-label="Primary">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-2 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

     
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-white font-medium"
                aria-hidden
              >
                {playerName ? playerName.charAt(0).toUpperCase() : "G"}
              </div>
              <div className="text-sm">
                <div className="font-medium leading-none">
                  {playerName ?? "Guest"}
                </div>
                <div className="text-xs text-gray-600">Player</div>
              </div>
            </div>

            
            <button
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((s) => !s);               
              }}
              className="p-2 rounded-md md:hidden focus:outline-none focus-visible:ring-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Desktop: Theme toggle */}
            <div className="hidden md:flex items-center gap-2">
              <button
                title="Toggle theme"
                aria-label="Toggle theme"
                className="p-2 rounded-md focus:outline-none focus-visible:ring-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white/95 border-t"
            aria-label="Mobile menu"
          >
            <div className="px-4 py-3">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-base hover:bg-gray-100 focus:outline-none"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
