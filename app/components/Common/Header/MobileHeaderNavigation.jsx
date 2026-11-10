"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, Phone, Sparkles, Tag, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import navbarLogo from "@/app/assets/navbar_logo.svg";
import {
  companyIconPath,
  companyMenu,
  getMenuIcon,
  navItemIconPath,
  red700Filter,
  servicesMenu,
  specialOffersMenu,
} from "./headerConfig";

const MobileHeaderNavigation = ({ menus = [] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedGroup(null);
  };

  const navigate = (slug) => {
    if (slug.startsWith("http")) {
      window.open(slug, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/${slug}`);
    }
    closeMenu();
  };

  const renderGroup = (id, label, icon, items) => {
    const isExpanded = expandedGroup === id;

    return (
      <div className="border-b border-gray-50/50 pb-1">
        <button
          type="button"
          onClick={() => setExpandedGroup(isExpanded ? null : id)}
          className="flex w-full items-center justify-between rounded-xl px-2 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
        >
          <span className="flex items-center gap-3">
            {icon}
            {label}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-300 ${
              isExpanded ? "rotate-180 text-red-600" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mb-2 ml-4 space-y-1 border-l-2 border-red-100 py-2 pl-6 pr-2">
                {items.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => navigate(item.slug)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    {item.icon && (
                      <span className="text-red-500">{item.icon}</span>
                    )}
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setIsOpen(true)}
        className="shrink-0 rounded-2xl p-3 transition-colors hover:bg-red-50/50 xl:hidden"
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm xl:hidden"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="fixed right-0 top-0 z-[99999] flex h-[100dvh] w-[85vw] max-w-sm flex-col overflow-hidden bg-white shadow-2xl xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4 shadow-sm">
                <Image
                  src={navbarLogo}
                  alt="Pals Holidays"
                  className="h-10 w-auto"
                />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="rounded-full bg-gray-50 p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                {menus.map((menu, index) => (
                  <div
                    key={menu.slug || menu.name || `menu-${index}`}
                    className="border-b border-gray-50/50 pb-1"
                  >
                    <button
                      type="button"
                      onClick={() => navigate(menu.slug)}
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
                    >
                      <span className="flex h-5 w-5 items-center justify-center">
                        {getMenuIcon(menu.name, menu.icon)}
                      </span>
                      {menu.name}
                    </button>
                  </div>
                ))}
                {renderGroup(
                  "services",
                  "Services",
                  <Image
                    src={navItemIconPath}
                    alt=""
                    className="h-5 w-5 object-contain"
                    style={{ filter: red700Filter }}
                  />,
                  servicesMenu,
                )}
                {renderGroup(
                  "company",
                  "Company",
                  <Image
                    src={companyIconPath}
                    alt=""
                    className="h-5 w-5 object-contain"
                    style={{ filter: red700Filter }}
                  />,
                  companyMenu,
                )}
                {renderGroup(
                  "offers",
                  "Special Offers",
                  <span className="flex h-5 w-5 items-center justify-center text-red-600">
                    <Tag size={18} />
                  </span>,
                  specialOffersMenu,
                )}
              </nav>

              <div className="mt-auto border-t border-gray-100 bg-gray-50 p-4">
                <div className="mb-4 flex justify-center gap-4">
                  <a
                    href="tel:+919841255715"
                    aria-label="Call Pals Holidays"
                    className="rounded-xl border border-gray-200 bg-white p-3 text-red-600 shadow-sm transition hover:border-red-200 hover:bg-red-50"
                  >
                    <Phone size={20} />
                  </a>
                  <a
                    href="mailto:mail@palsholidays.com"
                    aria-label="Email Pals Holidays"
                    className="rounded-xl border border-gray-200 bg-white p-3 text-red-600 shadow-sm transition hover:border-red-200 hover:bg-red-50"
                  >
                    <Mail size={20} />
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("contact-us")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 font-bold text-white shadow-lg shadow-red-200 transition hover:opacity-90 active:scale-95"
                >
                  <Sparkles size={18} />
                  Plan My Tour
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeaderNavigation;
