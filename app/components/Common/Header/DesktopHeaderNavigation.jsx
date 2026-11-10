"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  companyIconPath,
  getMenuIcon,
  headerItemVariants,
  navItemIconPath,
  red700Filter,
  servicesMenu,
  specialOffersMenu,
  companyMenu,
} from "./headerConfig";

const dropdownItems = {
  offers: specialOffersMenu,
  services: servicesMenu,
  company: companyMenu,
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
};

function DesktopDropdown({ items, position, onClose, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        width: position.width,
        zIndex: 99999,
      }}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl"
    >
      <div className="space-y-1">
        {items.map((item) =>
          item.external ? (
            <a
              key={item.slug}
              href={item.slug}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600"
            >
              {item.icon}
              {item.name}
            </a>
          ) : (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600"
            >
              {item.icon}
              {item.name}
            </Link>
          ),
        )}
      </div>
    </motion.div>
  );
}

const DesktopHeaderNavigation = ({ menus = [] }) => {
  const router = useRouter();
  const navRef = useRef(null);
  const timeoutRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPositions, setDropdownPositions] = useState({});

  const openDropdown = (event, name) => {
    clearTimeout(timeoutRef.current);
    if (!navRef.current) return;

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const width = 288;
    const left = Math.max(
      0,
      Math.min(
        buttonRect.left - navRect.left + buttonRect.width / 2 - width / 2,
        navRect.width - width,
      ),
    );

    setDropdownPositions((current) => ({
      ...current,
      [name]: {
        left,
        top: buttonRect.bottom - navRect.top + 8,
        width,
      },
    }));
    setActiveDropdown(name);
  };

  const scheduleClose = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const keepDropdownOpen = () => clearTimeout(timeoutRef.current);

  const buttonClass = (name) =>
    `flex items-center gap-2 whitespace-nowrap rounded-xl border px-2 py-2.5 text-sm font-semibold transition ${
      activeDropdown === name
        ? "border-red-200 bg-red-50 text-red-600"
        : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-red-600"
    }`;

  const renderDropdownTrigger = (name, label, icon) => (
    <motion.div
      key={name}
      variants={headerItemVariants}
      className="relative flex h-full shrink-0 items-center"
      onMouseEnter={(event) => openDropdown(event, name)}
      onMouseLeave={scheduleClose}
    >
      <button type="button" className={buttonClass(name)}>
        <span className="flex h-5 w-5 items-center justify-center text-red-600">
          {icon}
        </span>
        <span>{label}</span>
        <motion.span
          animate={{ rotate: activeDropdown === name ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown
            size={14}
            className={activeDropdown === name ? "text-red-500" : "text-gray-400"}
          />
        </motion.span>
      </button>
    </motion.div>
  );

  return (
    <div
      ref={navRef}
      className="relative ml-4 hidden h-12 min-w-0 flex-1 items-center xl:flex"
    >
      <nav className="scrollbar-hide flex h-full w-full items-center justify-between gap-1 overflow-x-auto overflow-y-hidden px-2">
        {menus.map((menu) => (
          <motion.button
            key={menu._id}
            variants={headerItemVariants}
            type="button"
            onClick={() => router.push(`/${menu.slug}`)}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-red-600"
          >
            <span className="flex h-5 w-5 items-center justify-center">
              {getMenuIcon(menu.name, menu.imagePath)}
            </span>
            {menu.name}
          </motion.button>
        ))}
        {renderDropdownTrigger("offers", "Special Offers", <Tag size={18} />)}
        {renderDropdownTrigger(
          "services",
          "Services",
          <Image
            src={navItemIconPath}
            alt=""
            className="h-5 w-5 object-contain"
            style={{ filter: red700Filter }}
          />,
        )}
        {renderDropdownTrigger(
          "company",
          "Company",
          <Image
            src={companyIconPath}
            alt=""
            className="h-5 w-5 object-contain"
            style={{ filter: red700Filter }}
          />,
        )}
      </nav>

      <AnimatePresence>
        {activeDropdown && dropdownPositions[activeDropdown] && (
          <DesktopDropdown
            items={dropdownItems[activeDropdown]}
            position={dropdownPositions[activeDropdown]}
            onClose={() => setActiveDropdown(null)}
            onMouseEnter={keepDropdownOpen}
            onMouseLeave={scheduleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopHeaderNavigation;
