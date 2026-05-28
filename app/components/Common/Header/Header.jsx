"use client";
import navbar_logo from "@/app/assets/navbar_logo.svg";
import companyIcon from "@/app/assets/office-building.svg";
import navItemIcon from "@/app/assets/serive_home-icon-1.svg";
import CustomImage from "@/app/common/Image";
import { getMenus } from "@/app/store/slice/submenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe2,
  Mail,
  Map,
  Menu,
  Phone,
  Sparkles,
  Tag,
  Users,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const red700Filter =
  "brightness(0) saturate(100%) invert(20%) sepia(89%) saturate(5000%) hue-rotate(355deg) brightness(90%) contrast(120%)";

const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
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

const glassmorphismDropdownVariants = {
  hidden: {
    opacity: 0,
    y: -15,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

const floatingDropdownItemVariants = {
  hidden: { opacity: 0, x: -10, y: 5 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 25 },
  },
};

const planTourButtonVariants = {
  animate: {
    scale: [1, 1.03, 1],
    transition: { duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
  },
};

const glassmorphismBackdrop = "bg-white border border-gray-200 shadow-xl";

const getMenuIcon = (menuName, iconPath) => {
  if (iconPath && iconPath !== navItemIcon && iconPath !== companyIcon) {
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <CustomImage
          src={iconPath}
          alt="icon"
          className="w-5 h-5 object-contain"
          style={{ filter: red700Filter }}
        />
      </div>
    );
  }

  const iconMap = {
    Destinations: <Globe2 size={18} className="text-red-600" />,
    Tours: <Compass size={18} className="text-red-600" />,
    Packages: <Map size={18} className="text-red-600" />,
    "Group Tours": <Users size={18} className="text-red-600" />,
    Corporate: <Building2 size={18} className="text-red-600" />,
  };

  return iconMap[menuName] || <Sparkles size={18} className="text-red-600" />;
};

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const { submenus } = useSelector((state) => state.submenu);

  const sortedSubmenus = submenus ? [...submenus].sort((a, b) => a.order - b.order) : [];

  const navRef = useRef(null);
  const scrollDirRef = useRef(1);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [dropdownConfig, setDropdownConfig] = useState({ left: 0, top: 0, width: 288 });

  const handleMouseEnter = (e, menuId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (e.currentTarget && containerRef.current && menuId === "special-offers") {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownWidth = 288;
      const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2;
      let leftPos = buttonCenterX - dropdownWidth / 2;
      if (leftPos < 0) leftPos = 0;
      if (leftPos + dropdownWidth > containerRect.width) {
        leftPos = containerRect.width - dropdownWidth;
      }
      setDropdownConfig({
        left: leftPos,
        top: buttonRect.bottom - containerRect.top + 8,
        width: dropdownWidth,
      });
      setHoveredDropdown(menuId);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDropdownMouseLeave = () => {
    handleMouseLeave();
  };

  const checkScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    setTimeout(checkScroll, 150);
    return () => window.removeEventListener("resize", checkScroll);
  }, [sortedSubmenus]);

  useEffect(() => {
    let animationId;
    let lastTime = performance.now();
    const playScroll = (time) => {
      if (time - lastTime > 40) {
        if (navRef.current && !isNavHovered && !hoveredDropdown) {
          const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
          if (scrollWidth > clientWidth) {
            const maxScroll = scrollWidth - clientWidth;
            navRef.current.scrollLeft += scrollDirRef.current * 1;
            if (navRef.current.scrollLeft >= maxScroll - 1) scrollDirRef.current = -1;
            else if (navRef.current.scrollLeft <= 0) scrollDirRef.current = 1;
          }
        }
        lastTime = time;
      }
      animationId = requestAnimationFrame(playScroll);
    };
    animationId = requestAnimationFrame(playScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isNavHovered, hoveredDropdown]);

  const toggleMobileDropdown = (menuId) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const SPECIAL_OFFERS_MENU = [
    { name: "Early Bird Offers", slug: "special-offers/early-bird" },
    { name: "EMI Offers", slug: "special-offers/emi" },
    { name: "Group Tours Offers", slug: "special-offers/group-tours" },
    { name: "Special Promo Offers", slug: "special-offers/special-promo" },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <motion.div
        variants={headerItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-light text-center py-2 hidden md:block"
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles size={14} />
          Black Friday Last-Minute Specials: Save up to $1,000 by 11/23 on trips departing this winter or spring.
          <Sparkles size={14} />
        </span>
      </motion.div>

      <header className="sticky top-0 z-[9999] bg-white shadow-lg border-b border-gray-200">
        <motion.div
          ref={containerRef}
          variants={headerContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-1 h-16 flex items-center relative"
        >
          <motion.div variants={headerItemVariants} className="z-10 md:relative top-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src={navbar_logo} alt="Pals Holidays" className="h-18 md:h-26 w-auto" priority />
            </Link>
          </motion.div>

          <div
            className="hidden lg:flex ml-8 max-w-[600px] 2xl:max-w-[760px] relative items-center h-12 w-full"
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}
          >
            <AnimatePresence>
              {showLeftArrow && (
                <motion.button
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  onClick={() => navRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
                  className="absolute left-0 top-0 z-[60] h-full px-1 bg-gradient-to-r from-white via-white/95 to-transparent flex items-center justify-start text-red-500 hover:text-red-700 pointer-events-auto"
                >
                  <ChevronLeft size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            <div
              ref={navRef}
              onScroll={checkScroll}
              className="hide-scrollbar scroll-smooth"
              style={{
                display: "flex",
                overflowX: "auto",
                overflowY: "hidden",
                height: "100%",
                width: "100%",
                pointerEvents: "auto",
              }}
            >
              <div className="flex items-center gap-1 min-w-max px-4 h-full">
                {sortedSubmenus?.map((menu) => (
                  <motion.div
                    variants={headerItemVariants}
                    key={menu._id}
                    className="relative group h-full flex items-center flex-shrink-0"
                  >
                    <motion.button
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(`/${menu.slug}`)}
                      className="group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50 border border-transparent group-hover:border-red-200/50 whitespace-nowrap"
                    >
                      <motion.div className="flex items-center justify-center w-5 h-5 flex-shrink-0" whileHover={{ scale: 1.15, rotate: 360 }}>
                        {getMenuIcon(menu.name, menu?.icon)}
                      </motion.div>
                      <span className="whitespace-nowrap">{menu.name}</span>
                    </motion.button>
                  </motion.div>
                ))}

                <motion.div
                  variants={headerItemVariants}
                  className="relative group h-full flex items-center flex-shrink-0"
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    onClick={() => router.push("/services")}
                    className="group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50 border border-transparent group-hover:border-red-200/50 whitespace-nowrap"
                  >
                    <Image src={navItemIcon} alt="Services" className="w-5 h-5 object-contain flex-shrink-0" style={{ filter: red700Filter }} />
                    <span>Services</span>
                  </motion.button>
                </motion.div>

                <motion.div
                  variants={headerItemVariants}
                  className="relative group h-full flex items-center flex-shrink-0"
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    onClick={() => router.push("/company")}
                    className="group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50 border border-transparent group-hover:border-red-200/50 whitespace-nowrap"
                  >
                    <Image src={companyIcon} alt="Company" className="w-5 h-5 object-contain flex-shrink-0" style={{ filter: red700Filter }} />
                    <span>Company</span>
                  </motion.button>
                </motion.div>

                <motion.div
                  variants={headerItemVariants}
                  className="relative group h-full flex items-center flex-shrink-0"
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    onClick={() => router.push("/car-rentals")}
                    className="group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50 border border-transparent group-hover:border-red-200/50 whitespace-nowrap"
                  >
                    <div className="w-5 h-5 flex items-center justify-center text-red-600 flex-shrink-0">
                      <Car size={18} />
                    </div>
                    <span>Car Rentals</span>
                  </motion.button>
                </motion.div>

                <motion.div
                  variants={headerItemVariants}
                  className="relative group h-full flex items-center flex-shrink-0"
                  onMouseEnter={(e) => handleMouseEnter(e, "special-offers")}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    className={`group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-default backdrop-blur-sm whitespace-nowrap ${hoveredDropdown === "special-offers"
                      ? "text-red-600 bg-gradient-to-r from-red-50 to-red-100 shadow-lg shadow-red-200/50"
                      : "text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50"
                      } border border-transparent group-hover:border-red-200/50`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center text-red-600 flex-shrink-0">
                      <Tag size={18} />
                    </div>
                    <span>Special Offers</span>
                    <motion.div animate={{ rotate: hoveredDropdown === "special-offers" ? 180 : 0 }} transition={{ duration: 0.4 }}>
                      <ChevronDown size={14} className={hoveredDropdown === "special-offers" ? "text-red-500" : "text-gray-400"} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {showRightArrow && (
                <motion.button
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  onClick={() => navRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
                  className="absolute right-0 top-0 z-[60] h-full px-1 bg-gradient-to-l from-white via-white/95 to-transparent flex items-center justify-end text-red-500 hover:text-red-700 pointer-events-auto"
                >
                  <ChevronRight size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div variants={headerItemVariants} className="hidden 2xl:flex items-center gap-6 ml-auto z-10 pl-4">
            <div className="flex items-center gap-3 text-gray-700">
              <motion.a href="tel:+919841255715" whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "#FEE2E2" }} className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:text-red-600 shadow-lg bg-white">
                <Phone size={20} />
              </motion.a>
              <motion.a href="mailto:mail@palsholidays.com" whileHover={{ scale: 1.1, rotate: -5, backgroundColor: "#FEE2E2" }} className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:text-red-600 shadow-lg bg-white">
                <Mail size={20} />
              </motion.a>
            </div>
            <motion.div variants={planTourButtonVariants} animate="animate">
              <Link href="/contact-us">
                <motion.button whileHover={{ scale: 1.05, y: -3 }} className="bg-gradient-to-r from-red-600 to-red-700 flex items-center text-white px-4 py-3 rounded-2xl text-sm font-bold shadow-xl transition-all duration-400 flex items-center gap-2 border border-red-500/30 cursor-pointer">
                  <Sparkles size={16} /> Plan My Tour
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {hoveredDropdown === "special-offers" && (
              <motion.div
                variants={glassmorphismDropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                style={{
                  position: "absolute",
                  left: dropdownConfig.left,
                  top: dropdownConfig.top,
                  width: dropdownConfig.width,
                  zIndex: 99999,
                  filter: "drop-shadow(0 25px 50px -12px rgba(0,0,0,0.25))",
                }}
              >
                <div className={`${glassmorphismBackdrop} rounded-2xl p-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />
                  <div className="relative z-10 space-y-1">
                    {SPECIAL_OFFERS_MENU.map((item) => (
                      <motion.div key={item.slug} variants={floatingDropdownItemVariants} className="group/item">
                        <Link href={`/${item.slug}`} onClick={() => setHoveredDropdown(null)} className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 flex items-center gap-3 group-hover/item:bg-white rounded-xl hover:text-red-600 cursor-pointer">
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button variants={headerItemVariants} whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.95 }} className="lg:hidden ml-auto p-3 rounded-2xl hover:bg-red-50/50 cursor-pointer" onClick={() => setOpen(true)}>
            <Menu size={24} className="text-gray-700" />
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="fixed top-0 right-0 w-[85vw] max-w-sm h-[100dvh] bg-white shadow-2xl z-[99999] flex flex-col overflow-hidden lg:hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm">
                  <Image src={navbar_logo} alt="Pals Holidays" className="h-8 w-auto" />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 bg-gray-50 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                  {sortedSubmenus?.map((menu, index) => {
                    const menuKey = menu.slug || menu.name || `menu-${index}`;
                    return (
                      <div key={menuKey} className="border-b border-gray-50/50 pb-1">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/${menu.slug}`);
                            setOpen(false);
                          }}
                          className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-semibold hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 flex items-center justify-center">
                              {getMenuIcon(menu.name, menu?.icon)}
                            </div>
                            <span>{menu.name}</span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                  <div className="border-b border-gray-50/50 pb-1">
                    <button
                      onClick={() => {
                        router.push("/services");
                        setOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-semibold hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 cursor-pointer">
                        <Image src={navItemIcon} alt="Services" className="w-5 h-5 object-contain" style={{ filter: red700Filter }} />
                        <span>Services</span>
                      </div>
                    </button>
                  </div>
                  <div className="border-b border-gray-50/50 pb-1">
                    <button
                      onClick={() => {
                        router.push("/company");
                        setOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-semibold hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 cursor-pointer">
                        <Image src={companyIcon} alt="Company" className="w-5 h-5 object-contain" style={{ filter: red700Filter }} />
                        <span>Company</span>
                      </div>
                    </button>
                  </div>
                  <div className="border-b border-gray-50/50 pb-1">
                    <button
                      onClick={() => {
                        router.push("/car-rentals");
                        setOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-semibold hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 cursor-pointer text-red-600">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <Car size={18} />
                        </div>
                        <span className="text-gray-700 group-hover:text-red-600 transition-colors">Car Rentals</span>
                      </div>
                    </button>
                  </div>
                  <div className="border-b border-gray-50/50 pb-1">
                    <button
                      onClick={() => toggleMobileDropdown("special-offers")}
                      className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-semibold hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 cursor-pointer text-red-600">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <Tag size={18} />
                        </div>
                        <span className="text-gray-700 group-hover:text-red-600 transition-colors">Special Offers</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${mobileDropdownOpen["special-offers"] ? "rotate-180 text-red-600" : "text-gray-400"}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileDropdownOpen["special-offers"] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-10 pr-2 py-2 space-y-1 border-l-2 border-red-100 ml-4 mb-2">
                            {SPECIAL_OFFERS_MENU.map((item) => (
                              <button
                                key={item.slug}
                                onClick={() => {
                                  router.push(`/${item.slug}`);
                                  setOpen(false);
                                }}
                                className="w-full text-left py-2 px-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 mt-auto border-t border-gray-100">
                  <div className="flex justify-center gap-4 mb-4">
                    <a
                      href="tel:+919841255715"
                      className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-200 transition-all"
                    >
                      <Phone size={20} />
                    </a>
                    <a
                      href="mailto:mail@palsholidays.com"
                      className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-200 transition-all"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      router.push('/contact-us');
                      setOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  >
                    <Sparkles size={18} />
                    Plan My Tour
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}