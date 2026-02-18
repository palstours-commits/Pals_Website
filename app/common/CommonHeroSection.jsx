import React from "react";
import Link from "next/link";
import { getImageUrl } from "../utils/getImageUrl";
import { slugToTitle } from "../utils/slugToTitle";

const CommonHeroSection = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs = [],
  height = "h-[350px]",
  overlay = "bg-gradient-to-t from-black/70 via-black/40 to-black/20",
}) => {
  const bgImage = getImageUrl(backgroundImage);
  return (
    <div
      className={`relative w-full ${height} flex items-center justify-center `}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative text-center text-white px-4 max-w-4xl">
        {breadcrumbs?.length > 0 && (
          <p className="text-sm mb-4 space-x-2 text-white/90 drop-shadow">
            {breadcrumbs?.map((item, index) => (
              <span key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="no-underline opacity-80 hover:opacity-100 transition capitalize"
                  >
                    {slugToTitle(item.label)}
                  </Link>
                ) : (
                  <span className="text-white capitalize">
                    {slugToTitle(item.label)}
                  </span>
                )}
                {index !== breadcrumbs.length - 1 && <span> / </span>}
              </span>
            ))}
          </p>
        )}
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg capitalize">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/90 drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommonHeroSection;
