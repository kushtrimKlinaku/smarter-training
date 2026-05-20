"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/about", label: "Rreth Nesh" },
  { href: "/services", label: "Programet" },
  { href: "/soft-skills-academy", label: "Akademia" },
  { href: "/contact", label: "Kontakti" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_#E8E8E8]"
          : "bg-white"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-[22px] font-bold tracking-[-0.02em] text-[#1A1A1A]">
              Smarter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[15px] font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#1A1A1A]"
                      : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-[#1A1A1A] text-white text-[14px] font-semibold hover:bg-[#333] transition-all duration-200 cursor-pointer active:scale-[0.98]"
            >
              Regjistro Tani
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-[#E8E8E8]"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-[16px] font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#1A1A1A] bg-[#F5F5F5]"
                        : "text-[#6B6B6B] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-none bg-[#1A1A1A] text-white font-semibold cursor-pointer hover:bg-[#333] transition-all"
                >
                  Regjistro Tani
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
