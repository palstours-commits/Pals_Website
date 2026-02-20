"use client";
import React from "react";

const PackageBanner = ({ bgimg }) => {
  if (!bgimg) {
    return (
      <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading banner...</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[360px]"
      style={{
        backgroundImage: `url(${encodeURI(bgimg)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default PackageBanner;
