"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Plane } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Flight_Movement = ({
  isOpen = false,
  onAnimationComplete,
  autoTriggerOnSuccess = true,
}) => {
  const { message, loading, error } = useSelector((state) => state.enquiry);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: plane, 1: success

  useEffect(() => {
    if (autoTriggerOnSuccess && message && !loading && !error && !hasTriggered) {
      setInternalIsOpen(true);
      setHasTriggered(true);
    }
  }, [message, loading, error, autoTriggerOnSuccess, hasTriggered]);

  const handleAnimationComplete = useCallback(() => {
    setInternalIsOpen(false);
    setHasTriggered(false);
    setAnimationPhase(0);
    if (onAnimationComplete) onAnimationComplete();
  }, [onAnimationComplete]);

  const showAnimation = isOpen || internalIsOpen;

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setAnimationPhase(1); // Switch to success phase
      }, 3000);
      
      const completeTimer = setTimeout(handleAnimationComplete, 5500);
      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }
  }, [showAnimation, handleAnimationComplete]);

  if (!showAnimation) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Sky Background */}
        <div className="fixed inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200" />

        {/* Clouds */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 rounded-full blur-xl"
            style={{
              width: 80 + Math.random() * 120,
              height: 40 + Math.random() * 60,
              left: `${i * 16}%`,
              top: `${15 + Math.random() * 60}%`
            }}
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Phase 1: Flying Plane (0-3s) */}
        {animationPhase === 0 && (
          <motion.div
            className="fixed top-1/2 left-[-200px] z-50"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: ["0vw", "110vw"],
              y: [0, -80, 20],
              rotate: [0, -8, 2],
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <div className="relative">
              <Plane size={85} className="text-white drop-shadow-2xl rotate-90" strokeWidth={1.5} />
              
              {/* Enhanced Trail */}
              <motion.div 
                className="absolute -left-12 top-9 w-24 h-1.5 bg-white/40 blur-sm rounded-full"
                animate={{ 
                  opacity: [0.6, 0.2, 0.6],
                  scale: [1, 0.8, 1]
                }}
                transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Phase 2: Success Message (3-5.5s) */}
        <AnimatePresence>
          {animationPhase === 1 && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-60"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0 
              }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              <motion.div
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 max-w-md w-full mx-6 text-center"
                animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CheckCircle size={48} className="text-white drop-shadow-lg" strokeWidth={1} />
                </motion.div>
                
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                  Successfully Booked!
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Your flight reservation is confirmed. 
                  <br />
                  Check your email for booking details.
                </p>
                
                <motion.div
                  className="flex items-center justify-center space-x-2 text-emerald-600 text-sm font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span>Booking Confirmed</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle sparkle effect during success phase */}
        {animationPhase === 1 && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-2 h-2 bg-yellow-300/80 rounded-full blur-sm"
                style={{
                  top: `${30 + i * 8}%`,
                  left: `${20 + i * 10}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Flight_Movement;
