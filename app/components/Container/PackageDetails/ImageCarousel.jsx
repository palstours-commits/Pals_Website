import CustomImage from "@/app/common/Image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ImageCarousel = ({ images, currentIndex, onNext, onPrev, onClose }) => {

  if (!images || images.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden">
          <CustomImage
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
        >
          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
        {images.length > 1 && (
          <div className="absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 p-2 bg-black/50 backdrop-blur-sm rounded-xl overflow-x-auto max-w-[90vw]">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onPrev()}
                className={`relative w-10 h-10 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all flex-shrink-0 ${idx === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                  }`}
              >
                <CustomImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};