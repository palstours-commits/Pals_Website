"use client";
import { TravelCardSkeleton } from "@/app/common/animations";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { getAllNewZones } from "@/app/store/slice/zoneSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

const NewZonePlanner = () => {
    const router = useRouter();
    const sliderRef = useRef(null);
    const dispatch = useDispatch();
    const { newZones, loading } = useSelector(
        (state) => state.zones
    );

    const scroll = (dir) => {
        const el = sliderRef.current;
        if (!el) return;
        el.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        dispatch(getAllNewZones());
    }, [dispatch]);

    return (
        <MainLayout className="px-5   max-w-7xl mx-auto py-10 sm:py-6 lg:py-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12"
            >
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                    <motion.h3
                        variants={textVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
                    >
                        Explore{" "}
                        <span className="text-[#da251c]">
                            Trending Destinations
                        </span>
                    </motion.h3>

                    {newZones?.length > 0 && (
                        <div className="hidden md:flex items-center gap-3">
                            <motion.button
                                onClick={() => scroll("left")}
                                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg hover:border-[#da251c] transition-all duration-300 cursor-pointer"
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
                                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg hover:border-[#da251c] transition-all duration-300 cursor-pointer"
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
                        <div
                            key={i}
                            className="min-w-[260px] flex-shrink-0"
                        >
                            <TravelCardSkeleton />
                        </div>
                    ))}
                </div>
            ) : newZones?.length > 0 ? (
                <motion.div
                    ref={sliderRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {newZones?.map((zone) => (
                        <motion.div
                            key={zone._id}
                            className="relative min-w-[245px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl group transition-shadow duration-300"
                            transition={{ duration: 0.3 }}
                            onClick={() =>
                                router.push(`/packages/${zone?.menuId.slug}/${zone.slug}`)
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
                                    <span className="w-9 h-9 shrink-0 rounded-full border border-white/70 text-white flex items-center justify-center group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300">
                                        <ArrowUpRight size={17} strokeWidth={2.2} />
                                    </span>
                                </div>
                                {(zone.description || zone.name) !== zone.name && <div className="flex min-w-0 max-w-full items-center gap-1 truncate pt-1 text-[11px] text-white/90" title={zone.description}>
                                    <MapPin size={12} />
                                    <span className="truncate">{zone.description || zone.name}</span>
                                </div>}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-16 text-gray-500 font-medium">
                    No New Zones Available
                </div>
            )}
        </MainLayout>
    );
};

export default NewZonePlanner;
