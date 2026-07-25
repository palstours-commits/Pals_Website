"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Sparkles, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "@/app/store/slice/submenuSlice";

const SPECIAL_OFFERS_MENU = [
  { name: "Early Bird Offers", slug: "special-offers/early-bird" },
  { name: "EMI Offers", slug: "special-offers/emi" },
  { name: "Group Tours Offers", slug: "special-offers/group-tours" },
  { name: "Special Promo Offers", slug: "special-offers/special-promo" },
];

const STATIC_SERVICES = [
  { name: "Flight", slug: "service/flight" },
  { name: "Hotel", slug: "service/hotel" },
  { name: "Transport", slug: "service/transport" },
  { name: "Money Exchange", slug: null },
  { name: "Visa", slug: "service/visa" },
  { name: "Car Rental", slug: "car-rentals" }
];

const COMPANY_MENU = [
  { name: "About Us", slug: "about-us" },
  { name: "Blog", slug: "blog" },
  { name: "Career", slug: "career" },
  { name: "Contact Us", slug: "contact-us" },
];

const getDynamicIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("india")) return <MapPin size={20} />;
  if (lowerName.includes("international") || lowerName.includes("globe")) return <MapPin size={20} />;
  if (lowerName.includes("honeymoon") || lowerName.includes("couple")) return <MapPin size={20} />;
  if (lowerName.includes("cruise") || lowerName.includes("ship")) return <MapPin size={20} />;
  if (lowerName.includes("spiritual") || lowerName.includes("temple")) return <MapPin size={20} />;
  if (lowerName.includes("beach") || lowerName.includes("island")) return <MapPin size={20} />;
  return <MapPin size={20} />;
};

const Fixed_ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { submenus } = useSelector((state) => state.submenu);
  const sortedSubmenus = submenus ? [...submenus].sort((a, b) => a.order - b.order) : [];

  const isPackageDetailsPage = pathname?.includes('/package/') || pathname?.includes('/packages/');
  
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!submenus || submenus.length === 0) {
      dispatch(getMenus());
    }
  }, [dispatch, submenus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setExpandedMenus({}), 300);
    }
  }, [isOpen]);

  const handleNavigate = (slug) => {
    if (!slug) return;
    setIsOpen(false);
    router.push(`/${slug}`);
  };

  const toggleAccordion = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // Location Icon Component (reused)
  const LocationIcon = () => (
    <div className="pointer-events-auto relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center transition-colors duration-200 ${
          isOpen ? 'bg-red-600 text-white' : 'bg-white text-red-600'
        }`}
        aria-label="Destinations"
      >
        <MapPin size={22} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-full mb-3 right-0 w-72 bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-2 max-h-[60vh] overflow-y-auto hide-scrollbar border border-gray-100"
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .hide-scrollbar::-webkit-scrollbar { display: none; }
                  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `,
              }}
            />

            {/* Dynamic Menus */}
            {sortedSubmenus.length > 0 ? (
              sortedSubmenus.map((loc) => (
                <button
                  key={loc._id || loc.slug}
                  onClick={() => handleNavigate(loc.slug)}
                  className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-700 font-medium hover:text-red-600 group cursor-pointer text-sm"
                >
                  <span className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    {getDynamicIcon(loc.name)}
                  </span>
                  {loc.name}
                </button>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">Loading destinations...</div>
            )}

            <div className="h-px bg-gray-100 my-1 mx-2"></div>

            {/* Special Offers */}
            <div>
              <button
                onClick={() => toggleAccordion("special-offers")}
                className="flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-700 font-medium hover:text-red-600 group cursor-pointer text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles size={18} />
                  </span>
                  Special Offers
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${expandedMenus["special-offers"] ? "rotate-180 text-red-500" : "text-gray-400"}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {expandedMenus["special-offers"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-6 pl-3 border-l-2 border-red-100 mt-1 flex flex-col gap-1"
                  >
                    {SPECIAL_OFFERS_MENU.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleNavigate(item.slug)}
                        className="text-left px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services */}
            <div>
              <button
                onClick={() => toggleAccordion("services")}
                className="flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-700 font-medium hover:text-red-600 group cursor-pointer text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Services
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${expandedMenus["services"] ? "rotate-180 text-red-500" : "text-gray-400"}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {expandedMenus["services"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-6 pl-3 border-l-2 border-red-100 mt-1 flex flex-col gap-1"
                  >
                    {STATIC_SERVICES.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigate(item.slug)}
                        className={`flex items-center gap-2 text-left px-3 py-2 text-sm rounded-lg transition-colors ${item.slug ? "text-gray-600 hover:text-red-600 hover:bg-red-50 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company */}
            <div>
              <button
                onClick={() => toggleAccordion("company")}
                className="flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-700 font-medium hover:text-red-600 group cursor-pointer text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  Company
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${expandedMenus["company"] ? "rotate-180 text-red-500" : "text-gray-400"}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {expandedMenus["company"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-6 pl-3 border-l-2 border-red-100 mt-1 flex flex-col gap-1"
                  >
                    {COMPANY_MENU.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleNavigate(item.slug)}
                        className="text-left px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // If on package details page AND desktop, show ONLY the location icon
  if (isPackageDetailsPage && isDesktop) {
    return (
      <div className="fixed bottom-24 right-4 z-[9998] flex flex-col items-end gap-3 pb-safe pointer-events-none">
        <LocationIcon />
      </div>
    );
  }

  // For desktop (non-package pages) - show NOTHING (no icons at all)
  if (isDesktop && !isPackageDetailsPage) {
    return null;
  }

  // For mobile (all pages) - show all icons including location
  return (
    <div className="fixed bottom-24 right-4 z-[9998] flex flex-col items-end gap-3 pb-safe pointer-events-none">
    

      {/* Location Icon */}
      <LocationIcon />

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