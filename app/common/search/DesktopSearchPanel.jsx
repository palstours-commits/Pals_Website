import { MapPin, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const DesktopSearchPanel = ({
  open,
  onClose,
  search,
  setSearch,
  inputRef,
  onSubmit,
  readOnly,
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
          className="fixed inset-0 z-[10000] hidden justify-end bg-black/40 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search holiday packages"
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl md:max-w-[420px] lg:max-w-[480px] xl:max-w-[540px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: 0.12 }}
              className="relative overflow-hidden border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-white px-6 py-7 lg:px-8 lg:py-9"
            >
              <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-red-100/70 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  {/* <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#da251c] shadow-sm">
                    <MapPin size={12} aria-hidden="true" />
                    Pals Holidays
                  </span> */}
                  <h2 className="flex items-center gap-2 !text-2xl font-bold tracking-tight text-gray-900 lg:!text-3xl">
                    <Search
                      size={24}
                      aria-hidden="true"
                      className="shrink-0 text-[#da251c]"
                    />
                    Search Destinations
                  </h2>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
                    Find the right package for your next memorable getaway.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close package search"
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:bg-red-100 hover:text-[#da251c]"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
            <motion.form
              onSubmit={onSubmit}
              role="search"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: 0.2 }}
              className="p-5 lg:px-6"
            >
              <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white p-1.5 shadow-sm transition focus-within:border-[#da251c] focus-within:shadow-md">
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
                  readOnly={readOnly}
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
              </div>
            </motion.form>
            {search.trim() && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto border-t border-gray-100"
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

export default DesktopSearchPanel;
