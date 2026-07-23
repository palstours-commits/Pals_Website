"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9841255715?text=Hi%2C%20I%20am%20a%20new%20user%20and%20I%20would%20like%20to%20enquire%20about%20travel%20packages."
      target="_blank"
      rel="noopener noreferrer"
      // Changed z-index to 9999 so it stays on top of everything on mobile!
      className="fixed bottom-6 right-4 z-[9999]" 
    >
      <div
        className="
          w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.4)]
          transition-transform duration-300 hover:scale-110
        "
      >
        <FaWhatsapp size={26} color="#fff" />
      </div>
    </a>
  );
};

export default WhatsAppButton;