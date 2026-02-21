import CommonHeroSection from "@/app/common/CommonHeroSection";
import React from "react";
import bannerimg from "@/app/assets/explore-bg.svg";


const CareerSection = () => {
  return (
    <>
      <CommonHeroSection
        title={`Career`}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career" || "Destination" },
        ]}
      />
    </>
  );
};

export default CareerSection;
