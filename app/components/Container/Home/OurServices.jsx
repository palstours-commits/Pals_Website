"use client";
import { useRef } from "react";
import {
  Plane,
  Hotel,
  SlidersHorizontal,
  FileText,
  ShieldCheck,
  Mountain,
  Ship,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import { fadeContainer, fadeItem } from "@/app/common/animations";

const services = [
  { title: "Flight\nBookings", Icon: Plane },
  { title: "Hotel & Resort\nReservations", Icon: Hotel },
  { title: "Customized\nHoliday Packages", Icon: SlidersHorizontal },
  { title: "Visa\nAssistance", Icon: FileText },
  { title: "Travel\nInsurance", Icon: ShieldCheck },
  { title: "Adventure Travel\n& Activities", Icon: Mountain },
  { title: "Cruise\nBookings", Icon: Ship },
];

const OurServices = () => {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="bg-accent overflow-x-hidden">
      <motion.div
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 md:py-15"
      >
        <motion.div
          variants={fadeItem}
          className="flex justify-between items-start mb-16 text-white"
        >
          <div>
            <h4 className="font-bold">Our Services</h4>
            <p className="text-sm opacity-90">
              We offer end-to-end travel solutions designed for convenience and
              value.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-lg border-2 border-white text-white flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-lg border-2 border-white text-white flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
        <div
          ref={sliderRef}
          className="flex gap-14 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2"
        >
          {services?.map(({ title, Icon }, i) => (
            <motion.div
              key={i}
              variants={fadeItem}
              className="flex flex-col items-center text-center shrink-0 w-[140px] will-change-transform translate-z-0"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
                <Icon size={36} className="text-primary" />
              </div>
              <p className="text-white text-xs font-medium whitespace-pre-line">
                {title}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default OurServices;
