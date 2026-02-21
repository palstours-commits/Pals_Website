"use client";
import { useEffect, useRef, useState } from "react";
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
  Banknote,
  Car,
} from "lucide-react";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import { fadeContainer, fadeItem } from "@/app/common/animations";
import Link from "next/link";

const services = [
  { title: "Flight\nBookings", Icon: Plane, slug: "flight" },
  { title: "Hotel & Resort\nReservations", Icon: Hotel, slug: "hotel" },
  {
    title: "Customized\nHoliday Packages",
    Icon: SlidersHorizontal,
    slug: "packages",
  },
  {
    title: "Money\nExchange",
    Icon: Banknote,
    disabled: true,
  },
  { title: "Visa\nAssistance", Icon: FileText, slug: "visa" },
  { title: "Travel\nInsurance", Icon: ShieldCheck, slug: "insurance" },
  {
    title: "Adventure Travel\n& Activities",
    Icon: Mountain,
    slug: "adventure",
  },
  { title: "Cruise\nBookings", Icon: Ship, slug: "cruise" },
  { title: "Transport\n& Transfers", Icon: Car, slug: "transport" },
];

const OurServices = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 300);
  };

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
  }, []);

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
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition
      ${
        canScrollLeft
          ? "border-white text-white"
          : "border-white/40 text-white/40 cursor-not-allowed"
      }
    `}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition
      ${
        canScrollRight
          ? "border-white text-white"
          : "border-white/40 text-white/40 cursor-not-allowed"
      }
    `}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2"
        >
          {services.map(({ title, Icon, slug, disabled }, i) => {
            const Card = (
              <motion.div
                variants={fadeItem}
                className={`flex flex-col items-center text-center w-[140px]
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 relative">
                  <Icon size={36} className="text-primary" />
                </div>
                <p className="text-white text-xs font-medium whitespace-pre-line">
                  {title}
                </p>
              </motion.div>
            );
            return disabled ? (
              <div key={i} className="shrink-0">
                {Card}
              </div>
            ) : (
              <Link key={i} href={`/service/${slug}`} className="shrink-0">
                {Card}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default OurServices;
