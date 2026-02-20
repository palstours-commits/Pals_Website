import React from "react";
import bannerimg from "@/app/assets/tample.svg";

const Packagebanner = () => {
  return (
    <div
      className="relative w-full h-[300px]"
      style={{
        backgroundImage: `url(${bannerimg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default Packagebanner;
