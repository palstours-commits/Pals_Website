"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    AlertTriangle,
    Camera,
    Car,
    CheckCircle,
    Coffee,
    Compass,
    Globe,
    Heart,
    Hotel,
    Luggage,
    Map,
    MapPin,
    Mountain,
    PartyPopper,
    Plane,
    Ship,
    Sparkles,
    Star,
    Sunrise,
    Sunset,
    Ticket,
    TreePine,
    Trophy,
    Utensils,
    X,
    XCircle
} from 'lucide-react';
import { useEffect, useRef } from 'react';

const Message_Popups = ({ 
  isOpen, 
  type = 'success', 
  children, 
  onClose, 
  onConfirm,
  title: customTitle
}) => {
  const shouldReduceMotion = useReducedMotion();
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch(type) {
      case 'success': return <CheckCircle className="w-6 h-6" />;
      case 'error': return <XCircle className="w-6 h-6" />;
      case 'confirm': return <AlertTriangle className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getTravelTheme = () => {
    switch(type) {
      case 'success':
        return {
          gradient: 'from-red-700 via-red-600 to-red-500',
          light: 'bg-gradient-to-br from-orange-50/90 to-pink-50/90',
          border: 'border-orange-200/60',
          iconBg: 'bg-gradient-to-r from-orange-400/20 to-pink-400/20',
          title: 'text-red-700',
          accent: 'text-red-700',
          backdrop: 'from-orange-500/10 via-pink-500/20 to-purple-500/10',
          button: 'bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700'
        };
      case 'error':
        return {
          gradient: 'from-red-700 via-red-600 to-red-500',
          light: 'bg-gradient-to-br from-red-50/90 to-orange-50/90',
          border: 'border-red-200/60',
          iconBg: 'bg-gradient-to-r from-red-400/20 to-orange-400/20',
          title: 'text-red-700',
          accent: 'text-red-700',
          backdrop: 'from-red-500/20 via-orange-500/30 to-amber-500/20',
          button: 'bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700'
        };
      case 'confirm':
        return {
          gradient: 'from-red-700 via-red-600 to-red-500',
          light: 'bg-gradient-to-br from-indigo-50/90 to-blue-50/90',
          border: 'border-indigo-200/60',
          iconBg: 'bg-gradient-to-r from-indigo-400/20 to-blue-400/20',
          title: 'text-red-700',
          accent: 'text-red-700',
          backdrop: 'from-indigo-500/10 via-blue-500/20 to-sky-500/10',
          button: 'bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700'
        };
      default:
        return {
          gradient: 'from-orange-400 via-pink-500 to-purple-600',
          light: 'bg-gradient-to-br from-orange-50/90 to-pink-50/90',
          border: 'border-orange-200/60',
          iconBg: 'bg-gradient-to-r from-orange-400/20 to-pink-400/20',
          title: 'text-orange-900',
          accent: 'text-red-700',
          backdrop: 'from-orange-500/10 via-pink-500/20 to-purple-500/10',
          button: 'bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700'
        };
    }
  };

  const theme = getTravelTheme();
  const Icon = getIcon();

  const getDefaultTitle = () => {
    switch(type) {
      case 'success': return 'All Set for Takeoff! ✈️';
      case 'error': return 'Flight Delay Detected! ⚠️';
      case 'confirm': return 'Ready for Adventure? 🌍';
      default: return 'All Set for Takeoff! ✈️';
    }
  };

  const handleClose = () => onClose?.();
  const handleConfirm = () => { onConfirm?.(); onClose?.(); };
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const containerVariants = shouldReduceMotion 
    ? {} 
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { 
            staggerChildren: 0.08,
            delayChildren: 0.1
          }
        }
      };

  const itemVariants = shouldReduceMotion 
    ? {} 
    : {
        hidden: { opacity: 0, y: 25, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 350, 
            damping: 28 
          }
        }
      };

  // Random travel icons for decoration
  const travelIcons = [
    <Plane key="plane" className="w-full h-full" />,
    <Globe key="globe" className="w-full h-full" />,
    <Compass key="compass" className="w-full h-full" />,
    <Map key="map" className="w-full h-full" />,
    <Luggage key="luggage" className="w-full h-full" />,
    <Hotel key="hotel" className="w-full h-full" />,
    <Car key="car" className="w-full h-full" />,
    <Ship key="ship" className="w-full h-full" />,
    <TreePine key="tree" className="w-full h-full" />,
    <Mountain key="mountain" className="w-full h-full" />,
    <Sunrise key="sunrise" className="w-full h-full" />,
    <Sunset key="sunset" className="w-full h-full" />,
    <Coffee key="coffee" className="w-full h-full" />,
    <Utensils key="utensils" className="w-full h-full" />,
    <Camera key="camera" className="w-full h-full" />,
    <Ticket key="ticket" className="w-full h-full" />,
    <Heart key="heart" className="w-full h-full" />,
    <Star key="star" className="w-full h-full" />,
    <Trophy key="trophy" className="w-full h-full" />,
    <PartyPopper key="party" className="w-full h-full" />,
    <Sparkles key="sparkles" className="w-full h-full" />
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Travel Sky Backdrop */}
          <motion.div 
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-br bg-black/40 backdrop-blur-md"
            style={{
              background: `linear-gradient(135deg, ${theme.backdrop}, black 70%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Multiple flying travel icons animation */}
            <motion.div
              className="absolute top-20 left-10 w-8 h-8 text-white/30"
              animate={{ 
                x: ['-20%', '120%'], 
                rotate: [0, 10, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Plane className="w-full h-full" />
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-10 w-10 h-10 text-white/20"
              animate={{ 
                x: ['20%', '-120%'], 
                y: [0, -20, 0],
                rotate: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Globe className="w-full h-full" />
            </motion.div>

            <motion.div
              className="absolute top-40 right-20 w-6 h-6 text-white/20"
              animate={{ 
                y: ['0%', '100%'], 
                x: [0, 30, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Compass className="w-full h-full" />
            </motion.div>

            <motion.div
              className="absolute bottom-40 left-20 w-7 h-7 text-white/20"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Map className="w-full h-full" />
            </motion.div>
          </motion.div>
          
          {/* Travel-Themed Popup Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-[380px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
          >
            {/* Sunset/Wanderlust Gradient Header */}
            <div className={`h-3 w-full bg-gradient-to-r ${theme.gradient}`} />

            {/* Travel Decorative Elements - Random Icons */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl opacity-20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-blue-400 to-sky-400 rounded-xl opacity-20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="absolute bottom-4 left-8 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl opacity-20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-purple-600" />
            </div>
            <div className="absolute bottom-8 right-6 w-9 h-9 bg-gradient-to-br from-green-400 to-teal-400 rounded-xl opacity-20 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-green-600" />
            </div>
            <div className="absolute top-20 left-12 w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg opacity-20 flex items-center justify-center">
              <Sunrise className="w-4 h-4 text-amber-600" />
            </div>
            <div className="absolute bottom-20 right-12 w-7 h-7 bg-gradient-to-br from-rose-400 to-pink-400 rounded-lg opacity-20 flex items-center justify-center">
              <Sunset className="w-4 h-4 text-rose-600" />
            </div>

            <div className="p-7 relative z-10">
              {/* Icon & Title */}
              <motion.div 
                className="flex items-start gap-4 mb-5"
                variants={itemVariants}
              >
                <motion.div 
                  className={`p-4 rounded-2xl shadow-xl ${theme.iconBg} backdrop-blur-sm border border-white/50`}
                  whileHover={{ scale: 1.08, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {Icon}
                </motion.div>
                
                <div className="flex-1 min-w-0 pt-2">
                  <h3 className={`text-xl font-black leading-tight ${theme.title} drop-shadow-sm`}>
                    {customTitle || getDefaultTitle()}
                  </h3>
                  <p className={`text-xs font-medium uppercase tracking-wider mt-1 ${theme.accent} opacity-80`}>
                    {type === 'success' ? 'Journey Confirmed' : 
                     type === 'error' ? 'Check Details' : 'Final Destination'}
                  </p>
                </div>
              </motion.div>

              {/* Travel Passport-style Content */}
              <motion.div 
                className={`rounded-2xl p-6 mb-6 shadow-lg ${theme.light} ${theme.border}`}
                variants={itemVariants}
                style={{
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
              >
                <div className="text-base text-gray-800 leading-relaxed tracking-wide">
                  {children}
                </div>
              </motion.div>

              {/* Adventure Action Buttons */}
              <motion.div 
                className="flex gap-3"
                variants={itemVariants}
              >
                {type === 'confirm' ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 0.97, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleClose}
                      className="flex-1 group relative py-4 px-6 text-sm font-bold text-gray-700 
                        bg-white/80 hover:bg-white/100 backdrop-blur-xl border-2 border-gray-200/50 
                        rounded-2xl shadow-xl transition-all duration-300 overflow-hidden cursor-pointer
                        hover:shadow-2xl hover:border-indigo-300/70 hover:-rotate-1"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <X className="w-4 h-4" />
                        Stay Grounded
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/50 to-blue-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 0.97, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleConfirm}
                      className={`flex-1 group relative py-2 px-6 text-sm font-bold text-white rounded-2xl shadow-2xl 
                        transition-all duration-300 overflow-hidden cursor-pointer ${theme.button}
                        hover:shadow-3xl hover:-rotate-1 hover:scale-105`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Plane className="w-4 h-4" />
                        Take Flight
                      </span>
                      <div className="absolute inset-0 bg-white/20" />
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 0.97, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleClose}
                    className={`w-full group relative py-5 px-8 text-sm font-black text-white rounded-2xl shadow-2xl 
                      transition-all duration-300 overflow-hidden cursor-pointer ${theme.button}
                      hover:shadow-3xl hover:scale-[1.02] hover:rotate-[2deg]`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {type === 'success' ? (
                        <>
                          <PartyPopper className="w-4 h-4" />
                          Explore More
                        </>
                      ) : (
                        <>
                          <Map className="w-4 h-4" />
                          Try Again
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/30" />
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Floating Compass Close Button */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 360 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleClose}
              className="absolute top-3 right-3 w-12 h-12 bg-white/95 hover:bg-white 
                backdrop-blur-2xl shadow-2xl rounded-3xl flex items-center justify-center 
                text-gray-700 hover:text-red-600 transition-all duration-500 cursor-pointer 
                border-2 border-white/60 hover:border-orange-300/80 hover:shadow-3xl"
              aria-label="Close journey"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message_Popups;