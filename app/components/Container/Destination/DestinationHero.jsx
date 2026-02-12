import React from "react";
import bannerimg from "@/app/assets/detailsBanner.svg";
import Link from "next/link";

const DestinationHero = ({ title }) => {
  return (
    <>
      <div
        className="relative w-full h-[321px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerimg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center text-white px-4">
          <p className="text-sm mb-3  space-x-2">
            <Link href="/" className=" opacity-80">
              Home
            </Link>
            <span>/</span>
            <Link href="/packages" className=" opacity-80">
              India Holidays
            </Link>
            <span>/</span>
            <span className="capitalize text-white">{title}</span>
          </p>
          <h3 className="text-3xl md:text-5xl font-bold capitalize">
            Experience the Timeless Beauty of {title}
          </h3>
        </div>
      </div>
    </>
  );
};

export default DestinationHero;
