"use client";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { getNewArrivals } from "@/app/store/slice/packageSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TrendingDestinations = () => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const dispatch = useDispatch()
  const { newArrivals,
  } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(getNewArrivals())
  }, [dispatch])


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
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold  leading-med">
              Discover Our Newest Journeys

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
          {newArrivals?.map((item, i) => (
            <motion.div
              key={item._id}
              className="relative min-w-[260px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
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
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-xl">
                  <h5 className="text-xl font-semibold text-center text-white leading-tight drop-shadow-lg">
                    {item.packageName}
                  </h5>
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