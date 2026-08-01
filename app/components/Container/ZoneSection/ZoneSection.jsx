"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import HolidayPlanner from "../../../common/HolidayPlanner";
import indiaBanner from "@/app/assets/india_banner.jpg";
import internationalBanner from "@/app/assets/international_banner.jpg";
import spiritualBanner from "@/app/assets/spiritual_banner.jpg";
import honeymoonBanner from "@/app/assets/honeymoon_banner.jpg";
import cruiseBanner from "@/app/assets/cruise_banner.jpg";
import defaultBanner from "@/app/assets/zone_banner.png";

const ZoneSection = ({ menu }) => {
  const getBanner = () => {
    switch (menu?.toLowerCase()) {
      case "india":
        return indiaBanner;
      case "international":
        return internationalBanner;
      case "honeymoon":
        return honeymoonBanner;
      case "spiritual":
        return spiritualBanner;
      case "cruise":
        return cruiseBanner;
      default:
        return defaultBanner;
    }
  };

  const getBannerContent = () => {
    const menuName = menu?.toLowerCase() || "";
    const content = {
      spiritual: {
        title: "Discover the Sacred Soul of India",
        subtitle: "Experience timeless traditions, divine blessings, and unforgettable spiritual journeys across Incredible India.",
        highlightWords: ["Soul", , "of", "India"],
        description: ""
      },
      india: {
        tagline: "Let us plan your",
        title: "Perfect India Holiday",
        subtitle: "Discover Serene Backwaters, Misty Hills, Pristine Beaches, Rich Culture & Unforgettable Experiences.",
        highlightWords: ["Holiday"],
        description: ""
      },
      international: {
        title: "Your Dream Holiday Begins Here",
        subtitle: "Explore the World. Create Unforgettable Memories.",
        highlightWords: ["Holiday"],
        description: ""
      },
      honeymoon: {
        title: "Begin Your Forever with an Unforgettable Honeymoon",
        highlightWords: ["Unforgettable", "Honeymoon"],
      },
      cruise: {
        title: "YOUR DREAM CRUISE STARTS HERE",
        subtitle: "From breathtaking oceans to iconic destinations, experience luxury cruise holidays designed just for you.",
        highlightWords: ["CRUISE",],
        description: ""
      },
      default: {
        tagline: "Begin your journey with",
        title: "Unforgettable Experience",
        subtitle: "Discover the best of India with our curated travel experiences.",
        highlightWords: ["Unforgettable", "Experience"],
        description: ""
      }
    };
    return content[menuName] || content.default;
  };

  const content = getBannerContent();

  return (
    <>
      <CommonHeroSection
        backgroundImage={getBanner()}
        tagline={content.tagline}
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
        textAlign="left"
        isTextVisible={true}
        height="min-h-[300px] sm:min-h-[400px] md:h-[450px] lg:h-[500px]"
        overlay="bg-gradient-to-r from-black/70 via-black/40 to-transparent"
        highlightColor="text-red-500"
        highlightWords={content.highlightWords}
      />

      <HolidayPlanner
        menuSlug={menu}
        activeSlugFromRoute={menu}
      />
    </>
  );
};

export default ZoneSection;