import Link from "next/link";
import CustomImage from "./Image";
import { ArrowUpRight, MapPin } from "lucide-react";

const TravelCard = ({
  img,
  title,
  duration,
  slug,
  newArrivals,
  isTrending,
  isPopularDestinations,
  location,
  showLocationIcon = true,
}) => {
  return (
    <Link href={`/package/${slug}`} className="block">
      <div className="relative rounded-2xl overflow-hidden min-w-[241px] h-[320px] cursor-pointer group bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
          <CustomImage src={img} alt={title} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />
        <div className="absolute top-0 left-0 flex gap-2 z-10">
          {newArrivals && (
            <span className="bg-yellow-400 text-black text-[12px] px-2 py-1 rounded font-bold">
              NEW
            </span>
          )}
          {isTrending && (
            <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded font-bold">
              TRENDING
            </span>
          )}
          {isPopularDestinations && (
            <span className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold">
              POPULAR
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-4 right-4 text-white z-10 pb-4">
          <div className="flex items-end justify-between gap-3 pb-1">
            <h5 className="travel-serif font-semibold text-[17px] leading-tight max-w-[calc(100%-42px)]">{title}</h5>
            <span className="w-9 h-9 shrink-0 rounded-full border border-white/70 flex items-center justify-center group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300">
              <ArrowUpRight size={17} strokeWidth={2.2} />
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-1 overflow-hidden pt-1 text-[11px] text-white/90" title={location || undefined}>
            {location && <span className="inline-flex min-w-0 max-w-full items-center gap-1 truncate" title={location}>{showLocationIcon && <MapPin size={12} className="shrink-0" />}<span className="truncate">{location.replace(/[–—→]/g, " · ")}</span></span>}
            {duration && <span className="order-first">{duration}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TravelCard;
