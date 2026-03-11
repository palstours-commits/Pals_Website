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
  Users,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// CSS filter for red-700 color
const red700Filter = 'brightness(0) saturate(100%) invert(20%) sepia(89%) saturate(5000%) hue-rotate(355deg) brightness(90%) contrast(120%)';

// ✨ ENHANCED ANIMATION VARIANTS
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

// 🔥 UNIQUE GLASSMORPHISM DROPDOWN ANIMATION
const glassmorphismDropdownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    rotateX: -10,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.92,
    rotateX: -5,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};

// ✨ FLOATING DROPDOWN ITEMS
const floatingDropdownItemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    y: 10,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 25,
      delay: 0.1
    }
  }
};

// ✨ SHIMMER EFFECT
const shimmerEffectVariants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0", "200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
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

// Glassmorphism backdrop filter
const glassmorphismBackdrop = "backdrop-blur-xl bg-white/85 border border-white/60 shadow-2xl shadow-black/5";

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
    'Destinations': <Globe2 size={18} className="text-red-600" />,
    'Tours': <Compass size={18} className="text-red-600" />,
    'Packages': <Map size={18} className="text-red-600" />,
    'Group Tours': <Users size={18} className="text-red-600" />,
    'Corporate': <Building2 size={18} className="text-red-600" />
  };
  
  return iconMap[menuName] || <Sparkles size={18} className="text-red-600" />;
};

const getServiceIcon = (serviceName) => {
  const iconMap = {
    'Flight': <Plane size={18} className="text-red-600" />,
    'Hotel': <Hotel size={18} className="text-red-600" />,
    'Transport': <Bus size={18} className="text-red-600" />,
    'Money Exchange': <CreditCard size={18} className="text-red-600" />,
    'Visa': <FileText size={18} className="text-red-600" />
  };
  return iconMap[serviceName] || <Sparkles size={18} className="text-red-600" />;
};

