import React from "react";
import Link from "next/link";

const CommonHeroSection = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs = [],
  height = "h-[350px]",
  overlay = "bg-black/10",
}) => {
  return (
    <div
      className={`relative w-full ${height} flex items-center justify-center`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative text-center text-white px-4 max-w-4xl">
        {breadcrumbs?.length > 0 && (
          <p className="text-sm mb-4 space-x-2">
            {breadcrumbs?.map((item, index) => (
              <span key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="opacity-80 hover:opacity-100 transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white capitalize">{item.label}</span>
                )}
                {index !== breadcrumbs.length - 1 && <span> / </span>}
              </span>
            ))}
          </p>
        )}
        <h3 className=" font-semibold capitalize">{title}</h3>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/90">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default CommonHeroSection;
