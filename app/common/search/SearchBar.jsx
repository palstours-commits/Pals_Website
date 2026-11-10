"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DesktopSearchPanel from "@/app/common/search/DesktopSearchPanel";
import MobileSearchPanel from "@/app/common/search/MobileSearchPanel";
import SearchResults from "@/app/common/search/SearchResults";
import {
  clearSearchResults,
  searchPackages,
} from "@/app/store/slice/searchSlice";

const SearchBar = ({ readOnly = false, onDropdownChange, className = "" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { results, loading, error } = useSelector((state) => state.search);
  const [search, setSearch] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isDesktopPanelOpen, setIsDesktopPanelOpen] = useState(false);
  const mobileInputRef = useRef(null);
  const desktopInputRef = useRef(null);

  useEffect(() => {
    const query = search.trim();
    if (!query) {
      dispatch(clearSearchResults());
      setIsDebouncing(false);
      onDropdownChange?.(false);
      return;
    }

    dispatch(clearSearchResults());
    setIsDebouncing(true);
    onDropdownChange?.(true);

    const timer = setTimeout(() => {
      dispatch(searchPackages(query));
      setIsDebouncing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, dispatch, onDropdownChange]);

  const closePanels = () => {
    setIsMobileSheetOpen(false);
    setIsDesktopPanelOpen(false);
    onDropdownChange?.(false);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;

    closePanels();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const selectPackage = (pkg) => {
    closePanels();
    router.push(`/package/${pkg.slug}`);
  };

  const openSearch = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setIsMobileSheetOpen(true);
      return;
    }

    setIsDesktopPanelOpen(true);
  };

  const resultsPanel = (
    <SearchResults
      results={results}
      loading={loading || isDebouncing}
      error={error}
      onSelect={selectPackage}
    />
  );

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        aria-label="Open package search"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#da251c] text-white transition hover:bg-[#b91c1c] ${className}`}
      >
        <Search size={17} aria-hidden="true" />
      </button>
      <MobileSearchPanel
        open={isMobileSheetOpen}
        onClose={closePanels}
        search={search}
        setSearch={setSearch}
        inputRef={mobileInputRef}
        onSubmit={submitSearch}
      >
        {resultsPanel}
      </MobileSearchPanel>
      <DesktopSearchPanel
        open={isDesktopPanelOpen}
        onClose={closePanels}
        search={search}
        setSearch={setSearch}
        inputRef={desktopInputRef}
        onSubmit={submitSearch}
        readOnly={readOnly}
      >
        {resultsPanel}
      </DesktopSearchPanel>
    </>
  );
};

export default SearchBar;
