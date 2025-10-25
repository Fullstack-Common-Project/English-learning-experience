"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";
import NavLinks from "../ui/NavLinks";
import UserSection from "../ui/UserSection";
import MobileMenu from "../ui/MobileMenu";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector(
    (state: { user: { user: { userId: number; fullName: string } } }) =>
      state.user.user
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggedIn = user?.userId && user.userId !== 0;
  const playerName = user?.fullName || "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header-bg ${scrolled ? "shadow-md" : ""}`}
      aria-label="Main site header"
    >
      <div className="h-16 flex items-center justify-between mt-4 px-4 md:px-6">
        <Logo size="sm" />

        <NavLinks />

      {isLoggedIn?<UserSection
        onMenuToggle={() => setMobileOpen((prev) => !prev)}
          mobileOpen={mobileOpen}
          playerName={playerName} />
        :<MobileMenu onClose={() => setMobileOpen(false)} />}
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
          >
            <MobileMenu onClose={() => setMobileOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
