import React from "react";
import InspirationSection from "./InspirationSection";
import TrendingOffers from "./TrendingOffers";
import OurServices from "./OurServices";
import TrendingDestinations from "./TrendingDestinations";
import TopDestionation from "./TopDestionation";
import VisaExperience from "./VisaExperience";
import HolidayPlanner from "./HolidayPlanner";
import FeaturesMarquee from "./FeaturesMarquee";
import HomeBanneSection from "./HomeBanneSection";
const HomeSection = () => {
  return (
    <>
      <HomeBanneSection />
      <FeaturesMarquee />
      <HolidayPlanner />
      <VisaExperience />
      <TopDestionation />
      <TrendingDestinations />
      <OurServices />
      <TrendingOffers />
      <InspirationSection />
    </>
  );
};

export default HomeSection;
