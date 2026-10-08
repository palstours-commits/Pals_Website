"use client"
import { TravelCardSkeleton } from "@/app/common/animations";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { getMenuByZone } from "@/app/store/slice/submenuSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const indiaZoneDescriptions = {
  "South India": "Temples, Beaches & Breathtaking Backwaters",
  "North India": "Mountains, Heritage & Unforgettable Adventures",
  Kerala: "Backwaters, Beaches & Serene Hill Stations",
  Karnataka: "Heritage, Wildlife & Scenic Landscapes",
  "Andhra Pradesh": "Temples, Nature & Cultural Treasures",
  Hyderabad: "Heritage, Cuisine & City Experiences",
  Rajasthan: "Royal Heritage, Forts & Desert Landscapes",
  Himachal: "Mountains, Valleys & Unforgettable Adventures",
  Amritsar: "Spiritual Heritage, Culture & History",
  Uttarkhand: "Mountains, Pilgrimage & Wildlife Escapes",
  Chardham: "Sacred Temples, Mountains & Spiritual Journeys",
  Kashmir: "Lakes, Valleys & Himalayan Landscapes",
  Ladakh: "High-Altitude Landscapes, Monasteries & Adventure",
  Odisha: "Temples, Beaches & Rich Cultural Heritage",
  Gujarat: "Heritage, Wildlife & Vibrant Culture",
  Mumbai: "City Life, Coastlines & Cultural Experiences",
  "North East": "Mountains, Culture & Untouched Landscapes",
  "Madhya Pradesh - Indore": "Heritage, Wildlife & Central India Experiences",
  Goa: "Beaches, Heritage & Laid-back Coastal Escapes",
  "Andaman and Nicobar Islands": "Pristine Beaches, Islands & Marine Adventures",
  "Tamil Nadu": "Ancient Temples, Heritage & Coastal Landscapes",
};

const getZoneHighlights = (zone, menuSlug) => {
  if (menuSlug === "india" && indiaZoneDescriptions[zone?.name]) {
    return indiaZoneDescriptions[zone.name];
  }

  const apiPlaces = zone?.destinations || zone?.locations || zone?.places || zone?.bestPlaces;
  if (Array.isArray(apiPlaces) && apiPlaces.length) {
    return apiPlaces.join(" · ");
  }

  if (typeof apiPlaces === "string" && apiPlaces.trim()) {
    return apiPlaces.split(/[,|·]/).map((place) => place.trim()).filter(Boolean).join(" · ");
  }

  return null;
};

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const HolidayPlanner = ({ menuSlug = "holidays" }) => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getMenuByZone(menuSlug))
      .then((res) => {
        const data = res?.payload;
        if (!data) {
          setLoading(false);
          return;
        }
        setZones(data?.zones || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [menuSlug, dispatch]);

  const formatMenuName = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join(" ");
  };


  const headingContent = {
    india: {
      normal: "Discover Iconic Destinations Across",
      highlight: "India",
      suffix: "and the Perfect Holidays Crafted Just for You.",
    },
    cruise: {
      normal: "Plan Your Perfect",
      highlight: "Cruise Escape",
      suffix: "",
    },
    spiritual: {
      normal: "Discover India's Holiest Temples &",
      highlight: "Spiritual Heritage",
      suffix: "",
    },
    honeymoon: {
      normal: "Escape to Paradise with Our Exclusive",
      highlight: "Honeymoon Packages.",
      suffix: "",
    },
    international: {
      normal: "Let Us Plan the Perfect",
      highlight: "International Holiday",
      suffix: "for You.",
    },
  };

  const currentHeading =
    headingContent[menuSlug] || {
      normal: "Discover Iconic Destinations Across",
      highlight: formatMenuName(menuSlug),
      suffix: "and the Perfect Holidays Crafted Just for You.",
    };

  return (
    <MainLayout className="px-5 md:p max-w-7xl mx-auto py-10 sm-py-6 lg:py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <motion.h3
            variants={textVariants}
            className="travel-serif max-w-4xl text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            {currentHeading.normal} {" "}
            <span className="text-[#da251c]">
              {currentHeading.highlight}
            </span>{" "}
            {currentHeading.suffix}
          </motion.h3>
          {zones?.length > 0 && (
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={() => scroll("left")}
                className="glass-arrow-btn w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft
                  size={18}
                  className="text-gray-700"
                />
              </motion.button>

              <motion.button
                onClick={() => scroll("right")}
                className="glass-arrow-btn w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight
                  size={18}
                  className="text-gray-700"
                />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="min-w-[260px] flex-shrink-0">
              <TravelCardSkeleton />
            </div>
          ))}
        </div>
      ) : zones?.length > 0 ? (
        <motion.div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {zones?.map((zone) => (
            <motion.div
              key={zone._id}
              className="relative min-w-[245px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl group transition-shadow duration-300"
              transition={{ duration: 0.3 }}
              onClick={() =>
                router.push(
                  `/packages/${menuSlug}/${zone.slug}`,
                )
              }
            >
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              >
                <CustomImage
                  src={zone.image || ""}
                  alt={zone.name}
                  fill
                  className="object-cover transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent/0" />
              </motion.div>
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-end justify-between gap-3 pb-1">
                  <h5 className="travel-serif text-lg font-semibold text-white leading-tight drop-shadow-lg max-w-[calc(100%-42px)]">
                    {zone.name}
                  </h5>
                  <span className="glass-arrow-btn w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-300"><ArrowUpRight size={17} /></span>
                </div>
                {getZoneHighlights(zone, menuSlug) && <div className="flex min-w-0 max-w-full items-start gap-1 truncate pt-1 text-[11px] leading-tight text-white/90" title={getZoneHighlights(zone, menuSlug)}>
                  {menuSlug !== "india" && <MapPin size={12} className="mt-0.5 shrink-0" />}
                  <span className="truncate">{getZoneHighlights(zone, menuSlug)}</span>
                </div>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 text-gray-500 font-medium">
          No Zone available for{" "}
          {formatMenuName(menuSlug)}
        </div>
      )}
    </MainLayout>
  );
};

export default HolidayPlanner;
