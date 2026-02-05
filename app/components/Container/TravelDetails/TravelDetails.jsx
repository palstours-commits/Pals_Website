"use client";
import MainLayout from "@/app/common/MainLayout";
import travel1 from "@/app/assets/travelimg1.svg";
import travel2 from "@/app/assets/travelimg2.svg";
import travel3 from "@/app/assets/travelimg3.svg";
import travel4 from "@/app/assets/travelimg4.svg";
import travel5 from "@/app/assets/travelimg5.svg";
import travel6 from "@/app/assets/travelimg6.svg";
import TravelCard from "@/app/common/TravelCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TravelHero from "./TravelHero";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const travelCards = [
  {
    title: "Heritage Of South India",
    days: "12 Nights / 13 Days",
    img: travel1,
  },
  {
    title: "Charming South India",
    days: "6 Nights / 7 Days",
    img: travel2,
  },
  {
    title: "Chennai Shopping",
    days: "3 Nights / 4 Days",
    img: travel3,
  },
  {
    title: "Enchanting Tamilnadu",
    days: "8 Nights / 9 Days",
    img: travel4,
  },
  {
    title: "Highlights of South India",
    days: "5 Nights / 6 Days",
    img: travel5,
  },
  {
    title: "Authentic Homestays",
    days: "4 Nights / 5 Days",
    img: travel6,
  },
];

const TravelDetails = ({ slug }) => {
  const title = slug?.replace(/-/g, " ");
  const southRef = useRef(null);
  const northRef = useRef(null);
  const northeastRef = useRef(null);
  const andamanRef = useRef(null);
  const kashmirRef = useRef(null);

  useEffect(() => {
    if (!slug) return;

    const sections = {
      "south-india": southRef,
      "north-india": northRef,
      "north-east": northeastRef,
      andaman: andamanRef,
      kashmir: kashmirRef,
    };

    const target = sections[slug];

    if (target?.current) {
      setTimeout(() => {
        target.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 400);
    }
  }, [slug]);

  return (
    <>
      <TravelHero title={title} />
      <motion.div
        ref={northRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <MainLayout className="px-4 md:px-20 py-10 md:pt-15">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="font-bold">Experience South India Your Way</h4>
              <p className="text-gray-500 mt-2 text-xs">
                From ancient temples to misty mountains enjoy personalized
                journeys across South India designed around you.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c] "
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center  "
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block">
                Discover more
              </button>
            </div>
          </div>
          <div
            className="
                                flex gap-6 overflow-x-auto
                                md:grid md:grid-cols-3
                                lg:grid-cols-4
                                md:overflow-visible
                                scrollbar-hide
                            "
          >
            {travelCards?.slice(0, 4).map((item, i) => (
              <TravelCard
                key={i}
                img={item?.img}
                title={item?.title}
                duration={item?.days}
              />
            ))}
          </div>
        </MainLayout>
      </motion.div>

      <motion.div
        ref={northRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <MainLayout className="px-4 md:px-20">
          <div className="flex items-center justify-between my-10">
            <div>
              <h4 className="font-bold">Explore the Heart of North India</h4>
              <p className="text-gray-500 mt-2 text-xs">
                Discover iconic landmarks, vibrant cultures, and unforgettable
                experiences across North India.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c] "
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center  "
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block">
                Discover more
              </button>
            </div>
          </div>
          <div
            className="
                                flex gap-10 overflow-x-auto
                                md:grid md:grid-cols-3
                                lg:grid-cols-4
                                md:overflow-visible
                                scrollbar-hide
                            "
          >
            {travelCards?.slice(0, 4).map((item, i) => (
              <TravelCard
                key={i}
                img={item?.img}
                title={item?.title}
                duration={item?.days}
              />
            ))}
          </div>
        </MainLayout>
      </motion.div>
      <div className="bg-[#FAF3E1] my-10 md:my-15 py-10">
        <motion.div
          ref={northRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            ref={northRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          ></motion.div>
        </motion.div>
        <MainLayout ref={northeastRef} className="px-4 md:px-20">
          <div className="flex items-center justify-between py-10 ">
            <div>
              <h4 className="font-bold">Where Andaman Feels Like Paradise</h4>
              <p className="text-gray-500 mt-2 text-xs">
                Relax, explore, and unwind amidst turquoise seas and serene
                island life.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c] "
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center  "
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block">
                Discover more
              </button>
            </div>
          </div>
          <div
            className="
                                flex gap-10 overflow-x-auto
                                md:grid md:grid-cols-3
                                lg:grid-cols-4
                                md:overflow-visible
                                scrollbar-hide
                            "
          >
            {travelCards?.slice(0, 4).map((item, i) => (
              <TravelCard
                key={i}
                img={item?.img}
                title={item?.title}
                duration={item?.days}
              />
            ))}
          </div>
        </MainLayout>
      </div>
      <MainLayout className="px-4 md:px-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h4 className="font-bold">Fall in Love with Kashmir</h4>
            <p className="text-gray-500 mt-2 text-xs">
              Relax, explore, and unwind amidst turquoise seas and serene island
              life.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c] "
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center  "
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block">
              Discover more
            </button>
          </div>
        </div>
        <div
          className="
                                flex gap-10 overflow-x-auto
                                md:grid md:grid-cols-3
                                lg:grid-cols-4
                                md:overflow-visible
                                scrollbar-hide
                            "
        >
          {travelCards?.slice(0, 4).map((item, i) => (
            <TravelCard
              key={i}
              img={item?.img}
              title={item?.title}
              duration={item?.days}
            />
          ))}
        </div>
      </MainLayout>
      <MainLayout className="px-4 md:px-20 py-10 md:pt-15">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h4 className="font-bold">Fall in Love with Kashmir</h4>
            <p className="text-gray-500 mt-2 text-xs">
              Unspoiled nature, peaceful moments, and unforgettable journeys.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c] "
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center  "
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block">
              Discover more
            </button>
          </div>
        </div>
        <div
          className="
                                flex gap-6 overflow-x-auto
                                md:grid md:grid-cols-3
                                lg:grid-cols-4
                                md:overflow-visible
                                scrollbar-hide
                            "
        >
          {travelCards?.slice(0, 4).map((item, i) => (
            <TravelCard
              key={i}
              img={item?.img}
              title={item?.title}
              duration={item?.days}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default TravelDetails;
