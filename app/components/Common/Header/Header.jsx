"use client";
import navbar_logo from "@/app/assets/navbar_logo.svg";
import companyIcon from "@/app/assets/office-building.svg";
import navItemIcon from "@/app/assets/serive_home-icon-2.svg";
import CustomImage from "@/app/common/Image";
import { getSubMenus } from "@/app/store/slice/submenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Animation Variants
const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const topToBottomDropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -20,
    scaleY: 0.8
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      height: { duration: 0.3, ease: "easeOut" }
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    scaleY: 0.8,
    transition: { duration: 0.25, ease: "easeIn" }
  },
};

const planTourButtonVariants = {
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export default function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { submenus } = useSelector((state) => state.submenu);
  console.log("Submenus in Header:", submenus);
  
  // Sort submenus by order
  const sortedSubmenus = submenus ? [...submenus].sort((a, b) => a.order - b.order) : [];

  useEffect(() => {
    dispatch(getSubMenus());
  }, [dispatch]);

  const STATIC_SERVICES = [
    { name: "Flight", slug: "flight" },
    { name: "Hotel", slug: "hotel" },
    { name: "Transport", slug: "transport" },
    { name: "Money Exchange" },
    { name: "Visa", slug: "visa" },
  ];

  const COMPANY_MENU = [
    { name: "About Us", slug: "about-us" },
    { name: "Blog", slug: "blog" },
    { name: "Career", slug: "career" },
    { name: "Contact Us", slug: "contact-us" },
  ];

  return (
    <>
      {/* Animated Top Banner */}
      <motion.div
        variants={headerItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-black text-white text-xs font-light text-center py-2 hidden md:block"
      >
        Black Friday Last-Minute Specials: Save up to $1,000 by 11/23 on trips
        departing this winter or spring. →
      </motion.div>

      <header className="sticky top-0 z-[9999] bg-white shadow-2xl">
        {/* Main Header Container */}
        <motion.div 
          variants={headerContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 2xl:px-8 h-16 flex items-center"
        >
          {/* Logo */}
          <motion.div variants={headerItemVariants} className="z-10 md:relative top-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={navbar_logo}
                alt="Pals Holidays"
                className="h-10 md:h-20 w-auto hover:scale-105 transition-transform duration-200"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <div className="flex items-center gap-1">
              {sortedSubmenus?.map((menu, index) => {
                const isActive = active === index;
                const hasSubmenu = menu?.submenus?.length > 0;
                // Sort submenus by order if they exist
                const sortedSubItems = menu?.submenus 
                  ? [...menu.submenus].sort((a, b) => a.order - b.order) 
                  : [];
                
                return (
                  <motion.div
                    variants={headerItemVariants}
                    key={menu._id}
                    className="relative shrink-0 group"
                    onMouseEnter={() => hasSubmenu && setActive(index)}
                    onMouseLeave={() => hasSubmenu && setActive(null)}
                  >
                    {hasSubmenu ? (
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm group-hover:shadow-md
                          ${
                            isActive
                              ? "border-2 border-red-500 text-red-500 bg-[#FFDCDA] shadow-md"
                              : "text-gray-700 hover:text-red-500 hover:shadow-md bg-white/80"
                          }`}
                      >
                        <motion.div 
                          className="w-5 h-5"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CustomImage
                            src={menu?.icon}
                            alt="icon"
                            className="w-5 h-5 object-contain"
                          />
                        </motion.div>
                        {menu.name}
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </motion.button>
                    ) : (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-red-500 hover:shadow-md cursor-pointer bg-white/80"
                      >
                        <motion.div 
                          className="w-5 h-5"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CustomImage
                            src={menu?.icon}
                            alt="icon"
                            className="w-5 h-5 object-contain"
                          />
                        </motion.div>
                        {menu.name}
                      </motion.div>
                    )}
                    
                    {/* Animated Dropdown with sorted submenus */}
                    <AnimatePresence>
                      {hasSubmenu && isActive && (
                        <motion.div 
                          variants={topToBottomDropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl py-3 z-50 origin-top overflow-hidden border border-gray-100/50"
                        >
                          {sortedSubItems.map((sub, subIndex) => (
                            <motion.div
                              key={sub._id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ delay: 0.1 + subIndex * 0.05 }}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50/80 hover:text-red-600 transition-all duration-200 rounded-lg mx-1"
                            >
                              <Link 
                                href={`/${menu.slug}/${sub.slug}`}
                                className="block w-full h-full"
                              >
                                {sub.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {/* Services Dropdown */}
              <motion.div
                variants={headerItemVariants}
                className="relative shrink-0 group"
                onMouseEnter={() => setActive("services")}
                onMouseLeave={() => setActive(null)}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm group-hover:shadow-md
                    ${
                      active === "services"
                        ? "border-2 border-red-500 text-red-500 bg-[#FFDCDA] shadow-md"
                        : "text-gray-700 hover:text-red-500 hover:shadow-md bg-white/80"
                    }`}
                >
                  <motion.div 
                    className="w-5 h-5"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Image
                      src={navItemIcon}
                      alt="icon"
                      className="w-5 h-5 object-contain"
                    />
                  </motion.div>
                  Services
                  <motion.div
                    animate={{ rotate: active === "services" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {active === "services" && (
                    <motion.div 
                      variants={topToBottomDropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl py-3 z-50 origin-top overflow-hidden border border-gray-100/50"
                    >
                      {STATIC_SERVICES.map((item, index) =>
                        item.slug ? (
                          <motion.div
                            key={item.slug}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50/80 hover:text-red-600 transition-all duration-200 rounded-lg mx-1"
                          >
                            <Link href={`/service/${item.slug}`} className="block w-full h-full">
                              {item.name}
                            </Link>
                          </motion.div>
                        ) : (
                          <span
                            key={item.name}
                            className="block px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                          >
                            {item.name}
                          </span>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Company Dropdown */}
              <motion.div
                variants={headerItemVariants}
                className="relative shrink-0 group"
                onMouseEnter={() => setActive("company")}
                onMouseLeave={() => setActive(null)}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm group-hover:shadow-md
                    ${
                      active === "company"
                        ? "border-2 border-red-500 text-red-500 bg-[#FFDCDA] shadow-md"
                        : "text-gray-700 hover:text-red-500 hover:shadow-md bg-white/80"
                    }`}
                >
                  <motion.div 
                    className="w-5 h-5"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Image
                      src={companyIcon}
                      alt="icon"
                      className="w-5 h-5 object-contain"
                    />
                  </motion.div>
                  Company
                  <motion.div
                    animate={{ rotate: active === "company" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {active === "company" && (
                    <motion.div 
                      variants={topToBottomDropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl py-3 z-50 origin-top overflow-hidden border border-gray-100/50"
                    >
                      {COMPANY_MENU?.map((item, index) => (
                        <motion.div
                          key={item.slug}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50/80 hover:text-red-600 transition-all duration-200 rounded-lg mx-1"
                        >
                          <Link href={`/${item.slug}`} className="block w-full h-full">
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </nav>

          {/* Right Side - Phone/Email & CTA */}
          <motion.div variants={headerItemVariants} className="hidden 2xl:flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-3 text-gray-700">
              <motion.a
                href="tel:+919841255715"
                aria-label="Call PALS Holidays"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-red-500 hover:bg-red-50/80 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm bg-white/80"
              >
                <Phone size={18} />
              </motion.a>
              <motion.a
                href="mailto:mail@palsholidays.com"
                aria-label="Email PALS Holidays"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-red-500 hover:bg-red-50/80 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm bg-white/80"
              >
                <Mail size={18} />
              </motion.a>
            </div>
            
            <motion.div variants={planTourButtonVariants} animate="animate">
              <Link href="/contact-us">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 25px rgba(239,68,68,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 border border-red-500/30 backdrop-blur-sm cursor-pointer"
                >
                  <motion.span 
                    className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shadow-sm"
                  >
                    <ChevronUp size={14} />
                  </motion.span>
                  Plan My Tour
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button 
            variants={headerItemVariants}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden ml-auto p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </motion.button>
        </motion.div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-[9998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.aside
                className="fixed top-0 right-0 h-full w-full bg-white/95 backdrop-blur-sm p-6 z-[9999] shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <div className="flex items-center justify-end mb-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 rounded-full hover:bg-gray-100 transition-all duration-200"
                    onClick={() => setOpen(false)}
                  >
                    <X size={28} />
                  </motion.button>
                </div>
                
                <nav className="flex flex-col gap-3 mb-12">
                  {sortedSubmenus?.map((menu, index) => {
                    const isActive = active === index;
                    const hasSubmenu = menu?.submenus?.length > 0;
                    // Sort submenus by order for mobile
                    const sortedSubItems = menu?.submenus 
                      ? [...menu.submenus].sort((a, b) => a.order - b.order) 
                      : [];
                    
                    return (
                      <motion.div 
                        key={menu._id} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="flex flex-col gap-1"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, paddingLeft: 20 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            hasSubmenu && setActive(isActive ? null : index)
                          }
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-red-50 hover:to-gray-50 transition-all duration-200 border ${
                            isActive ? "bg-gradient-to-r from-red-50 to-gray-50 text-red-600 border-red-200 shadow-sm" : "hover:border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className="w-6 h-6"
                              whileHover={{ scale: 1.1 }}
                            >
                              <CustomImage
                                src={menu?.icon}
                                alt="icon"
                                className="w-6 h-6 object-contain"
                              />
                            </motion.div>
                            {menu.name}
                          </div>
                          {hasSubmenu && (
                            <motion.div
                              animate={{ rotate: isActive ? 90 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronRight size={18} />
                            </motion.div>
                          )}
                        </motion.button>
                        
                        {hasSubmenu && isActive && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col ml-8 gap-2 overflow-hidden pl-2 border-l-2 border-red-200"
                          >
                            {sortedSubItems.map((sub, subIndex) => (
                              <motion.div
                                key={sub._id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + subIndex * 0.03 }}
                              >
                                <Link
                                  href={`/${menu.slug}/${sub.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="text-sm text-gray-600 py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 block"
                                >
                                  {sub.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile Services */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, paddingLeft: 20 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setActive(active === "services" ? null : "services")
                      }
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 border
                        ${
                          active === "services"
                            ? "bg-gradient-to-r from-red-50 to-gray-50 text-red-600 border-red-200 shadow-sm"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-gray-50 hover:border-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div className="w-6 h-6" whileHover={{ scale: 1.1 }}>
                          <Image
                            src={navItemIcon}
                            alt="Services icon"
                            className="w-6 h-6 object-contain"
                          />
                        </motion.div>
                        <span>Services</span>
                      </div>
                      <motion.div
                        animate={{ rotate: active === "services" ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    </motion.button>
                    
                    {active === "services" && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col ml-12 gap-2 overflow-hidden pl-2 border-l-2 border-red-200"
                      >
                        {STATIC_SERVICES.map((item, index) =>
                          item.slug ? (
                            <motion.div
                              key={item.slug}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + index * 0.03 }}
                            >
                              <Link
                                href={`/service/${item.slug}`}
                                onClick={() => setOpen(false)}
                                className="text-sm text-gray-600 py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 block"
                              >
                                {item.name}
                              </Link>
                            </motion.div>
                          ) : (
                            <span
                              key={item.name}
                              className="text-sm text-gray-400 py-2 px-3 cursor-not-allowed"
                            >
                              {item.name}
                            </span>
                          )
                        )}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Mobile Company */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-col gap-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, paddingLeft: 20 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setActive(active === "company" ? null : "company")
                      }
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 border
                        ${
                          active === "company"
                            ? "bg-gradient-to-r from-red-50 to-gray-50 text-red-600 border-red-200 shadow-sm"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-gray-50 hover:border-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div className="w-6 h-6" whileHover={{ scale: 1.1 }}>
                          <Image
                            src={companyIcon}
                            alt="Company icon"
                            className="w-6 h-6 object-contain"
                          />
                        </motion.div>
                        <span>Company</span>
                      </div>
                      <motion.div
                        animate={{ rotate: active === "company" ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    </motion.button>
                    
                    {active === "company" && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col ml-12 gap-2 overflow-hidden pl-2 border-l-2 border-red-200"
                      >
                        {COMPANY_MENU.map((item, index) => (
                          <motion.div
                            key={item.slug}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.03 }}
                          >
                            <Link
                              href={`/${item.slug}`}
                              onClick={() => setOpen(false)}
                              className="text-sm text-gray-600 py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 block"
                            >
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </nav>

                <Link href="/contact-us">
                  <motion.button 
                    variants={planTourButtonVariants}
                    animate="animate"
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 25px rgba(239,68,68,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border border-red-500/30 backdrop-blur-sm"
                  >
                    Plan My Tour
                  </motion.button>
                </Link>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}