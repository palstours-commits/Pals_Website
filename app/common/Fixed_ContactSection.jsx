"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "@/app/store/slice/submenuSlice";

const MenuItem = ({
  menu,
  expandedMenus,
  toggleAccordion,
  handleNavigate,
  depth = 0,
  isLastItem = false
}) => {
  const hasChildren = menu.children && menu.children.length > 0;
  const isExpanded = expandedMenus[menu._id] || false;
  const indentClass = depth > 0 ? `ml-${Math.min(depth * 4, 8)} pl-${Math.min(depth * 3, 6)}` : '';
  const borderColor = depth === 0 ? 'border-red-100' : 'border-red-50';

  return (
    <div className="w-full">
      <button
        onClick={() => {
          if (hasChildren) {
            toggleAccordion(menu._id);
          } else {
            handleNavigate(menu.slug);
          }
        }}
        className={`flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-700 font-medium hover:text-red-600 group cursor-pointer text-sm ${indentClass}`}
        style={{ paddingLeft: `${16 + (depth * 12)}px` }}
      >
        <div className="flex items-center gap-3 truncate flex-1">
          <span className="text-red-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <MapPin size={18} />
          </span>
          <span className="truncate">{menu.name}</span>
        </div>
        {hasChildren && (
          <svg
            className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180 text-red-500" : "text-gray-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`overflow-hidden ${depth > 0 ? `ml-${Math.min(depth * 4, 8)}` : 'ml-6'} pl-3 border-l-2 ${borderColor} mt-1`}
          >
            {menu.children.map((child, index) => (
              <MenuItem
                key={child._id || child.slug || index}
                menu={child}
                expandedMenus={expandedMenus}
                toggleAccordion={toggleAccordion}
                handleNavigate={handleNavigate}
                depth={depth + 1}
                isLastItem={index === menu.children.length - 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Fixed_ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { submenus } = useSelector((state) => state.submenu);
  const sortedSubmenus = useMemo(() => {
    return submenus ? [...submenus].sort((a, b) => (a.order || 0) - (b.order || 0)) : [];
  }, [submenus]);

  // Check if it's a package details page (not the package listing page)
  const isPackageDetailsPage = pathname?.includes('/package/') && !pathname?.includes('/packages/');

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

  const handleNavigate = useCallback((slug) => {
    if (!slug) return;
    setIsOpen(false);
    router.push(`/${slug}`);
  }, [router]);

  const toggleAccordion = useCallback((menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  }, []);

  const LocationIcon = useMemo(() => {
    return () => (
      <div className="pointer-events-auto relative" ref={dropdownRef}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center transition-colors duration-200 cursor-pointer ${isOpen ? 'bg-red-600 text-white' : 'bg-white text-red-600'
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

              {sortedSubmenus.length > 0 ? (
                sortedSubmenus.map((menu, index) => (
                  <MenuItem
                    key={menu._id || menu.slug || index}
                    menu={menu}
                    expandedMenus={expandedMenus}
                    toggleAccordion={toggleAccordion}
                    handleNavigate={handleNavigate}
                    depth={0}
                    isLastItem={index === sortedSubmenus.length - 1}
                  />
                ))
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">Loading destinations...</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }, [isOpen, sortedSubmenus, expandedMenus, toggleAccordion, handleNavigate]);

  if (isPackageDetailsPage && isDesktop) {
    return (
      <div className="fixed bottom-24 right-4 z-[9998] flex flex-col items-end gap-3 pb-safe pointer-events-none">
        <LocationIcon />
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <div className="fixed bottom-24 right-4 z-[9998] flex flex-col items-end gap-3 pb-safe pointer-events-none">
        <LocationIcon />

        <motion.a
          whileTap={{ scale: 0.9 }}
          href="mailto:mail@palsholidays.com"
          className="w-12 h-12 bg-white text-red-600 rounded-full border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center pointer-events-auto"
          aria-label="Email Us"
        >
          <Mail size={22} />
        </motion.a>

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
  }

  return null;
};

export default Fixed_ContactSection;