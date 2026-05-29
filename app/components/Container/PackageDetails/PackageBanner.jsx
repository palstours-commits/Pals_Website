"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const PackageBanner = ({ bgimg, images = [] }) => {
  const allImages = images.length > 0 ? images : (bgimg ? [bgimg] : []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullView, setFullView] = useState(null);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  if (allImages.length === 0) return <div className="w-full aspect-video bg-gray-100 rounded-3xl" />;

  return (
    <div className="relative w-full overflow-hidden shadow-2xl border border-gray-100 bg-gray-900">
      <AnimatePresence>
        {fullView && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setFullView(null)}
          >
            <button className="absolute top-6 right-6 text-white z-[101] bg-black/50 p-2 rounded-full"><X size={24} /></button>
            <img src={fullView} className="max-w-full max-h-full object-contain rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-full aspect-[4/3] md:aspect-[16/6] grid grid-cols-12 gap-1 p-1">
        <motion.div
          key={allImages[activeIndex]}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="col-span-12 md:col-span-7 h-full rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => setFullView(allImages[activeIndex])}
        >
          <img src={allImages[activeIndex]} className="w-full h-full object-cover" alt="Main" />
        </motion.div>
        <div className="hidden md:grid col-span-5 h-full grid-cols-2 grid-rows-2 gap-1.5">
          {[1, 2, 3, 4].map((offset) => {
            const imgIndex = (activeIndex + offset) % allImages.length;
            return (
              <div
                key={offset}
                className="rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setFullView(allImages[imgIndex])}
              >
                <img src={allImages[imgIndex]} className="w-full h-full object-cover hover:scale-105 transition-transform" alt="Side" />
              </div>
            );
          })}
        </div>
      </div>
      {allImages.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => (prev - 1 + allImages.length) % allImages.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md z-30"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => (prev + 1) % allImages.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md z-30"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur z-20">
        {activeIndex + 1} / {allImages.length}
      </div>
    </div>
  );
};

export default PackageBanner;