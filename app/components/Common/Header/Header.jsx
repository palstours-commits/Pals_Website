"use client";
import navbar_logo from "@/app/assets/navbar_logo.svg";
import companyIcon from "@/app/assets/office-building.svg";
import navItemIcon from "@/app/assets/serive_home-icon-1.svg";
import CustomImage from "@/app/common/Image";
import { getSubMenus } from "@/app/store/slice/submenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Bus,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  CreditCard,
  FileText,
  Globe2,
  Hotel,
  Mail,
  Map,
  Menu,
  Phone,
  Plane,
  Sparkles,
  UserCircle,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// CSS filter for red-700 color
const red700Filter =
  "brightness(0) saturate(100%) invert(20%) sepia(89%) saturate(5000%) hue-rotate(355deg) brightness(90%) contrast(120%)";

// ✨ ENHANCED ANIMATION VARIANTS
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

// 🔥 UNIQUE GLASSMORPHISM DROPDOWN ANIMATION
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

const shimmerEffectVariants = {
  animate: {
    backgroundPosition:["200% 0", "-200% 0", "200% 0"],
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
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
  const[mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const { submenus } = useSelector((state) => state.submenu);

  const sortedSubmenus = submenus ? [...submenus].sort((a, b) => a.order - b.order) :[];

  // Desktop Navigation Auto-scroll States
  const navRef = useRef(null);
  const scrollDirRef = useRef(1);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  // Global Dropdown States & Refs
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const[hoveredDropdown, setHoveredDropdown] = useState(null);
  const[dropdownConfig, setDropdownConfig] = useState({ left: 0, top: 0, width: 288 });

  // ✨ GLOBAL POPUP LOGIC: Dynamically calculates position relative to outer header
  const handleMouseEnter = (e, menuId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (e.currentTarget && containerRef.current) {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const isStatic = menuId === "services" || menuId === "company";
      const dropdownWidth = isStatic ? 256 : 288; // w-64 vs w-72

      // Calculate the center point of the hovered button
      const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2;
      let leftPos = buttonCenterX - dropdownWidth / 2;

      // Ensure the dropdown doesn't overflow outside the max-w-7xl header
      if (leftPos < 0) leftPos = 0;
      if (leftPos + dropdownWidth > containerRect.width) {
        leftPos = containerRect.width - dropdownWidth;
      }

      setDropdownConfig({
        left: leftPos,
        top: buttonRect.bottom - containerRect.top + 8, // 8px gap below button
        width: dropdownWidth,
      });
    }
    setHoveredDropdown(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 150); // Small grace period when moving cursor
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDropdownMouseLeave = () => {
    handleMouseLeave();
  };

  // Scroll visibility arrows
  const checkScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  useEffect(() => {
    dispatch(getSubMenus());
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
        if (navRef.current && !isNavHovered && !hoveredDropdown) { // Pause if dropdown open
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

  const handleSubmenuClick = (menuSlug, subSlug) => {
    router.push(`/${menuSlug}/${subSlug}`);
    setHoveredDropdown(null);
    setOpen(false);
  };

  const handleMobileServiceClick = (service) => {
    if (service.slug) router.push(`/service/${service.slug}`);
    setOpen(false);
    setMobileDropdownOpen({});
  };

  const STATIC_SERVICES =[
    { name: "Flight", slug: "flight", icon: <Plane size={18} /> },
    { name: "Hotel", slug: "hotel", icon: <Hotel size={18} /> },
    { name: "Transport", slug: "transport", icon: <Bus size={18} /> },
    { name: "Money Exchange", icon: <CreditCard size={18} /> },
    { name: "Visa", slug: "visa", icon: <FileText size={18} /> },
  ];

  const COMPANY_MENU =[
    { name: "About Us", slug: "about-us", icon: <UserCircle size={18} /> },
    { name: "Blog", slug: "blog", icon: <FileText size={18} /> },
    { name: "Career", slug: "career", icon: <Calendar size={18} /> },
    { name: "Contact Us", slug: "contact-us", icon: <Mail size={18} /> },
  ];

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
        {/* Main Header Container Wrapper - Ref acts as bounds for Dropdowns */}
        <motion.div
          ref={containerRef}
          variants={headerContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 2xl:px-8 h-16 flex items-center relative"
        >
          {/* Logo */}
          <motion.div variants={headerItemVariants} className="z-10 md:relative top-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src={navbar_logo} alt="Pals Holidays" className="h-10 md:h-20 w-auto" priority />
            </Link>
          </motion.div>

          {/* Scrolling Navigation Wrapper */}
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
                overflowY: "hidden", // Completely removed padding hacks
                height: "100%",
                width: "100%",
                pointerEvents: "auto",
              }}
            >
              <div className="flex items-center gap-1 w-max px-4 h-full">
                {/* Dynamically Loaded Submenus */}
                {sortedSubmenus?.map((menu) => {
                  const hasSubmenu = menu?.submenus?.length > 0;
                  const isHovered = hoveredDropdown === menu._id;

                  return (
                    <motion.div
                      variants={headerItemVariants}
                      key={menu._id}
                      className="relative group h-full flex items-center"
                      onMouseEnter={(e) => hasSubmenu && handleMouseEnter(e, menu._id)}
                      onMouseLeave={() => hasSubmenu && handleMouseLeave()}
                    >
                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !hasSubmenu && router.push(`/${menu.slug}`)}
                        className={`group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          hasSubmenu ? "cursor-default" : "cursor-pointer"
                        } backdrop-blur-sm ${
                          isHovered
                            ? "text-red-600 bg-gradient-to-r from-red-50 to-red-100 shadow-lg shadow-red-200/50"
                            : "text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50"
                        } border border-transparent group-hover:border-red-200/50`}
                      >
                        <motion.div className="flex items-center justify-center w-5 h-5" whileHover={{ scale: 1.15, rotate: 360 }}>
                          {getMenuIcon(menu.name, menu?.icon)}
                        </motion.div>
                        <span>{menu.name}</span>
                        {hasSubmenu && (
                          <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.4 }}>
                            <ChevronDown size={14} className={isHovered ? "text-red-500" : "text-gray-400"} />
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}

                {/* Services Hover Button */}
                <motion.div
                  variants={headerItemVariants}
                  className="relative group h-full flex items-center"
                  onMouseEnter={(e) => handleMouseEnter(e, "services")}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    className={`group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-default ${
                      hoveredDropdown === "services"
                        ? "text-red-600 bg-gradient-to-r from-red-50 to-red-100 shadow-lg shadow-red-200/50"
                        : "text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50"
                    } border border-transparent group-hover:border-red-200/50`}
                  >
                    <Image src={navItemIcon} alt="Services" className="w-5 h-5 object-contain" style={{ filter: red700Filter }} />
                    <span>Services</span>
                    <motion.div animate={{ rotate: hoveredDropdown === "services" ? 180 : 0 }} transition={{ duration: 0.4 }}>
                      <ChevronDown size={14} className={hoveredDropdown === "services" ? "text-red-500" : "text-gray-400"} />
                    </motion.div>
                  </motion.button>
                </motion.div>

                {/* Company Hover Button */}
                <motion.div
                  variants={headerItemVariants}
                  className="relative group h-full flex items-center"
                  onMouseEnter={(e) => handleMouseEnter(e, "company")}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    className={`group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-default backdrop-blur-sm ${
                      hoveredDropdown === "company"
                        ? "text-red-600 bg-gradient-to-r from-red-50 to-red-100 shadow-lg shadow-red-200/50"
                        : "text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md hover:shadow-gray-100/50"
                    } border border-transparent group-hover:border-red-200/50`}
                  >
                    <Image src={companyIcon} alt="Company" className="w-5 h-5 object-contain" style={{ filter: red700Filter }} />
                    <span>Company</span>
                    <motion.div animate={{ rotate: hoveredDropdown === "company" ? 180 : 0 }} transition={{ duration: 0.4 }}>
                      <ChevronDown size={14} className={hoveredDropdown === "company" ? "text-red-500" : "text-gray-400"} />
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
                <motion.button whileHover={{ scale: 1.05, y: -3 }} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-xl transition-all duration-400 flex items-center gap-2 border border-red-500/30">
                  <Sparkles size={16} /> Plan My Tour
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* ✨ GLOBAL FLOATING DROPDOWN POPUP */}
          <AnimatePresence>
            {hoveredDropdown && (
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
                  zIndex: 99999, // Overlay scroll container and arrows
                  filter: "drop-shadow(0 25px 50px -12px rgba(0,0,0,0.25))",
                }}
              >
                <div className={`${glassmorphismBackdrop} rounded-2xl p-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />

                  {/* Rendering Content dynamically based on hovered button ID */}
                  <div className="relative z-10 space-y-1">
                    
                    {/* Services Content */}
                    {hoveredDropdown === "services" &&
                      STATIC_SERVICES.map((item) => (
                        <motion.div key={item.name} variants={floatingDropdownItemVariants} className="group/item">
                          {item.slug ? (
                            <Link href={`/service/${item.slug}`} onClick={() => setHoveredDropdown(null)} className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 flex items-center gap-3 group-hover/item:bg-white rounded-xl hover:text-red-600 cursor-pointer">
                              {item.name}
                            </Link>
                          ) : (
                            <div className="w-full text-left px-4 py-3 text-sm text-gray-400 flex items-center gap-3">
                              {item.name} (Coming soon)
                            </div>
                          )}
                        </motion.div>
                      ))}

                    {/* Company Content */}
                    {hoveredDropdown === "company" &&
                      COMPANY_MENU.map((item) => (
                        <motion.div key={item.slug} variants={floatingDropdownItemVariants} className="group/item">
                          <Link href={`/${item.slug}`} onClick={() => setHoveredDropdown(null)} className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 flex items-center gap-3 group-hover/item:bg-white rounded-xl hover:text-red-600 cursor-pointer">
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}

                    {/* Dynamic API Menus Content */}
                    {sortedSubmenus.map((menu) => {
                      if (hoveredDropdown === menu._id && menu.submenus?.length > 0) {
                        const sortedSubItems =[...menu.submenus].sort((a, b) => a.order - b.order);
                        return sortedSubItems.map((sub) => (
                          <motion.div key={sub._id} variants={floatingDropdownItemVariants} className="group/item">
                            <button onClick={() => handleSubmenuClick(menu.slug, sub.slug)} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 transition-all duration-300 flex items-center gap-3 group-hover/item:bg-white hover:text-red-600 cursor-pointer">
                              {sub.name}
                              {/* <ChevronRight size={16} className="ml-auto text-gray-400 group-hover/item:text-red-500" /> */}
                            </button>
                          </motion.div>
                        ));
                      }
                      return null;
                    })}

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu Button */}
          <motion.button variants={headerItemVariants} whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.95 }} className="lg:hidden ml-auto p-3 rounded-2xl hover:bg-red-50/50" onClick={() => setOpen(true)}>
            <Menu size={24} className="text-gray-700" />
          </motion.button>
        </motion.div>

        {/* --- Sidebar code continues unchanged below --- */}
        <AnimatePresence>
          {open && (
             // Sidebar overlay logic identical to original
             <>
               {/* Mobile Sidebar layout untouched for brevity in this snippet! Keep exactly as it was. */}
             </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}