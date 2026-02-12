"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Mail, ChevronUp } from "lucide-react";
import navbar_logo from "@/app/assets/navbar_logo.svg";
import navItemIcon from "@/app/assets/navlink_icon.svg";
import navActiveIcon from "@/app/assets/nav_active-icon.svg";

const navItems = [
  { label: "Holidays", dropdown: true },
  { label: "Honeymoon" },
  { label: "Cruise" },
  { label: "Services" },
  { label: "Offers" },
  { label: "Company" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="w-full bg-black text-white text-xs font-light text-center py-2 hidden md:block">
        Black Friday Last-Minute Specials: Save up to $1,000 by 11/23 on trips
        departing this winter or spring. →
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-3 z-10 md:relative top-2"
          >
            <Image
              src={navbar_logo}
              alt="Pals Holidays"
              className="h-10 md:h-20 w-auto"
              priority
            />
          </Link>
          <nav className="hidden lg:flex ml-10  max-w-[600px]  2xl:max-w-[520px] overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-6 min-w-max">
              {navItems.map((item, index) => {
                const isActive = active === index;

                return (
                  <div key={item.label} className="shrink-0">
                    {item.dropdown ? (
                      <button
                        onClick={() => setActive(index)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition
          ${
            isActive
              ? "border border-red-500 text-red-500"
              : "text-gray-700 hover:text-red-500"
          }`}
                      >
                        <Image
                          src={isActive ? navActiveIcon : navItemIcon}
                          alt="icon"
                          className="w-5 h-5 object-contain"
                        />

                        {item.label}
                        <ChevronDown size={16} />
                      </button>
                    ) : (
                      <Link
                        href="#"
                        onClick={() => setActive(index)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition whitespace-nowrap
          ${isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"}`}
                      >
                        <Image
                          src={isActive ? navActiveIcon : navItemIcon}
                          alt="icon"
                          className="w-5 h-5 object-contain"
                        />

                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <div className="hidden 2xl:flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} />
              <a href="tel:+919841255715" className="hover:text-red-600">
                +91-98412-55715
              </a>
              <span>/</span>
              <Mail size={16} />
              <a
                href="mailto:mail@palsholidays.com"
                className="hover:text-red-600"
              >
                mail@palsholidays.com
              </a>
            </div>
            <div className="flex 2xl:hidden items-center gap-3 text-gray-700">
              <a
                href="tel:+919841255715"
                aria-label="Call PALS Holidays"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-red-600 hover:text-red-600 transition"
              >
                <Phone size={16} />
              </a>

              <a
                href="mailto:mail@palsholidays.com"
                aria-label="Email PALS Holidays"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-red-600 hover:text-red-600 transition"
              >
                <Mail size={16} />
              </a>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-2">
              <span className="w-4 h-4 rounded-md border border-white flex items-center justify-center ">
                <ChevronUp size={15} />
              </span>
              Plan My Tour
            </button>
          </div>
          <button className="lg:hidden ml-auto" onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />

              <motion.aside
                className="fixed top-0 right-0 h-full w-80 bg-white p-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <div className="flex items-center justify-end mb-8">
                  <X
                    size={24}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <nav className="flex flex-col gap-6">
                  {navItems?.map((item) => (
                    <Link
                      key={item.label}
                      href="#"
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-gray-800 flex items-center gap-3"
                    >
                      <Image src={navItemIcon} alt="icon" className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <button className="mt-10  text-sm bg-red-600 text-white py-3 w-32 rounded-full font-semibold">
                  Plan My Tour
                </button>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
