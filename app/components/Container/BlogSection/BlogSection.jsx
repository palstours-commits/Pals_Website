import React from "react";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import bannerimg from "@/app/assets/blog-bg.svg";
import { blogData } from "@/app/utils/mockDatas";
import BlogCard from "@/app/common/BlogCard";

const BlogSection = () => {
  return (
    <>
      <CommonHeroSection
        title="Journey Journals Travel Tales"
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
        <h4 className="font-semibold m-0">Recent Travel Stories</h4>
        <p>
          Explore our newest blogs filled with travel inspiration, must-visit
          <br />
          places, and expert advice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-[500px]">
            <BlogCard item={blogData[0]} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-[241px]">
              <BlogCard item={blogData[1]} />
            </div>
            <div className="h-[241px]">
              <BlogCard item={blogData[2]} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogData?.slice(4).map((item) => (
            <div key={item.id} className="h-[250px]">
              <BlogCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogSection;
