import FeaturesMarquee from "./FeaturesMarquee";
import HolidayPlanner from "../../../common/HolidayPlanner";
import HomeBanneSection from "./HomeBanneSection";
import InspirationSection from "./InspirationSection";
import OurServices from "./OurServices";
import TopDestionation from "./TopDestionation";
import TrendingDestinations from "./TrendingDestinations";
import TrendingOffers from "./TrendingOffers";
import VisaExperience from "./VisaExperience";
import NewZonePlanner from "./NewZonePlanner";
const HomeSection = () => {
  return (
    <>
      <HomeBanneSection />
      <FeaturesMarquee />
      <NewZonePlanner />
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
