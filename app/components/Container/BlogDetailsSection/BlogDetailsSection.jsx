import CommonHeroSection from "@/app/common/CommonHeroSection";
import React from "react";
import bannerimg from "@/app/assets/blog-details.svg";
import MainLayout from "@/app/common/MainLayout";
import Image from "next/image";
const BlogDetailsSection = ({ slug }) => {
  return (
    <>
      <CommonHeroSection
        title={slug}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: slug, href: `/blog/${slug}` },
        ]}
      />
      <MainLayout
        className={"max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6"}
      >
        <p>
          Mount Inerie is the tallest volcano on the island of Flores, and it
          might just be one of the most symmetrical volcanoes in the world. At
          sunrise, it casts a perfect shadow like a natural pyramid. I hiked
          Inerie recently and it was an awesome experience. There’s plenty of
          challenge, but anyone who’s a fit hiker can do it. I’d recommend
          hiring a local guide like I did, because the path to the top can be
          hard to follow, and people usually start in the dark in order to see
          sunrise on the summit. This guide will explain how to hike Inerie, and
          everything you need to know before you go!
        </p>
        <Image
          src={bannerimg.src}
          alt="Blog Details Image"
          width={800}
          height={400}
          className="w-full h-auto rounded-lg my-10"
        />

        <div className="py-6 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Travel is constantly evolving, and 2026 will be no exception.
                  Airbnb forecasts that travelers will seek to make the most of
                  their time away, rooted in authentic and immersive
                  experiences:
                </p>

                <ul className="space-y-4 list-disc pl-5 text-gray-700 leading-relaxed">
                  <li>
                    Gen Z is leading the shift toward short, international
                    escapes.
                  </li>
                  <li>
                    Outdoor lovers are heading to national parks for restorative
                    adventures.
                  </li>
                  <li>
                    Travelers are transforming major global events into
                    once-in-a-lifetime “mainstage” journeys.
                  </li>
                  <li>
                    Culinary journeys are more interactive than ever, with
                    hands-on classes and wine regions drawing in curious
                    explorers.
                  </li>
                  <li>
                    Influencers predict places with awe-inspiring scenery,
                    lively local culture, and exhilarating outdoor adventures
                    will be the most exciting destinations to visit in 2026.
                  </li>
                  <li>
                    Solo adventurers are prioritizing self-discovery in rising
                    destinations.
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-4">
                <div className="relative w-full h-[300px] rounded-md overflow-hidden">
                  <Image
                    src={bannerimg.src}
                    alt="Blog Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default BlogDetailsSection;
