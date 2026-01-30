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
    sliderRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-accent">
      <div className="px-4 md:px-30 py-15">
        <div className="flex justify-between items-start mb-16 text-white">
          <div>
            <h4 className="font-bold">Our Services</h4>
            <p className="text-xs opacity-90">
              We offer end-to-end travel solutions designed for convenience and
              value.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-lg  border-2 border-white text-white flex items-center justify-center"
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
        </div>
        <div
          ref={sliderRef}
          className="flex gap-18 overflow-x-auto scrollbar-hide"
        >
          {services?.map(({ title, Icon }, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
                <Icon size={36} className="text-primary" />
              </div>
              <p className="text-white text-xs font-medium whitespace-pre-line">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
