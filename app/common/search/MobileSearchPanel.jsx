import { MapPin, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const MobileSearchPanel = ({
  open,
  onClose,
  search,
  setSearch,
  inputRef,
  onSubmit,
  children,
}) => {
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, inputRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-end bg-black/40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search holiday packages"
            className="w-full rounded-t-3xl bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
            }}
          >
            <form onSubmit={onSubmit} role="search" className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.12 }}
                className="mb-5 flex items-start justify-between"
              >
                <div>
                  {/* <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#da251c]">
                    Plan your next getaway
                  </span> */}
                  <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900">
                    <Search
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-[#da251c]"
                    />
                    Search Destinations
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Find a holiday that feels like yours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close package search"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-red-50 hover:text-[#da251c]"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white p-1.5 shadow-sm transition focus-within:border-[#da251c] focus-within:shadow-md"
              >
                <MapPin
                  size={18}
                  aria-hidden="true"
                  className="ml-2 shrink-0 text-gray-500"
                />
                <input
                  ref={inputRef}
                  type="search"
                  aria-label="Search holiday packages"
                  autoComplete="off"
                  placeholder="Search destinations or packages"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  aria-label="Search packages"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#da251c] text-white"
                >
                  <Search size={17} aria-hidden="true" />
                </button>
              </motion.div>
            </form>
            {search.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="max-h-[55vh] overflow-y-auto border-t border-gray-100 pb-4"
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchPanel;
