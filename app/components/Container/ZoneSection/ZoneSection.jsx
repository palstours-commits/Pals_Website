"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import HolidayPlanner from "../../../common/HolidayPlanner";
import zone_banner from "@/app/assets/zone_banner.png";

const ZoneSection = ({ menu }) => {
  return (
    <>
      <CommonHeroSection
        title={
          <>
            Experience the Timeless Beauty
            <br />
            {menu}
          </>
        }
        backgroundImage={zone_banner}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: menu },
        ]}
      />
      <HolidayPlanner menuSlug={menu} activeSlugFromRoute={menu} />
    </>
  );
};

export default ZoneSection;