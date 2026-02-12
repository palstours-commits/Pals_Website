import React from "react";
import bannerimg from "@/app/assets/tample.svg";

const TravelHero = () => {
  return (
    <div
      className="relative w-full h-[500px]"
      style={{
        backgroundImage: `url(${bannerimg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    </div>
  );
};

export default TravelHero;
