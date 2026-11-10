"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { planTourButtonVariants } from "./headerConfig";

const DesktopHeaderActions = () => (
  <div className="z-10 ml-3 hidden shrink-0 items-center gap-2 pl-2 xl:flex">
    <div className="flex items-center gap-1 text-gray-700">
      <motion.a
        href="tel:+919841255715"
        whileHover={{
          scale: 1.1,
          rotate: 5,
          backgroundColor: "#FEE2E2",
        }}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:border-red-500 hover:text-red-600"
        aria-label="Call Pals Holidays"
      >
        <Phone size={20} />
      </motion.a>
      <motion.a
        href="mailto:mail@palsholidays.com"
        whileHover={{
          scale: 1.1,
          rotate: -5,
          backgroundColor: "#FEE2E2",
        }}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:border-red-500 hover:text-red-600"
        aria-label="Email Pals Holidays"
      >
        <Mail size={20} />
      </motion.a>
    </div>
    <motion.div variants={planTourButtonVariants} animate="animate">
      <Link href="/contact-us">
        <motion.span
          whileHover={{ scale: 1.05, y: -3 }}
          className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-[#da251c] px-4 py-3 text-sm font-bold text-white shadow-xl"
        >
          <Sparkles size={16} />
          Plan My Tour
        </motion.span>
      </Link>
    </motion.div>
  </div>
);

export default DesktopHeaderActions;