const getCompanyIcon = (companyItem) => {
  const iconMap = {
    'About Us': <UserCircle size={18} className="text-red-600" />,
    'Blog': <FileText size={18} className="text-red-600" />,
    'Career': <Calendar size={18} className="text-red-600" />,
    'Contact Us': <Mail size={18} className="text-red-600" />
  };
  return iconMap[companyItem] || <Building2 size={18} className="text-red-600" />;
};

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const { submenus } = useSelector((state) => state.submenu);

  const sortedSubmenus = submenus ? [...submenus].sort((a, b) => a.order - b.order) : [];

  useEffect(() => {
    dispatch(getSubMenus());
  }, [dispatch]);

  const handleSubmenuClick = (menuSlug, subSlug) => {
    router.push(`/${menuSlug}/${subSlug}`);
    setHoveredDropdown(null);
    setOpen(false);
  };

  const handleMainMenuClick = (menuId, hasSubmenu) => {
    if (hasSubmenu) {
      setMobileDropdownOpen(prev => ({
        ...prev,
        [menuId]: !prev[menuId]
      }));
    } else {
      // If no submenu, navigate to the menu page
      const menu = sortedSubmenus.find(m => m._id === menuId);
      if (menu) {
        router.push(`/${menu.slug}`);
        setOpen(false);
      }
    }
  };

  const handleMobileServiceClick = (service) => {
    if (service.slug) {
      router.push(`/service/${service.slug}`);
      setOpen(false);
    }
    setMobileDropdownOpen({});
  };

  const handleMobileCompanyClick = (item) => {
    router.push(`/${item.slug}`);
    setOpen(false);
    setMobileDropdownOpen({});
  };

  const toggleMobileServices = () => {
    setMobileDropdownOpen(prev => ({
      ...prev,
      'mobile-services': !prev['mobile-services']
    }));
  };

  const toggleMobileCompany = () => {
    setMobileDropdownOpen(prev => ({
      ...prev,
      'mobile-company': !prev['mobile-company']
    }));
  };

  const STATIC_SERVICES = [
    { name: "Flight", slug: "flight", icon: <Plane size={18} /> },
    { name: "Hotel", slug: "hotel", icon: <Hotel size={18} /> },
    { name: "Transport", slug: "transport", icon: <Bus size={18} /> },
    { name: "Money Exchange", icon: <CreditCard size={18} /> },
    { name: "Visa", slug: "visa", icon: <FileText size={18} /> },
  ];

  const COMPANY_MENU = [
    { name: "About Us", slug: "about-us", icon: <UserCircle size={18} /> },
    { name: "Blog", slug: "blog", icon: <FileText size={18} /> },
    { name: "Career", slug: "career", icon: <Calendar size={18} /> },
    { name: "Contact Us", slug: "contact-us", icon: <Mail size={18} /> },
  ];

  return (
    <>
      {/* Animated Top Banner */}
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

      <header className="sticky top-0 z-[9999] bg-white/80 shadow-2xl border-b border-white/50">
        {/* Main Header Container */}
        <motion.div 
  variants={headerContainerVariants}
  initial="hidden"
  animate="visible"
  className="max-w-7xl mx-auto px-4 sm:px-6 2xl:px-8 h-16 flex items-center justify-between"
>
  {/* Logo */}
  <motion.div variants={headerItemVariants} className="flex-shrink-0 z-10">
    <Link href="/" className="flex items-center gap-3">
      <Image
        src={navbar_logo} 
        alt="Pals Holidays"
        className="h-10 md:h-20 w-auto hover:scale-105 transition-all duration-500 hover:rotate-3"
        priority
      />
    </Link>
  </motion.div>

  {/* Desktop Navigation - Scrollable Container */}
  <nav className="hidden lg:flex flex-1 min-w-0 px-4">
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide scroll-container">
      {sortedSubmenus?.map((menu, index) => {
        const hasSubmenu = menu?.submenus?.length > 0;
        const sortedSubItems = menu?.submenus 
          ? [...menu.submenus].sort((a, b) => a.order - b.order) 
          : [];
        const isHovered = hoveredDropdown === menu._id;
        
        return (
          <motion.div
            variants={headerItemVariants}
            key={menu._id}
            className="relative group flex-shrink-0"
            onMouseEnter={() => setHoveredDropdown(menu._id)}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !hasSubmenu && router.push(`/${menu.slug}`)}
              className={`group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                hasSubmenu ? 'cursor-default' : 'cursor-pointer'
              } backdrop-blur-sm whitespace-nowrap
                ${isHovered 
                  ? 'text-red-600 bg-gradient-to-r from-red-50/90 to-red-100/90 shadow-lg shadow-red-200/50' 
                  : 'text-gray-700 hover:text-red-600 hover:bg-white/70 hover:shadow-md hover:shadow-gray-100/50'
                } border border-transparent group-hover:border-red-200/50`}
            >
              <motion.div 
                className="flex items-center justify-center w-5 h-5 flex-shrink-0"
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                {getMenuIcon(menu.name, menu?.icon)}
              </motion.div>
              
              <span className="truncate max-w-[120px]">{menu.name}</span>
              
              {hasSubmenu && (
                <motion.div
                  className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ChevronDown size={14} className={isHovered ? 'text-red-500' : 'text-gray-400'} />
                </motion.div>
              )}
            </motion.button>

            {/* ✨ ENHANCED GLASSMORPHISM DROPDOWN */}
            <AnimatePresence>
              {hasSubmenu && isHovered && (
                <motion.div 
                  variants={glassmorphismDropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-50"
                  style={{ 
                    filter: "drop-shadow(0 25px 50px -12px rgba(0,0,0,0.25))"
                  }}
                >
                  {/* Shimmer Background */}
                  <motion.div 
                    variants={shimmerEffectVariants}
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      backgroundSize: "200% 100%",
                      mask: "linear-gradient(90deg, transparent, white, transparent)"
                    }}
                  />
                  
                  <div className={`${glassmorphismBackdrop} rounded-2xl p-4 relative overflow-hidden`}>
                    {/* Subtle glow border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />
                    
                    <div className="relative z-10 space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent">
                      {sortedSubItems.map((sub, subIndex) => (
                        <motion.div
                          key={sub._id}
                          variants={floatingDropdownItemVariants}
                          className="group/item"
                        >
                          <motion.button
                            whileHover={{ 
                              x: 4, 
                              scale: 1.02,
                              backgroundColor: "#FEF2F2",
                              color: "#DC2626"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSubmenuClick(menu.slug, sub.slug)}
                            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 transition-all duration-300 flex items-center gap-3 group-hover/item:bg-red-50/80 group-hover/item:shadow-sm border border-transparent group-hover/item:border-red-200/50 overflow-hidden relative cursor-pointer"
                          >
                            <span className="font-medium truncate flex-1">{sub.name}</span>
                            
                            <motion.div 
                              className="flex-shrink-0 flex items-center"
                              initial={{ x: 5, opacity: 0 }}
                              whileHover={{ x: 8 }}
                              transition={{ type: "spring" }}
                            >
                              <ChevronRight size={16} className="text-gray-400 group-hover/item:text-red-500 transition-colors" />
                            </motion.div>
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* ✨ ENHANCED SERVICES DROPDOWN */}
      <motion.div
        variants={headerItemVariants}
        className="relative group flex-shrink-0"
        onMouseEnter={() => setHoveredDropdown('services')}
        onMouseLeave={() => setHoveredDropdown(null)}
      >
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-default backdrop-blur-sm whitespace-nowrap
            ${
              hoveredDropdown === 'services'
                ? "text-red-600 bg-gradient-to-r from-red-50/90 to-red-100/90 shadow-lg shadow-red-200/50"
                : "text-gray-700 hover:text-red-600 hover:bg-white/70 hover:shadow-md hover:shadow-gray-100/50"
            } border border-transparent group-hover:border-red-200/50`}
        >
          <motion.div 
            className="w-5 h-5 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.15, rotate: 360 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={navItemIcon}
              alt="Services"
              className="w-5 h-5 object-contain"
              style={{ filter: red700Filter }}
            />
          </motion.div>
          <span>Services</span>
          <motion.div
            className="w-5 h-5 flex items-center justify-center flex-shrink-0"
            animate={{ rotate: hoveredDropdown === 'services' ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ChevronDown size={14} className={hoveredDropdown === 'services' ? 'text-red-500' : 'text-gray-400'} />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {hoveredDropdown === 'services' && (
            <motion.div 
              variants={glassmorphismDropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64 z-50"
              style={{ 
                filter: "drop-shadow(0 25px 50px -12px rgba(0,0,0,0.25))"
              }}
            >
              <motion.div 
                variants={shimmerEffectVariants}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-100 rounded-2xl"
                style={{
                  backgroundSize: "200% 100%",
                  mask: "linear-gradient(90deg, transparent, white, transparent)"
                }}
              />
              
              <div className={`${glassmorphismBackdrop} rounded-2xl p-4 relative overflow-hidden`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />
                
                <div className="relative z-10 space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent">
                  {STATIC_SERVICES.map((item, index) => (
                    <motion.div
                      key={item.name}
                      variants={floatingDropdownItemVariants}
                      className="group/item"
                    >
                      {item.slug ? (
                        <Link 
                          href={`/service/${item.slug}`}
                          onClick={() => setHoveredDropdown(null)}
                          className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 flex items-center gap-3 group-hover/item:bg-red-50/80 group-hover/item:shadow-sm group-hover/item:scale-[1.02] rounded-xl border border-transparent group-hover/item:border-red-200/50 overflow-hidden relative hover:text-red-600"
                        >
                          <motion.div 
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-sm"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {item.icon}
                          </motion.div>
                          <span className="font-medium truncate flex-1">{item.name}</span>
                          <motion.div 
                            className="flex-shrink-0 flex items-center"
                            initial={{ x: 5, opacity: 0 }}
                            whileHover={{ x: 8 }}
                          >
                            <ChevronRight size={16} className="text-gray-400 group-hover/item:text-red-500" />
                          </motion.div>
                        </Link>
                      ) : (
                        <div className="w-full text-left px-4 py-3 text-sm text-gray-400 cursor-not-allowed flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            {item.icon}
                          </div>
                          <span className="truncate">{item.name} (Coming soon)</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ✨ ENHANCED COMPANY DROPDOWN */}
      <motion.div
        variants={headerItemVariants}
        className="relative group flex-shrink-0"
        onMouseEnter={() => setHoveredDropdown('company')}
        onMouseLeave={() => setHoveredDropdown(null)}
      >
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group-hover-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-default backdrop-blur-sm whitespace-nowrap
            ${
              hoveredDropdown === 'company'
                ? "text-red-600 bg-gradient-to-r from-red-50/90 to-red-100/90 shadow-lg shadow-red-200/50"
                : "text-gray-700 hover:text-red-600 hover:bg-white/70 hover:shadow-md hover:shadow-gray-100/50"
            } border border-transparent group-hover:border-red-200/50`}
        >
          <motion.div 
            className="w-5 h-5 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.15, rotate: 360 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={companyIcon}
              alt="Company"
              className="w-5 h-5 object-contain"
              style={{ filter: red700Filter }}
            />
          </motion.div>
          <span>Company</span>
          <motion.div
            className="w-5 h-5 flex items-center justify-center flex-shrink-0"
            animate={{ rotate: hoveredDropdown === 'company' ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ChevronDown size={14} className={hoveredDropdown === 'company' ? 'text-red-500' : 'text-gray-400'} />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {hoveredDropdown === 'company' && (
            <motion.div 
              variants={glassmorphismDropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64 z-50"
              style={{ 
                filter: "drop-shadow(0 25px 50px -12px rgba(0,0,0,0.25))"
              }}
            >
              <motion.div 
                variants={shimmerEffectVariants}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-100 rounded-2xl"
                style={{
                  backgroundSize: "200% 100%",
                  mask: "linear-gradient(90deg, transparent, white, transparent)"
                }}
              />
              
              <div className={`${glassmorphismBackdrop} rounded-2xl p-4 relative overflow-hidden`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />
                
                <div className="relative z-10 space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent">
                  {COMPANY_MENU?.map((item, index) => (
                    <motion.div
                      key={item.slug}
                      variants={floatingDropdownItemVariants}
                      className="group/item"
                    >
                      <Link 
                        href={`/${item.slug}`}
                        onClick={() => setHoveredDropdown(null)}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 flex items-center gap-3 group-hover/item:bg-red-50/80 group-hover/item:shadow-sm group-hover/item:scale-[1.02] rounded-xl border border-transparent group-hover/item:border-red-200/50 overflow-hidden relative hover:text-red-600"
                      >
                        <motion.div 
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-sm"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="font-medium truncate flex-1">{item.name}</span>
                        <motion.div 
                          className="flex-shrink-0 flex items-center"
                          initial={{ x: 5, opacity: 0 }}
                          whileHover={{ x: 8 }}
                        >
                          <ChevronRight size={16} className="text-gray-400 group-hover/item:text-red-500" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  </nav>

  {/* Right Side - Phone/Email & CTA */}
  <motion.div variants={headerItemVariants} className="hidden 2xl:flex items-center gap-6 flex-shrink-0 ml-auto">
    <div className="flex items-center gap-3 text-gray-700">
      <motion.a
        href="tel:+919841255715"
        aria-label="Call PALS Holidays"
        whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "#FEE2E2" }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:text-red-600 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm flex-shrink-0"
      >
        <Phone size={20} />
      </motion.a>
      <motion.a
        href="mailto:mail@palsholidays.com"
        aria-label="Email PALS Holidays"
        whileHover={{ scale: 1.1, rotate: -5, backgroundColor: "#FEE2E2" }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:text-red-600 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm flex-shrink-0"
      >
        <Mail size={20} />
      </motion.a>
    </div>
    
    <motion.div variants={planTourButtonVariants} animate="animate" className="flex-shrink-0">
      <Link href="/contact-us">
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            y: -3, 
            boxShadow: "0 25px 40px -12px rgba(239,68,68,0.4)",
            background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)"
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl transition-all duration-400 flex items-center gap-2 border border-red-500/30 backdrop-blur-md cursor-pointer relative overflow-hidden group whitespace-nowrap"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={16} />
            Plan My Tour
          </span>
        </motion.button>
      </Link>
    </motion.div>
  </motion.div>

  {/* Mobile Menu Button */}
  <motion.button 
    variants={headerItemVariants}
    whileHover={{ scale: 1.1, rotate: 180 }}
    whileTap={{ scale: 0.95 }}
    className="lg:hidden ml-auto p-3 rounded-2xl hover:bg-red-50/50 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-200 flex-shrink-0"
    onClick={() => setOpen(true)}
  >
    <Menu size={24} className="text-gray-700" />
  </motion.button>
</motion.div>

        {/* Mobile Sidebar - Enhanced with API data */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.aside
                className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white/95 backdrop-blur-3xl p-6 z-[9999] shadow-2xl border-l border-white/50 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.div 
                    className="flex items-center gap-3 p-2 rounded-2xl bg-gradient-to-r from-red-50 to-red-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={navbar_logo}
                      alt="Pals Holidays"
                      className="h-10 w-auto"
                    />
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-2xl hover:bg-red-50 transition-all duration-200 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                  >
                    <X size={24} className="text-gray-700" />
                  </motion.button>
                </div>
                
                {/* Mobile Navigation - Using API data */}
                <nav className="flex flex-col gap-3 mb-6">
                  {/* Dynamic Menu Items from API */}
                  {sortedSubmenus?.map((menu) => {
                    const hasSubmenu = menu?.submenus?.length > 0;
                    const sortedSubItems = menu?.submenus 
                      ? [...menu.submenus].sort((a, b) => a.order - b.order) 
                      : [];
                    const isMobileDropdownOpen = mobileDropdownOpen[menu._id];
                    
                    return (
                      <motion.div 
                        key={menu._id} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-1"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, paddingLeft: 16 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleMainMenuClick(menu._id, hasSubmenu)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 border border-gray-200 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-red-200 ${
                            isMobileDropdownOpen ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-red-200 shadow-md" : "bg-white/80"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-sm backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              {menu?.icon && menu.icon !== navItemIcon && menu.icon !== companyIcon ? (
                                <CustomImage
                                  src={menu?.icon}
                                  alt="icon"
                                  className="w-5 h-5 object-contain"
                                  style={{ filter: red700Filter }}
                                />
                              ) : (
                                <Sparkles size={16} className="text-red-600" />
                              )}
                            </motion.div>
                            <span className="text-sm">{menu.name}</span>
                          </div>
                          {hasSubmenu && (
                            <motion.div
                              animate={{ rotate: isMobileDropdownOpen ? 90 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronRight size={18} className={isMobileDropdownOpen ? "text-red-600" : "text-gray-400"} />
                            </motion.div>
                          )}
                        </motion.button>
                        
                        {/* Submenu Items */}
                        <AnimatePresence>
                          {hasSubmenu && isMobileDropdownOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-col ml-4 gap-2 overflow-hidden pl-3 border-l-2 border-red-200 bg-red-50/30 rounded-r-xl mt-1"
                            >
                              {sortedSubItems.map((sub) => (
                                <motion.div
                                  key={sub._id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                >
                                  <button
                                    onClick={() => {
                                      handleSubmenuClick(menu.slug, sub.slug);
                                      setOpen(false);
                                    }}
                                    className="w-full text-left text-sm font-medium text-gray-600 py-2.5 px-3 rounded-lg hover:bg-white hover:text-red-600 hover:shadow-sm transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-red-200 flex items-center gap-2"
                                  >
                                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shadow-sm">
                                      <Sparkles size={12} className="text-red-500" />
                                    </div>
                                    <span className="truncate">{sub.name}</span>
                                  </button>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile Services Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, paddingLeft: 16 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={toggleMobileServices}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 border border-gray-200 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-red-200 ${
                        mobileDropdownOpen['mobile-services'] ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-red-200 shadow-md" : "bg-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-sm backdrop-blur-sm"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Image
                            src={navItemIcon}
                            alt="Services"
                            className="w-5 h-5 object-contain"
                            style={{ filter: red700Filter }}
                          />
                        </motion.div>
                        <span className="text-sm">Services</span>
                      </div>
                      <motion.div
                        animate={{ rotate: mobileDropdownOpen['mobile-services'] ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight size={18} className={mobileDropdownOpen['mobile-services'] ? "text-red-600" : "text-gray-400"} />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {mobileDropdownOpen['mobile-services'] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col ml-4 gap-2 overflow-hidden pl-3 border-l-2 border-red-200 bg-red-50/30 rounded-r-xl mt-1"
                        >
                          {STATIC_SERVICES.map((item) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                            >
                              {item.slug ? (
                                <button
                                  onClick={() => handleMobileServiceClick(item)}
                                  className="w-full text-left text-sm font-medium text-gray-600 py-2.5 px-3 rounded-lg hover:bg-white hover:text-red-600 hover:shadow-sm transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-red-200 flex items-center gap-2"
                                >
                                  <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shadow-sm">
                                    {item.icon}
                                  </div>
                                  <span>{item.name}</span>
                                </button>
                              ) : (
                                <div className="w-full text-left text-sm font-medium text-gray-400 py-2.5 px-3 rounded-lg flex items-center gap-2 cursor-not-allowed">
                                  <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                                    {item.icon}
                                  </div>
                                  <span>{item.name} (Coming soon)</span>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Mobile Company Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, paddingLeft: 16 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={toggleMobileCompany}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 border border-gray-200 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-red-200 ${
                        mobileDropdownOpen['mobile-company'] ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-red-200 shadow-md" : "bg-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-sm backdrop-blur-sm"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Image
                            src={companyIcon}
                            alt="Company"
                            className="w-5 h-5 object-contain"
                            style={{ filter: red700Filter }}
                          />
                        </motion.div>
                        <span className="text-sm">Company</span>
                      </div>
                      <motion.div
                        animate={{ rotate: mobileDropdownOpen['mobile-company'] ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight size={18} className={mobileDropdownOpen['mobile-company'] ? "text-red-600" : "text-gray-400"} />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {mobileDropdownOpen['mobile-company'] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col ml-4 gap-2 overflow-hidden pl-3 border-l-2 border-red-200 bg-red-50/30 rounded-r-xl mt-1"
                        >
                          {COMPANY_MENU.map((item) => (
                            <motion.div
                              key={item.slug}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                            >
                              <button
                                onClick={() => handleMobileCompanyClick(item)}
                                className="w-full text-left text-sm font-medium text-gray-600 py-2.5 px-3 rounded-lg hover:bg-white hover:text-red-600 hover:shadow-sm transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-red-200 flex items-center gap-2"
                              >
                                <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shadow-sm">
                                  {item.icon}
                                </div>
                                <span>{item.name}</span>
                              </button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </nav>

                {/* Mobile Contact Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                  <div className="flex items-center justify-around">
                    <motion.a
                      href="tel:+919841255715"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Phone size={18} className="text-red-600" />
                      </div>
                      <span className="text-xs text-gray-600">Call</span>
                    </motion.a>
                    <motion.a
                      href="mailto:mail@palsholidays.com"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Mail size={18} className="text-red-600" />
                      </div>
                      <span className="text-xs text-gray-600">Email</span>
                    </motion.a>
                  </div>
                </div>

                {/* Mobile CTA Button */}
                <Link href="/contact-us" onClick={() => setOpen(false)}>
                  <motion.button 
                    variants={planTourButtonVariants}
                    animate="animate"
                    whileHover={{ 
                      scale: 1.03, 
                      y: -2, 
                      boxShadow: "0 20px 40px -10px rgba(239,68,68,0.4)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-base bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-400 border border-red-500/30 backdrop-blur-xl flex items-center justify-center gap-2"
                  >
                    <Sparkles size={18} />
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