"use client";

import React, { useState, useEffect } from "react";
import { Pill, Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "My Schedule", href: "#manager" },
    { name: "Benefits", href: "#benefits" },
    { name: "Support", href: "#support" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-100 transition-all duration-500 px-6",
      isScrolled ? "py-4" : "py-8"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500",
        isScrolled ? "bg-black/60 backdrop-blur-2xl px-10 py-4 rounded-[2rem] border border-white/10 shadow-2xl" : "p-0"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Pill className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">MedTrack</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold text-white/60 hover:text-white transition-colors tracking-widest uppercase"
            >
              {link.name}
            </a>
          ))}
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">
            <Bell size={18} />
            Reminders
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-3 bg-white/5 rounded-xl border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-black/90 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 md:hidden z-50 flex flex-col items-center gap-8"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-black tracking-widest uppercase italic"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-5 bg-accent text-white rounded-2xl font-bold text-lg">
              Notifications
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
