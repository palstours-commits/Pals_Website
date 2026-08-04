"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BsChatDotsFill } from "react-icons/bs";
import ContactFormPopup from "./ContactFormPopup";

export default function FloatingContact() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const pathname = usePathname();

  if (
    pathname === "/contact-us" ||
    pathname.startsWith("/package/")
  ) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-53 md:bottom-36 right-2 md:right-4 z-[9998]">
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></span>

        <motion.button
          onClick={() => setIsPopupOpen(true)}
          aria-label="Enquiry"
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.08, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.15, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12  rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl hover:bg-red-700 cursor-pointer"
        >
          <BsChatDotsFill size={24} />
        </motion.button>
      </div>

      <ContactFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}