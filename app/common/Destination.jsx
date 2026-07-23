"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Globe, Heart, Ship, Sun, Palmtree, 
  Tag, Building2, Plane, Hotel, Bus, CreditCard, 
  FileText, Car, ChevronDown, Briefcase 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "@/app/store/slice/submenuSlice"; // Adjust path if needed

// --- STATIC MENU DATA ---
const SPECIAL_OFFERS_MENU = [
  { name: "Early Bird Offers", slug: "special-offers/early-bird" },
  { name: "EMI Offers", slug: "special-offers/emi" },
  { name: "Group Tours Offers", slug: "special-offers/group-tours" },
  { name: "Special Promo Offers", slug: "special-offers/special-promo" },
];

const STATIC_SERVICES = [
  { name: "Flight", slug: "service/flight", icon: <Plane size={16} /> },
  { name: "Hotel", slug: "service/hotel", icon: <Hotel size={16} /> },
  { name: "Transport", slug: "service/transport", icon: <Bus size={16} /> },
  { name: "Money Exchange", icon: <CreditCard size={16} /> },
  { name: "Visa", slug: "service/visa", icon: <FileText size={16} /> },
  { name: "Car Rental", slug: "car-rentals", icon: <Car size={16} /> }
];

const COMPANY_MENU = [
  { name: "About Us", slug: "about-us" },
  { name: "Blog", slug: "blog" },
  { name: "Career", slug: "career" },
  { name: "Contact Us", slug: "contact-us" },
];

// Helper to assign icons to dynamic menus from the API based on name keywords
const getDynamicIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("india")) return <MapPin size={20} />;
  if (lowerName.includes("international") || lowerName.includes("globe")) return <Globe size={20} />;
  if (lowerName.includes("honeymoon") || lowerName.includes("couple")) return <Heart size={20} />;
  if (lowerName.includes("cruise") || lowerName.includes("ship")) return <Ship size={20} />;
  if (lowerName.includes("spiritual") || lowerName.includes("temple")) return <Sun size={20} />;
  if (lowerName.includes("beach") || lowerName.includes("island")) return <Palmtree size={20} />;
  return <MapPin size={20} />; // Fallback icon
};


const Destination = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({}); // To track which static dropdown is open
  const router = useRouter();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  // Fetch dynamic location data from Redux
  const { submenus } = useSelector((state) => state.submenu);
  const sortedSubmenus = submenus ? [...submenus].sort((a, b) => a.order - b.order) : [];

  useEffect(() => {
    // Dispatch if data is not already loaded
    if (!submenus || submenus.length === 0) {
      dispatch(getMenus());
    }
  }, [dispatch, submenus]);

  // Handle clicking outside to close the dropdown
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

  // Reset dropdowns when popup closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setExpandedMenus({}), 300); // delay reset until exit animation finishes
    }
  }, [isOpen]);

  const handleNavigate = (slug) => {
    if (!slug) return;
    setIsOpen(false); // Close dropdown
    router.push(`/${slug}`); // Navigate
  };

  const toggleAccordion = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  return (
    <div className="fixed bottom-24 right-6 z-[9990]" ref={dropdownRef}>
      
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-full mb-4 right-0 w-72 bg-[#FEF2F2] rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] p-3 flex flex-col border border-red-100/50 max-h-[65vh] overflow-y-auto hide-scrollbar"
          >
            
            {/* 1. DYNAMIC MENUS (From API/Redux) */}
            {sortedSubmenus.length > 0 ? (
              sortedSubmenus.map((loc) => (
                <button
                  key={loc._id || loc.slug}
                  onClick={() => handleNavigate(loc.slug)}
                  className="flex items-center gap-4 px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-white text-slate-700 font-medium hover:text-red-600 hover:shadow-sm group cursor-pointer"
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

            {/* Divider */}
            <div className="h-px bg-red-200/50 my-2 mx-2"></div>

            {/* 2. STATIC MENU: SPECIAL OFFERS */}
            <div>
              <button
                onClick={() => toggleAccordion("special-offers")}
                className="flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-white text-slate-700 font-medium hover:text-red-600 hover:shadow-sm group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <Tag size={20} />
                  </span>
                  Special Offers
                </div>
                <ChevronDown size={16} className={`transition-transform duration-300 ${expandedMenus["special-offers"] ? "rotate-180 text-red-500" : "text-gray-400"}`} />
              </button>
              
              <AnimatePresence>
                {expandedMenus["special-offers"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-4 pl-4 border-l-2 border-red-100 mt-1 flex flex-col gap-1"
                  >
                    {SPECIAL_OFFERS_MENU.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleNavigate(item.slug)}
                        className="text-left px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. STATIC MENU: SERVICES */}
            <div>
              <button
                onClick={() => toggleAccordion("services")}
                className="flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-white text-slate-700 font-medium hover:text-red-600 hover:shadow-sm group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase size={20} />
                  </span>
                  Services
                </div>
                <ChevronDown size={16} className={`transition-transform duration-300 ${expandedMenus["services"] ? "rotate-180 text-red-500" : "text-gray-400"}`} />
              </button>

              <AnimatePresence>
                {expandedMenus["services"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-4 pl-4 border-l-2 border-red-100 mt-1 flex flex-col gap-1"
                  >
                    {STATIC_SERVICES.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigate(item.slug)}
                        className={`flex items-center gap-2 text-left px-3 py-2 text-sm rounded-lg transition-colors ${item.slug ? "text-slate-600 hover:text-red-600 hover:bg-white cursor-pointer" : "text-slate-400 cursor-not-allowed"}`}
                      >
                        {item.icon && <span className={item.slug ? "text-red-400" : "text-slate-300"}>{item.icon}</span>}
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. STATIC MENU: COMPANY */}
            <div>
              <button
                onClick={() => toggleAccordion("company")}
                className="flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-white text-slate-700 font-medium hover:text-red-600 hover:shadow-sm group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <Building2 size={20} />
                  </span>
                  Company
                </div>
                <ChevronDown size={16} className={`transition-transform duration-300 ${expandedMenus["company"] ? "rotate-180 text-red-500" : "text-gray-400"}`} />
              </button>

              <AnimatePresence>
                {expandedMenus["company"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-4 pl-4 border-l-2 border-red-100 mt-1 flex flex-col gap-1"
                  >
                    {COMPANY_MENU.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleNavigate(item.slug)}
                        className="text-left px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
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

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-2xl flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer ${
          isOpen ? "text-red-600 bg-[#FEF2F2]" : "text-white bg-red-600 hover:bg-red-700"
        }`}
        aria-label="View Menu"
      >
        <MapPin 
          size={28} 
          className={!isOpen ? "animate-bounce" : ""} 
          style={{ animationDuration: '2s' }} 
        />
      </motion.button>
    </div>
  );
};

export default Destination;