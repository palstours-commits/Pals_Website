import FeaturesMarquee from "./FeaturesMarquee";
import HolidayPlanner from "./HolidayPlanner";
import HomeBanneSection from "./HomeBanneSection";
import InspirationSection from "./InspirationSection";
import OurServices from "./OurServices";
import TopDestionation from "./TopDestionation";
import TrendingDestinations from "./TrendingDestinations";
import TrendingOffers from "./TrendingOffers";
import VisaExperience from "./VisaExperience";
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
