"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Info,
  X
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

  const getConfig = () => {
    switch(type) {
      case 'success':
        return {
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
          lightBg: 'bg-emerald-50',
          border: 'border-emerald-200',
          title: 'text-emerald-800',
          titleText: customTitle || 'Success!',
          description: 'Operation completed successfully',
          button: 'bg-emerald-600 hover:bg-emerald-700',
          confirmButton: 'bg-emerald-600 hover:bg-emerald-700',
          cancelButton: 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
        };
      case 'error':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          lightBg: 'bg-red-50',
          border: 'border-red-200',
          title: 'text-red-800',
          titleText: customTitle || 'Error!',
          description: 'Something went wrong',
          button: 'bg-red-600 hover:bg-red-700',
          confirmButton: 'bg-red-600 hover:bg-red-700',
          cancelButton: 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
        };
      case 'confirm':
        return {
          icon: HelpCircle,
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
          lightBg: 'bg-blue-50',
          border: 'border-blue-200',
          title: 'text-blue-800',
          titleText: customTitle || 'Confirm Action',
          description: 'Please confirm your choice',
          button: 'bg-blue-600 hover:bg-blue-700',
          confirmButton: 'bg-blue-600 hover:bg-blue-700',
          cancelButton: 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
        };
      case 'info':
      default:
        return {
          icon: Info,
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
          lightBg: 'bg-blue-50',
          border: 'border-blue-200',
          title: 'text-blue-800',
          titleText: customTitle || 'Information',
          description: 'New information available',
          button: 'bg-blue-600 hover:bg-blue-700',
          confirmButton: 'bg-blue-600 hover:bg-blue-700',
          cancelButton: 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  const handleClose = () => onClose?.();
  const handleConfirm = () => { onConfirm?.(); onClose?.(); };
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const popupVariants = shouldReduceMotion 
    ? {} 
    : {
        hidden: { 
          opacity: 0,
          y: "100%", // Start from bottom
          scale: 0.95
        },
        visible: { 
          opacity: 1,
          y: 0, // Move to center
          scale: 1,
          transition: { 
            type: "spring",
            damping: 30,
            stiffness: 300,
            duration: 0.5
          }
        },
        exit: { 
          opacity: 0,
          y: "-100%", // Exit to top
          scale: 0.95,
          transition: { 
            duration: 0.4,
            ease: "easeInOut"
          }
        }
      };

  const backdropVariants = shouldReduceMotion
    ? {}
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
      };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          <motion.div 
            ref={overlayRef}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={handleBackdropClick}
          />
          
          <motion.div
            variants={popupVariants}
            className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${config.iconBg}`}>
                  <Icon className={`w-6 h-6 ${config.iconColor}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${config.title}`}>
                    {config.titleText}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {config.description}
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl ${config.lightBg} border ${config.border} mb-5`}>
                <div className="text-sm text-gray-700">
                  {children}
                </div>
              </div>

              <div className="flex gap-3">
                {type === 'confirm' ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClose}
                      className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-colors ${config.cancelButton}`}
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      className={`flex-1 py-2.5 px-4 text-sm font-medium text-white rounded-lg transition-colors ${config.confirmButton}`}
                    >
                      Confirm
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className={`w-full py-2.5 px-4 text-sm font-medium text-white rounded-lg transition-colors ${config.button}`}
                  >
                    {type === 'success' ? 'Continue' : type === 'error' ? 'Try Again' : 'Got it'}
                  </motion.button>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center 
                text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message_Popups;