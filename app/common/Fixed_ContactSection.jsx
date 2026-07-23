"use client";

import React from 'react';
import { Phone, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Fixed_ContactSection = () => {
  return (
    // Fixed to the right side, bottom-24 puts it exactly above the WhatsApp button
    <div className="fixed bottom-24 right-4 z-[9998] lg:hidden flex flex-col items-end gap-3 pb-safe pointer-events-none">
      
      {/* Plan My Tour (Pill Shape) */}
      <div className="pointer-events-auto">
        <Link href="/contact-us">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold shadow-lg shadow-red-200/50 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            <span className="text-sm whitespace-nowrap">Plan Tour</span>
          </motion.button>
        </Link>
      </div>

      {/* Mail Icon (Circle) */}
      <motion.a 
        whileTap={{ scale: 0.9 }}
        href="mailto:mail@palsholidays.com" 
        className="w-12 h-12 bg-white text-red-600 rounded-full border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center pointer-events-auto"
        aria-label="Email Us"
      >
        <Mail size={22} />
      </motion.a>

      {/* Phone Icon (Circle) */}
      <motion.a 
        whileTap={{ scale: 0.9 }}
        href="tel:+919841255715" 
        className="w-12 h-12 bg-white text-red-600 rounded-full border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center pointer-events-auto"
        aria-label="Call Us"
      >
        <Phone size={22} />
      </motion.a>

    </div>
  );
};

export default Fixed_ContactSection;