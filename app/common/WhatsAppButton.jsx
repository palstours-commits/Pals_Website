"use client";

import React from "react";
import { FaWhatsapp, FaFilePdf } from "react-icons/fa";
import Lion from "@/app/assets/lion.png";
import Image from "next/image";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-3 md:bottom-6 right-2 md:right-4 z-[999] flex flex-col items-end gap-3">

      <a
        href="https://wa.me/9841255715?text=Hi%2C%20I%20am%20a%20new%20user%20and%20I%20would%20like%20to%20enquire%20about%20travel%20packages."
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <span
          className="
            absolute right-14 top-1/2 -translate-y-1/2
            bg-gray-900 text-white text-xs
            px-3 py-1.5 rounded-md whitespace-nowrap
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition-all duration-300
          "
        >
          WhatsApp
        </span>

        <div
          className="
            w-12 h-12 bg-[#25D366] rounded-full
            flex items-center justify-center
            shadow-[0_4px_12px_rgba(37,211,102,0.4)]
            transition-transform duration-300 hover:scale-110
          "
        >
          <FaWhatsapp size={26} color="#fff" />
        </div>
      </a>
      <a
        href="/certificate.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <span
          className="
            absolute right-14 top-1/2 -translate-y-1/2
            bg-gray-900 text-white text-xs
            px-3 py-1.5 rounded-md whitespace-nowrap
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition-all duration-300
          "
        >
          Certificate
        </span>

        <div
          className="
    w-12 h-12 bg-white rounded-full
    flex items-center justify-center
    shadow-[0_4px_12px_rgba(0,0,0,0.2)]
    transition-transform duration-300 hover:scale-110
    overflow-hidden
  "
        >
          <Image
            src={Lion}
            alt="Certificate"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </a>

    </div>
  );
};

export default FloatingButtons;