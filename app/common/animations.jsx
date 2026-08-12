export const fadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

export const fadeItem = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export const fastFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const heroFade = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeFromTop = {
  hidden: { opacity: 0, y: -80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeFromBottom = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


export const staggerOnly = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

export const HolidayPlannerSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBox key={i} className="h-9 w-24 rounded-full shrink-0" />
        ))}
      </div>
      <div className="flex gap-5 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[260px] h-[300px] rounded-xl overflow-hidden"
          >
            <SkeletonBox className="w-full h-full" />
          </div>
        ))}
      </div>
    </>
  );
};

export const TravelCardSkeleton = () => {
  return (
    <div className="relative rounded-xl overflow-hidden min-w-[220px] h-[360px] bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-linear-to-t from-gray-300/60 to-gray-200" />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
};


  export const HeaderSkeleton = () => {
  return (
    <>
      <div className="w-full bg-[#DA251C] text-white text-xs font-light text-center py-2 hidden md:block animate-pulse">
        <div className="h-4 w-3/4 mx-auto bg-red-400/30 rounded"></div>
      </div>

      <header className="sticky top-0 z-[9999] bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 h-20 flex items-center relative">
          <div className="z-10 md:relative top-2">
            <div className="flex items-center gap-3">
              <div className="h-[70px] md:h-[138px] w-[100px] overflow-hidden md:mt-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div className="hidden lg:flex ml-5 max-w-[900px] 2xl:max-w-[1060px] relative items-center h-12 w-full">
            <div className="hide-scrollbar flex overflow-x-auto overflow-y-hidden scroll-smooth whitespace-nowrap w-full">
              <div className="flex items-center gap-1 h-full flex-nowrap">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="relative group h-full flex items-center">
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden 2xl:flex items-center gap-4 ml-auto z-10 pl-4">
            <div className="flex items-center gap-1">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
            <div className="w-32 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
          <div className="lg:hidden ml-auto p-3 rounded-2xl">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    </>
  );
}