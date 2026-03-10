"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, MapPin, Plane } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Flight_Movement = ({ isOpen = false, onAnimationComplete, autoTriggerOnSuccess = true }) => {
  const { message, loading, error } = useSelector((state) => state.enquiry);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const svgRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });

  // Handle responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setDimensions({ width: 350, height: 200 });
      } else if (width < 768) { // tablet
        setDimensions({ width: 600, height: 250 });
      } else { // desktop
        setDimensions({ width: 800, height: 300 });
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define responsive path coordinates
  const startPoint = { 
    x: dimensions.width * 0.15, 
    y: dimensions.height * 0.6 
  };
  const controlPoint = { 
    x: dimensions.width * 0.5, 
    y: dimensions.height * 0.2 
  };
  const endPoint = { 
    x: dimensions.width * 0.85, 
    y: dimensions.height * 0.6 
  };
  const path = `M ${startPoint.x} ${startPoint.y} Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`;

  useEffect(() => {
    if (autoTriggerOnSuccess && message && !loading && !error && !internalIsOpen) {
      setInternalIsOpen(true);
      setShowSuccess(false);
    }
  }, [message, loading, error, autoTriggerOnSuccess, internalIsOpen]);

  // Calculate path length for better animation control
  useEffect(() => {
    if (svgRef.current) {
      const pathElement = svgRef.current.querySelector('path');
      if (pathElement) {
        setPathLength(pathElement.getTotalLength());
      }
    }
  }, [dimensions]);

  const handleAnimationComplete = useCallback(() => {
    setInternalIsOpen(false);
    setShowSuccess(false);
    if (onAnimationComplete) onAnimationComplete();
  }, [onAnimationComplete]);

  const handlePlaneAnimationComplete = () => {
    setShowSuccess(true);
  };

  const showAnimation = isOpen || internalIsOpen;

  if (!showAnimation) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Map Background with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 sm:opacity-20"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/world-map.png')",
          }}
        />
        <div className="absolute inset-0 backdrop-blur-[2px] sm:backdrop-blur-md bg-white/20 sm:bg-white/30" />

        {/* Main Animation Card - Fully Responsive */}
        <motion.div 
          className="relative z-10 bg-white/90 sm:bg-white/80 backdrop-blur-xl border border-white/50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl mx-auto"
          initial={{ y: 20, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 20, scale: 0.95 }}
        >
          {!showSuccess ? (
            <div className="relative w-full" style={{ height: dimensions.height + 80 }}>
              {/* SVG Map Background Effect */}
              <svg 
                ref={svgRef}
                className="absolute inset-0 w-full h-full" 
                viewBox={`0 0 ${dimensions.width} ${dimensions.height + 80}`}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Dotted path line */}
                <path 
                  d={path} 
                  fill="none" 
                  stroke="#94a3b8" 
                  strokeWidth={dimensions.width < 640 ? "1.5" : "2"} 
                  strokeDasharray={dimensions.width < 640 ? "4 4" : "6 6"}
                  strokeLinecap="round"
                />
                
                {/* Start location pin - Responsive sizing */}
                <g transform={`translate(${startPoint.x - (dimensions.width < 640 ? 10 : 15)}, ${startPoint.y - (dimensions.width < 640 ? 20 : 30)})`}>
                  <MapPin 
                    size={dimensions.width < 640 ? 20 : 30} 
                    className="text-red-500"
                    absoluteStrokeWidth
                  />
                  <text 
                    x={dimensions.width < 640 ? "0" : "5"} 
                    y={dimensions.width < 640 ? "25" : "40"} 
                    className={`${dimensions.width < 640 ? 'text-[8px]' : 'text-xs'} font-medium fill-gray-700`}
                  >
                    DEP
                  </text>
                </g>
                
                {/* End location pin */}
                <g transform={`translate(${endPoint.x - (dimensions.width < 640 ? 10 : 15)}, ${endPoint.y - (dimensions.width < 640 ? 20 : 30)})`}>
                  <MapPin 
                    size={dimensions.width < 640 ? 20 : 30} 
                    className="text-blue-500"
                    absoluteStrokeWidth
                  />
                  <text 
                    x={dimensions.width < 640 ? "5" : "15"} 
                    y={dimensions.width < 640 ? "25" : "40"} 
                    className={`${dimensions.width < 640 ? 'text-[8px]' : 'text-xs'} font-medium fill-gray-700`}
                  >
                    ARR
                  </text>
                </g>
              </svg>

              {/* Animated Plane */}
              <motion.div
                className="absolute"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                  duration: 4, 
                  ease: "linear",
                  onComplete: handlePlaneAnimationComplete 
                }}
                style={{ 
                  offsetPath: `path("${path}")`,
                  offsetRotate: "auto",
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 'fit-content',
                  height: 'fit-content'
                }}
              >
                <div className="relative">
                  <Plane 
                    size={dimensions.width < 640 ? 24 : dimensions.width < 768 ? 32 : 40} 
                    className="text-blue-600 fill-blue-600"
                    style={{ 
                      transform: 'rotate(90deg)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  />
                  {/* Trail effect */}
                  <motion.div
                    className="absolute -z-10"
                    animate={{ opacity: [0.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Plane 
                      size={dimensions.width < 640 ? 24 : dimensions.width < 768 ? 32 : 40} 
                      className="text-blue-300" 
                      style={{ transform: 'rotate(90deg)' }} 
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Progress indicator - Responsive positioning */}
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <motion.div 
                  className={`${dimensions.width < 640 ? 'text-[10px]' : 'text-sm'} font-medium text-gray-600 mb-1 sm:mb-2`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✈️ Flight in progress... {Math.floor((Date.now() % 4000) / 40)}%
                </motion.div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <motion.div
                    className="bg-blue-600 h-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                </div>
                
                <div className="flex justify-between mt-1 sm:mt-2 text-[8px] sm:text-xs text-gray-500">
                  <span>Departure</span>
                  <span>In transit</span>
                  <span>Arrival</span>
                </div>
              </div>
            </div>
          ) : (
            /* Success Message - Responsive */
            <motion.div 
              className="text-center py-6 sm:py-8 md:py-10 px-2 sm:px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-4 sm:mb-6">
                {/* Animated circle background */}
                <motion.div
                  className={`${dimensions.width < 640 ? 'w-16 h-16' : dimensions.width < 768 ? 'w-20 h-20' : 'w-24 h-24'} bg-emerald-100 rounded-full mx-auto`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />
                
                {/* Check icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle 
                    size={dimensions.width < 640 ? 36 : dimensions.width < 768 ? 44 : 56} 
                    className="text-emerald-600" 
                  />
                </motion.div>
              </div>

              <motion.h2 
                className={`${dimensions.width < 640 ? 'text-xl' : dimensions.width < 768 ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-2 sm:mb-3 px-2`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Flight Booked Successfully! 🎉
              </motion.h2>
              
              <motion.div 
                className={`${dimensions.width < 640 ? 'text-sm' : dimensions.width < 768 ? 'text-base' : 'text-lg'} text-gray-600 mb-1 sm:mb-2`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your tickets are being generated.
              </motion.div>
              
              <motion.div 
                className={`${dimensions.width < 640 ? 'text-[10px]' : 'text-xs sm:text-sm'} text-gray-500 mb-6 sm:mb-8 break-all px-2`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Booking ref: {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </motion.div>

              <motion.button 
                onClick={handleAnimationComplete}
                className={`${dimensions.width < 640 ? 'px-6 py-2.5 text-sm' : 'px-8 py-3 text-base'} bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg hover:shadow-xl cursor-pointer w-full sm:w-auto`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Done
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Flight_Movement;