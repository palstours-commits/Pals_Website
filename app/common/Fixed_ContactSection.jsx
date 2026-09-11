"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "@/app/store/slice/submenuSlice";

import CustomImage from "@/app/common/Image";
import navItemIcon from "@/app/assets/serive_home-icon-1.svg";
import companyIcon from "@/app/assets/office-building.svg";

import {
  FaGlobe,
  FaCompass,
  FaMap,
  FaUsers,
  FaBuilding,
  FaPlane,
  FaShip,
  FaHeart,
  FaMountain,
  FaChurch,
  FaLandmark,
  FaStar,
  FaSuitcase,
  FaUmbrellaBeach,
  FaTree,
  FaCamera,
  FaBicycle,
  FaHiking,
  FaSpa,
  FaShoppingBag,
  FaUtensils,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { FaBars } from "react-icons/fa6";


/* =========================================================
   MENU ICON
========================================================= */

const getMenuIcon = (
  menuName,
  iconPath,
  size = 18,
  className = "text-red-600"
) => {
  if (
    iconPath &&
    iconPath !== navItemIcon &&
    iconPath !== companyIcon
  ) {
    return (
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        <CustomImage
          src={iconPath}
          alt="icon"
          className={`object-contain ${
            iconPath ? "w-20 h-20" : "w-10 h-10"
          }`}
        />
      </div>
    );
  }

  const iconMap = {
    Destinations: (
      <FaGlobe size={size} className={className} />
    ),
    Tours: (
      <FaCompass size={size} className={className} />
    ),
    Packages: (
      <FaMap size={size} className={className} />
    ),
    "Group Tours": (
      <FaUsers size={size} className={className} />
    ),
    Corporate: (
      <FaBuilding size={size} className={className} />
    ),
    India: (
      <FaLandmark size={size} className={className} />
    ),
    International: (
      <FaPlane size={size} className={className} />
    ),
    Honeymoon: (
      <FaHeart size={size} className={className} />
    ),
    Cruise: (
      <FaShip size={size} className={className} />
    ),
    Spiritual: (
      <FaChurch size={size} className={className} />
    ),
    Adventure: (
      <FaMountain size={size} className={className} />
    ),
    Beach: (
      <FaUmbrellaBeach
        size={size}
        className={className}
      />
    ),
    Wildlife: (
      <FaTree size={size} className={className} />
    ),
    Cultural: (
      <FaCamera size={size} className={className} />
    ),
    Cycling: (
      <FaBicycle size={size} className={className} />
    ),
    Hiking: (
      <FaHiking size={size} className={className} />
    ),
    Wellness: (
      <FaSpa size={size} className={className} />
    ),
    Shopping: (
      <FaShoppingBag
        size={size}
        className={className}
      />
    ),
    Food: (
      <FaUtensils
        size={size}
        className={className}
      />
    ),
    Nightlife: (
      <FaMoon size={size} className={className} />
    ),
    Luxury: (
      <FaStar size={size} className={className} />
    ),
    Budget: (
      <FaSuitcase
        size={size}
        className={className}
      />
    ),
    Relaxation: (
      <FaSun size={size} className={className} />
    ),
  };

  return (
    iconMap[menuName] || (
      <FaGlobe
        size={size}
        className={className}
      />
    )
  );
};


/* =========================================================
   FIRST MENU ICON
========================================================= */

const getFirstMenuIcon = (
  menus,
  size = 22,
  className = "text-red-600"
) => {
  if (!menus || menus.length === 0) {
    return null;
  }

  return (
    <FaBars
      size={size}
      className={className}
    />
  );
};


/* =========================================================
   MENU ITEM
========================================================= */

const MenuItem = ({
  menu,
  expandedMenus,
  toggleAccordion,
  handleNavigate,
  depth = 0,
}) => {
  const hasChildren =
    menu.children &&
    menu.children.length > 0;

  const isExpanded =
    expandedMenus[menu._id] || false;

  const indentClass =
    depth > 0
      ? `ml-${Math.min(depth * 4, 8)} pl-${Math.min(
          depth * 3,
          6
        )}`
      : "";

  const borderColor =
    depth === 0
      ? "border-red-100"
      : "border-red-50";

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => {
          if (hasChildren) {
            toggleAccordion(menu._id);
          } else {
            handleNavigate(menu.slug);
          }
        }}
        className={`flex items-center justify-between px-4 py-3 w-full text-left rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-700 font-medium hover:text-red-600 group cursor-pointer text-sm ${indentClass}`}
        style={{
          paddingLeft: `${16 + depth * 12}px`,
        }}
        title={menu.name}
      >
        <div className="flex items-center gap-3 truncate flex-1 min-w-0">
          <span className="text-red-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            {getMenuIcon(
              menu.name,
              menu?.imagePath
            )}
          </span>

          <span className="truncate">
            {menu.name}
          </span>
        </div>

        {hasChildren && (
          <svg
            className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
              isExpanded
                ? "rotate-180 text-red-500"
                : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={`overflow-hidden ${
              depth > 0
                ? `ml-${Math.min(depth * 4, 8)}`
                : "ml-6"
            } pl-3 border-l-2 ${borderColor} mt-1`}
          >
            {menu.children.map(
              (child, index) => (
                <MenuItem
                  key={
                    child._id ||
                    child.slug ||
                    index
                  }
                  menu={child}
                  expandedMenus={
                    expandedMenus
                  }
                  toggleAccordion={
                    toggleAccordion
                  }
                  handleNavigate={
                    handleNavigate
                  }
                  depth={depth + 1}
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


/* =========================================================
   FIXED CONTACT SECTION
========================================================= */

const Fixed_ContactSection = () => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [expandedMenus, setExpandedMenus] =
    useState({});

  const [isDesktop, setIsDesktop] =
    useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const dropdownRef = useRef(null);

  const dispatch = useDispatch();

  const { submenus } = useSelector(
    (state) => state.submenu
  );


  /* =========================================================
     SORT MENUS
  ========================================================= */

  const sortedSubmenus = useMemo(() => {
    return submenus
      ? [...submenus].sort(
          (a, b) =>
            (a.order || 0) -
            (b.order || 0)
        )
      : [];
  }, [submenus]);


  /* =========================================================
     MAIN BUTTON ICONS
  ========================================================= */

  const mainButtonIcon = useMemo(() => {
    return getFirstMenuIcon(
      sortedSubmenus,
      22,
      "text-red-600"
    );
  }, [sortedSubmenus]);

  const mainButtonIconWhite = useMemo(() => {
    return getFirstMenuIcon(
      sortedSubmenus,
      22,
      "text-white"
    );
  }, [sortedSubmenus]);


  /* =========================================================
     PACKAGE DETAILS PAGE
  ========================================================= */

  const isPackageDetailsPage =
    pathname?.includes("/package/") &&
    !pathname?.includes("/packages/");


  /* =========================================================
     DESKTOP CHECK
  ========================================================= */

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(
        window.innerWidth >= 768
      );
    };

    checkDesktop();

    window.addEventListener(
      "resize",
      checkDesktop
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkDesktop
      );
    };
  }, []);


  /* =========================================================
     LOAD MENUS
  ========================================================= */

  useEffect(() => {
    if (
      !submenus ||
      submenus.length === 0
    ) {
      dispatch(getMenus());
    }
  }, [dispatch, submenus]);


  /* =========================================================
     CLICK OUTSIDE
  ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen]);


  /* =========================================================
     RESET ACCORDIONS WHEN CLOSED
  ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setExpandedMenus({});
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleNavigate = useCallback(
    (slug) => {
      if (!slug) return;

      setIsOpen(false);

      router.push(`/${slug}`);
    },
    [router]
  );


  /* =========================================================
     ACCORDION
  ========================================================= */

  const toggleAccordion =
    useCallback((menuId) => {
      setExpandedMenus((prev) => ({
        ...prev,
        [menuId]: !prev[menuId],
      }));
    }, []);


  /* =========================================================
     BUTTON CLICK
     
     IMPORTANT:
     Popup opens ONLY after clicking.
     Hover does NOT open it.
  ========================================================= */

  const handleButtonClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      setIsOpen((prev) => !prev);
    },
    []
  );


  /* =========================================================
     LOCATION BUTTON + POPUP
========================================================= */

  const renderLocationIcon = () => {
    return (
      <div
        ref={dropdownRef}
        className="relative pointer-events-auto"
      >
        {/* =================================================
            ENQUIRE NOW BUTTON
        ================================================= */}

        <motion.button
          type="button"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleButtonClick}
          className={`w-12 h-12 rounded-full border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isOpen
              ? "bg-red-600"
              : "bg-gray-300"
          }`}
          aria-label="Enquire Now"
          aria-expanded={isOpen}
        >
          <span className="flex items-center justify-center w-full h-full">
            {isOpen
              ? mainButtonIconWhite
              : mainButtonIcon}
          </span>
        </motion.button>


        {/* =================================================
            POPUP
        ================================================= */}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 10,
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className="absolute bottom-full mb-3 right-0 w-72 bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-2 max-h-[60vh] overflow-y-auto hide-scrollbar border border-gray-100 z-[10000]"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    .hide-scrollbar::-webkit-scrollbar {
                      display: none;
                    }

                    .hide-scrollbar {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `,
                }}
              />

              {sortedSubmenus.length >
              0 ? (
                sortedSubmenus.map(
                  (menu, index) => (
                    <MenuItem
                      key={
                        menu._id ||
                        menu.slug ||
                        index
                      }
                      menu={menu}
                      expandedMenus={
                        expandedMenus
                      }
                      toggleAccordion={
                        toggleAccordion
                      }
                      handleNavigate={
                        handleNavigate
                      }
                      depth={0}
                    />
                  )
                )
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">
                  Loading destinations...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };


  /* =========================================================
     DESKTOP PACKAGE DETAILS PAGE
========================================================= */

  if (
    isPackageDetailsPage &&
    isDesktop
  ) {
    return (
      <div className="fixed bottom-38 right-4 z-[9998] flex flex-col items-end gap-3 pb-safe pointer-events-none">
        {renderLocationIcon()}
      </div>
    );
  }


  /* =========================================================
     MOBILE
========================================================= */

  if (!isDesktop) {
    return (
      <div className="fixed bottom-33 right-2 md:right-4 z-[9998] flex flex-col items-end pointer-events-none">
        {renderLocationIcon()}
      </div>
    );
  }


  /* =========================================================
     DESKTOP OTHER PAGES
========================================================= */

  return null;
};


export default Fixed_ContactSection;