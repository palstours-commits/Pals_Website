"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plane } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Flight_Movement = ({ isOpen = false, onAnimationComplete, autoTriggerOnSuccess = true }) => {

  const { message, loading, error } = useSelector((state) => state.enquiry);

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const hasFinishedRef = useRef(false);
  const hasTriggeredRef = useRef(false); // prevents looping

  // Trigger modal only once when success happens
  useEffect(() => {
    if (
      autoTriggerOnSuccess &&
      message &&
      !loading &&
      !error &&
      !hasTriggeredRef.current
    ) {
      hasTriggeredRef.current = true;

      setInternalIsOpen(true);
      setShowSuccess(false);
      hasFinishedRef.current = false;
    }
  }, [message, loading, error, autoTriggerOnSuccess]);

  // Auto close after success screen
  useEffect(() => {
    if (showSuccess) {
      hasFinishedRef.current = true;

      const timer = setTimeout(() => {
        setInternalIsOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Fire confetti when modal closes
  useEffect(() => {
  if (!internalIsOpen && hasFinishedRef.current) {

    hasFinishedRef.current = false;

    // RESET for next trigger
    hasTriggeredRef.current = false;
    setShowSuccess(false);

    if (onAnimationComplete) onAnimationComplete();
  }
}, [internalIsOpen, onAnimationComplete]);

  const showAnimation = isOpen || internalIsOpen;

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <AnimatePresence mode="wait">

              {!showSuccess ? (

                <motion.div
                  key="flight"
                  className="p-8 text-center"
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="relative h-32 flex items-center justify-center">

                    <motion.div
                      className="absolute w-full h-[2px] bg-slate-100"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1 }}
                    />

                    <motion.div
                      className="z-10 bg-red-700 p-3 rounded-full text-white shadow-lg"
                      animate={{ x: [-150, 150] }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                      onAnimationComplete={() => {
                        setShowSuccess(true);
                      }}
                    >
                      <Plane size={24} className="rotate-45" />
                    </motion.div>

                  </div>

                  <h3 className="text-xl font-semibold text-slate-800 mt-4">
                    Verifying Flight Route
                  </h3>

                  <p className="text-slate-500 text-sm mt-2">
                    Connecting to our global booking system...
                  </p>

                </motion.div>

              ) : (

                <motion.div
                  key="success"
                  className="p-8 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >

                  <motion.div
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <svg width="60" height="60" viewBox="0 0 52 52">
  {/* Airplane + Passport Success - NO CIRCLE/CHECK */}
  <motion.g initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, type: "spring", stiffness: 350 }}>
    
    {/* Airplane flies across */}
    <motion.g initial={{ x: -10, scale: 0.8 }} animate={{ x: 0, scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 400 }}>
      <path fill="#3b82f6" d="M12 20 L16 18 L20 22 L34 22 L32 26 L20 26 Z"/>
      <path fill="#60a5fa" d="M34 22 L38 20 L40 24 L38 26 Z" stroke="#1e40af" strokeWidth="0.5"/>
      <circle cx="17" cy="21" r="1.2" fill="#eab308"/>
    </motion.g>

    {/* Passport/Ticket */}
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 400 }}>
      <rect x="14" y="28" width="24" height="14" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <rect x="16" y="30" width="20" height="10" rx="4" fill="#fbbf24"/>
      <text x="24" y="37" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#b45309">TRIP</text>
      <text x="24" y="42" textAnchor="middle" fontSize="6" fill="#dc2626">CONFIRMED</text>
    </motion.g>

    {/* Luggage Tag */}
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }}>
      <rect x="36" y="32" width="8" height="6" rx="3" fill="#10b981" stroke="#059669" strokeWidth="0.5"/>
      <circle cx="40" cy="29" r="1.5" fill="#059669"/>
      <text x="40" y="37" textAnchor="middle" fontSize="5" fill="white">✈️</text>
    </motion.g>
  </motion.g>

  {/* Success Glow */}
  <motion.circle cx="26" cy="26" r="20" fill="none" stroke="#86efac" strokeWidth="2"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
    transition={{ delay: 0.5, duration: 0.6 }}
  />

  {/* Travel Sparkles - FIXED 2 KEYFRAMES ONLY */}
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
    <motion.circle cx="8" cy="14" r="1.2" fill="#f59e0b" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 500 }}/>
    <motion.circle cx="44" cy="18" r="1" fill="#3b82f6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 500 }}/>
    <motion.circle cx="12" cy="40" r="1.2" fill="#10b981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 500 }}/>
  </motion.g>
</svg>

                  </motion.div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Booking Confirmed!
                  </h2>

                  <p className="text-slate-600 mt-2 mb-8">
                    Your travel itinerary has been generated.
                  </p>

                </motion.div>

              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Flight_Movement;