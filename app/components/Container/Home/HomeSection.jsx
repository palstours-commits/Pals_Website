import FeaturesMarquee from "./FeaturesMarquee";
import HomeBanneSection from "./HomeBanneSection";
import InspirationSection from "./InspirationSection";
import OurServices from "./OurServices";
import TopDestionation from "./TopDestionation";
import TrendingDestinations from "./TrendingDestinations";
import TrendingOffers from "./TrendingOffers";
import VisaExperience from "./VisaExperience";
import NewZonePlanner from "./NewZonePlanner";
import AssociationCarousel from "./AssociationCarousel";
import FaqSection from "./FaqSection";
import TestimonialSection from "./TestimonialSection";
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
      <AssociationCarousel />
      <InspirationSection />
      <TestimonialSection />
      <FaqSection />
    </>
  );
};

export default HomeSection;
