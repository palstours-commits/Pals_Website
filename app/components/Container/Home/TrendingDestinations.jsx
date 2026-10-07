"use client";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { FetchApi } from "@/app/api/FetchApi";
import { getNewArrivals } from "@/app/store/slice/packageSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const getPackageHighlights = (item) => {
  const apiPlaces = item?.destinations || item?.locations || item?.places || item?.bestPlaces;
  if (Array.isArray(apiPlaces) && apiPlaces.length) return apiPlaces.join(" · ");
  if (typeof apiPlaces === "string" && apiPlaces.trim()) {
    return apiPlaces.split(/[,|·]/).map((place) => place.trim()).filter(Boolean).join(" · ");
  }

  return null;
};

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TrendingDestinations = () => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const dispatch = useDispatch()
  const { newArrivals } = useSelector((state) => state.packages);
  const [internationalDetails, setInternationalDetails] = useState({});

  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch])

  useEffect(() => {
    let cancelled = false;
    const cacheTtl = 15 * 60 * 1000;

    const loadInternationalDetails = async () => {
      try {
        const details = {};
        const packagesToFetch = (newArrivals || []).filter((pkg) => {
          if (!pkg?.slug || pkg.destinations) return false;
          const cached = window.localStorage.getItem(`pals:package:${pkg.slug}`);
          if (!cached) return true;
          try {
            const parsed = JSON.parse(cached);
            if (
              parsed?.savedAt &&
              Date.now() - parsed.savedAt < cacheTtl &&
              parsed?.days != null &&
              parsed?.nights != null
            ) {
              details[pkg.slug] = parsed;
              return false;
            }
          } catch {
            // Fetch again when a cache entry is invalid.
          }
          return true;
        });

        const fetchedDetails = await Promise.all(
          packagesToFetch.map(async (pkg) => {
            try {
              const response = await FetchApi({
                endpoint: `/user/package/getPackageById/${pkg.slug}`,
                method: "GET",
              });
              const packageData = response?.data?.package || response?.data;
              const destinations = packageData?.destinations;
              if (destinations || packageData?.days != null || packageData?.nights != null) {
                const detail = {
                  destinations,
                  days: packageData?.days,
                  nights: packageData?.nights,
                };
                window.localStorage.setItem(
                  `pals:package:${pkg.slug}`,
                  JSON.stringify({ savedAt: Date.now(), ...detail }),
                );
                return [pkg.slug, detail];
              }
            } catch {
              return null;
            }
            return null;
          }),
        );

        fetchedDetails.forEach((entry) => {
          if (entry) details[entry[0]] = entry[1];
        });
        if (!cancelled) setInternationalDetails(details);
      } catch {
        // Keep the original new-arrivals cards usable if enrichment fails.
      }
    };

    loadInternationalDetails();
    return () => { cancelled = true; };
  }, [newArrivals]);


  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleDiscoverMore = () => {
    if (!newArrivals?.length) return;
    const zone = newArrivals[0];
    if (!zone?.slug) return;
    router.push(`/explore?zone=${zone.slug}`);
  };

  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-5  max-w-7xl mx-auto"
      >
        <motion.div
          variants={textVariants}
          className="flex flex-col md:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <h4 className="travel-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-med">
              Discover the Wonders of International Travel
            </h4>
            <p className="text-md  mt-3 max-w-sm ">
              Explore freshly curated travel packages designed to turn your next getaway into an unforgettable experience.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex flex items-center gap-2">
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

            <motion.button
              onClick={handleDiscoverMore}
              className="bg-[#da251c] hover:bg-[#b91c1c] text-white px-6 py-2 rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Discover more
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {newArrivals?.map((item) => (
            <motion.div
              key={item._id}
              className="relative min-w-[245px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl group transition-shadow duration-300"
              transition={{ duration: 0.3 }}
              onClick={() =>
                router.push(`/package/${item.slug}`)
              }
            >
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              >
                <CustomImage
                  src={item.images[0]}
                  alt={item.packageName}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent/0" />
              </motion.div>
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-end justify-between gap-3 pb-1">
                  <h5 className="travel-serif text-lg font-semibold text-white leading-tight drop-shadow-lg max-w-[calc(100%-42px)]">
                    {item.packageName}
                  </h5>
                  <span className="w-9 h-9 shrink-0 rounded-full border border-white/70 text-white flex items-center justify-center group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300"><ArrowUpRight size={17} /></span>
                </div>
                <div className="flex w-full flex-col items-start gap-1 overflow-hidden pt-1 text-[11px] text-white/90">
                  {(item.nights != null || internationalDetails[item.slug]?.nights != null) && <span>{item.nights ?? internationalDetails[item.slug]?.nights} Nights / {item.days ?? internationalDetails[item.slug]?.days} Days</span>}
                  {getPackageHighlights({ ...item, destinations: item.destinations || internationalDetails[item.slug]?.destinations }) && <span className="inline-flex min-w-0 max-w-full items-center gap-1 truncate leading-tight" title={getPackageHighlights({ ...item, destinations: item.destinations || internationalDetails[item.slug]?.destinations })}><MapPin size={12} className="shrink-0" /><span className="truncate">{getPackageHighlights({ ...item, destinations: item.destinations || internationalDetails[item.slug]?.destinations })}</span></span>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </MainLayout >
  );
};

export default TrendingDestinations;
