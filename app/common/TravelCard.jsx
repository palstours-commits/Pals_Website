import Link from "next/link";
import CustomImage from "./Image";

const TravelCard = ({
  img,
  title,
  duration,
  slug,
  newArrivals,
  isTrending,
  isPopularDestinations,
}) => {
  return (
    <Link href={`/package/${slug}`} className="block">
      <div className="relative rounded-xl overflow-hidden min-w-[241px] h-[360px] cursor-pointer group shadow">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
          <CustomImage src={img} alt={title} fill className="object-cover" />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-40 
     bg-linear-to-t from-black/90 via-black/50 to-transparent
     transition-opacity duration-300 group-hover:from-black/80"
        />
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
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h5 className="font-semibold leading-tight">{title}</h5>
          <p className="text-xs opacity-90">{duration}</p>
        </div>
      </div>
    </Link>
  );
};

export default TravelCard;
