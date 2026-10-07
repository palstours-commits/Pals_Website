"use client";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { getTopDestinations } from "@/app/store/slice/packageSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TopDestination = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const sliderRef = useRef(null);
  const { topDestinations,
  } = useSelector((state) => state.packages);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(getTopDestinations())
  }, [dispatch])

  const handleDiscoverMore = () => {
    if (!topDestinations?.length) return;
    const zone = topDestinations[0];
    if (!zone?.slug) return;
    router.push(`/explore?zone=${zone.slug}`);
  };



  return (
    <MainLayout className="bg-gradient-to-r from-[#FAF3E1] to-[#F8E8C8] mb-10 md: mb-20  py-5 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-5  max-w-7xl mx-auto"
      >
        <motion.div
          variants={textVariants}
          className="flex flex-col md:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12"
        >
          <div>
            <h4 className="travel-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-00 leading-tight">
              Discover the Wonders of India
            </h4>
            <p className="text-md mt-3 max-w-sm">
              Explore the diversity of India—from mountains to beaches, temples
              to adventure zones
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
          {topDestinations?.map((item, i) => (
            <motion.div
              key={item._id}
              className="relative min-w-[245px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl group transition-shadow duration-300"
              transition={{ duration: 0.3 }}
              onClick={() => router.push(`/packages/${item?.menuId.slug}/${item.slug}`)
              }

            >
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              >
                <CustomImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent/0" />
              </motion.div>

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-end justify-between gap-3 pb-1">
                  <h5 className="travel-serif text-lg font-semibold text-white leading-tight drop-shadow-lg max-w-[calc(100%-42px)]">
                    {item.name}
                  </h5>
                  <span className="w-9 h-9 shrink-0 rounded-full border border-white/70 text-white flex items-center justify-center group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300"><ArrowUpRight size={17} /></span>
                </div>
                <div className="flex items-center gap-1 pt-2 text-[11px] text-white/90"><MapPin size={12} />{item.description || item.name}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default TopDestination;
