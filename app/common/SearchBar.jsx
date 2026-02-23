"use client";
import { Camera, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CustomImage from "@/app/common/Image";
import {
  searchPackages,
  clearSearchResults,
} from "@/app/store/slice/searchSlice";

const SearchBar = ({ readOnly = false, onDropdownChange }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { results } = useSelector((state) => state.search);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (search.trim().length >= 2) {
      dispatch(searchPackages(search));
      setShowDropdown(true);
      onDropdownChange?.(true);
    } else {
      dispatch(clearSearchResults());
      setShowDropdown(false);
      onDropdownChange?.(false);
    }
  }, [search, dispatch]);

  return (
    <div className="relative bg-white border border-gray-200 rounded-full flex items-center gap-4 shadow-md px-5 sm:px-6 py-3 max-w-xl w-full mb-6 md:mb-0">
      <Camera size={18} className="text-gray-600 shrink-0" />
      <div className="relative flex-1 ">
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={search}
          readOnly={readOnly}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => !readOnly && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
        />
        {showDropdown && !readOnly && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="
  absolute left-[-46px] top-12
  md:w-[560px]
  z-50
  rounded-xl
  border border-gray-200
  bg-white
  shadow-lg
  max-h-72 overflow-y-auto
"
          >
            {results?.length > 0 ? (
              results.map((pkg) => (
                <div
                  key={pkg._id}
                  onClick={() => {
                    setShowDropdown(false);
                    onDropdownChange?.(false);
                    router.push(`/package/${pkg.slug}`);
                  }}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <CustomImage
                        src={pkg.images?.[0]}
                        alt={pkg.packageName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {pkg.packageName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {pkg.zoneId?.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                No packages found
              </div>
            )}
          </div>
        )}
      </div>
      <button className="bg-red-600 hover:bg-red-700 transition h-9 w-22 rounded-full flex items-center justify-center">
        <Search size={16} className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
