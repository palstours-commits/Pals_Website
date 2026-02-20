"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import bannerimg from "@/app/assets/blog-details.svg";
import CustomImage from "@/app/common/Image";

import { getBlogBySlug, clearBlogDetails } from "@/app/store/slice/blogSlice";

const BlogDetailsSection = ({ slug }) => {
  const dispatch = useDispatch();
  const { blogDetails, loading } = useSelector((state) => state.blog);
  useEffect(() => {
    if (slug) dispatch(getBlogBySlug(slug));
    return () => {
      dispatch(clearBlogDetails());
    };
  }, [dispatch, slug]);

  if (loading || !blogDetails) return null;

  return (
    <>
      <CommonHeroSection
        title={blogDetails.title}
        backgroundImage={blogDetails.featuredImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blogDetails.title, href: `/blog/${slug}` },
        ]}
      />
      <MainLayout className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
        <p className="text-sm text-gray-500">
          {new Date(blogDetails.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {blogDetails.shortDescription}
        </p>
        {blogDetails.featuredImage && (
          <CustomImage
            src={blogDetails.featuredImage}
            alt={blogDetails.title}
            width={1200}
            height={600}
            className="w-full h-[500px] rounded-lg my-10 object-cover"
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: blogDetails.description,
              }}
            />
          </div>
          <div className="lg:col-span-4">
            <div className="relative w-full h-[300px] rounded-md overflow-hidden">
              <CustomImage
                src={blogDetails.featuredImage || bannerimg.src}
                alt="Blog Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default BlogDetailsSection;
