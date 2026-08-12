"use client";
import { fadeContainer, fadeItem } from "@/app/common/animations";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import {
  Banknote,
  Car,
  ChevronLeft,
  ChevronRight,
  FileText,
  Hotel,
  Mountain,
  Plane,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Flight\nBookings",
    Icon: Plane,
    slug: "/service/flight-booking",
  },
  {
    title: "Hotel & Resort\nReservations",
    Icon: Hotel,
    slug: "/service/hotel-booking",
  },
  {
    title: "Customized\nHoliday Packages",
    Icon: SlidersHorizontal,
    slug: "/contact-us",
  },
  {
    title: "Money\nExchange",
    Icon: Banknote,
    slug: "/service/money-exchange",
  },
  {
    title: "Visa\nAssistance",
    Icon: FileText,
    slug: "/service/visa-booking",
  },
  {
    title: "Adventure Travel\n& Activities",
    Icon: Mountain,
    slug: "https://royalmilesindia.webdadsprojects.com/",
    external: true,
  },
  {
    title: "Transport\n& Transfers",
    Icon: Car,
    slug: "/service/transport",
  },
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
    <MainLayout className="bg-accent overflow-x-hidden  mt-10 md:mt-20">
      <motion.div
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-5  max-w-7xl mx-auto py-10"
      >
        <motion.div
          variants={fadeItem}
          className="flex justify-between items-start mb-16 text-white"
        >
          <div>
            <h4 className="font-bold">Our Services</h4>
            <p className="opacity-90 text-md font-medium">
              We offer end-to-end travel solutions designed for convenience and
              value.
            </p>
          </div>
          <div className="hidden md:flex flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition
      ${canScrollLeft
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
      ${canScrollRight
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
          className="flex gap-2 sm:gap-base  overflow-x-auto scrollbar-hide whitespace-nowrap pb-2"
        >
          {services.map(({ title, Icon, slug, disabled, external }, i) => {
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

            if (disabled) {
              return (
                <div key={i} className="shrink-0">
                  {Card}
                </div>
              );
            }

            if (external) {
              return (
                <a
                  key={i}
                  href={slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  {Card}
                </a>
              );
            }

            return (
              <Link
                key={i}
                href={`${slug}`}
                className="shrink-0"
              >
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
