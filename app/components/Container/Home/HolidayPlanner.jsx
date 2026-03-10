"use client";

import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { getSlugBySubmenu } from "@/app/store/slice/submenuSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HolidayPlanner = ({ menuSlug = "holidays", activeSlugFromRoute }) => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const [menuSubmenus, setMenuSubmenus] = useState([]);
  const [allZones, setAllZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [loading, setLoading] = useState(true);

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  };

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  /*
  ==============================
  FETCH MENU + ZONES
  ==============================
  */

  useEffect(() => {
    const slug = menuSlug || "holidays";

    setLoading(true);

    dispatch(getSlugBySubmenu(slug))
      .then((res) => {
        const data = res?.payload;

        if (!data) {
          setLoading(false);
          return;
        }

        const subMenus = data.subMenus || [];
        const zones = data.zones || [];

        setMenuSubmenus(subMenus);
        setAllZones(zones);

        if (subMenus.length > 0) {
          let selectedSubmenu = null;

          /*
          ==============================
          MATCH ROUTE SUBMENU
          ==============================
          */

          if (activeSlugFromRoute) {
            const routeSlug = activeSlugFromRoute.toLowerCase();

            selectedSubmenu = subMenus.find(
              (s) =>
                s.slug?.toLowerCase() === routeSlug ||
                s.name?.toLowerCase() === routeSlug,
            );
          }

          /*
          ==============================
          FALLBACK FIRST SUBMENU
          ==============================
          */

          if (!selectedSubmenu) {
            selectedSubmenu = subMenus[0];
          }

          setActiveSubmenu(selectedSubmenu);

          /*
          ==============================
          FILTER ZONES
          ==============================
          */

          const filtered = zones.filter(
            (zone) => zone?.subMenuId?._id === selectedSubmenu?._id,
          );

          setFilteredZones(filtered);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [menuSlug, activeSlugFromRoute, dispatch]);

  /*
  ==============================
  SUBMENU CLICK
  ==============================
  */

  const handleSubmenuClick = (submenu) => {
    setActiveSubmenu(submenu);

    const zonesForSubmenu = allZones.filter(
      (zone) => zone?.subMenuId?._id === submenu?._id,
    );

    setFilteredZones(zonesForSubmenu);

    /*
    Navigate only if NOT homepage holidays
    */

    if (menuSlug !== "holidays") {
      router.push(`/${menuSlug}/${submenu.slug}`);
    }
  };

  /*
  ==============================
  SCROLL BUTTON LOGIC
  ==============================
  */

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [filteredZones]);

  const formatMenuName = (slug) => {
    if (!slug) return "";

    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <MainLayout className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 lg:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
          <motion.h3
            variants={textVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Quick and easy
            <br />
            <span className="text-[#da251c]">
              {activeSubmenu?.name || formatMenuName(menuSlug)} Trip Planner
            </span>
          </motion.h3>

          {filteredZones.length > 0 && (
            <div className="flex gap-3">
              <motion.button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg hover:border-[#da251c] transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={18} className="text-gray-700" />
              </motion.button>

              <motion.button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg hover:border-[#da251c] transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={18} className="text-gray-700" />
              </motion.button>
            </div>
          )}
        </div>

        {/* SUBMENUS */}

        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {menuSubmenus?.map((submenu) => (
            <button
              key={submenu._id}
              onClick={() => handleSubmenuClick(submenu)}
              className={`px-5 py-2 rounded-xl border text-sm whitespace-nowrap cursor-pointer
              ${
                activeSubmenu?._id === submenu._id
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white border-gray-200 hover:border-red-500"
              }`}
            >
              {submenu.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ZONES - Updated with TopDestination card styling */}

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : filteredZones?.length > 0 ? (
        <motion.div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredZones.map((zone) => (
            <motion.div
              key={zone._id}
              className="relative min-w-[260px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() =>
                router.push(`/packages/${activeSubmenu?.slug}/${zone.slug}`)
              }
            >
              {/* Image with hover scale effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              >
                <CustomImage
                  src={zone.image || ""}
                  alt={zone.name}
                  fill
                  className="object-cover"
                />

                {/* Gradient Overlay - matching TopDestination style */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent/0" />
              </motion.div>

              {/* Card content - matching TopDestination style */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-xl">
                  <h5 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                    {zone.name}
                  </h5>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          No packages available for{" "}
          {activeSubmenu?.name || formatMenuName(menuSlug)}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </MainLayout>
  );
};

export default HolidayPlanner;
