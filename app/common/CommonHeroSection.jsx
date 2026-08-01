"use client";
import Link from "next/link";
import { useRef } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { slugToTitle } from "../utils/slugToTitle";

const CommonHeroSection = ({
  title = "",
  subtitle,
  backgroundImage,
  breadcrumbs = [],
  height = "min-h-[300px] sm:min-h-[400px] md:h-[450px] lg:h-[500px]",
  overlay = "bg-gradient-to-r from-black/80 via-black/50 to-transparent",
  textAlign = "center",
  showBadge = false,
  badgeText = "",
  isTextVisible = true,
  tagline = "",
  highlightColor = "text-red-500",
  highlightWords = [],
  description = "",
}) => {
  const containerRef = useRef(null);
  const bgImage = getImageUrl(backgroundImage);

  const hasContent = title || subtitle || tagline || description || (breadcrumbs?.length > 0);

  const alignmentClasses = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  const contentAlignment = alignmentClasses[textAlign] || alignmentClasses.left;

  const paddingClasses = {
    center: "px-4 sm:px-6",
    left: "px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20",
    right: "px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20",
  };

  const containerPadding = paddingClasses[textAlign] || paddingClasses.left;

  const maxWidthClasses = {
    center: "max-w-4xl mx-auto",
    left: "max-w-4xl ml-0 mr-auto",
    right: "max-w-4xl ml-auto mr-0",
  };

  const containerMaxWidth = maxWidthClasses[textAlign] || maxWidthClasses.left;

  const renderHighlightedTitle = () => {
    if (!title) return null;

    const words = typeof title === "string" ? title.split(" ") : [];

    return words.map((word, i) => {
      const isHighlighted = highlightWords.some(
        (hw) => word.toLowerCase() === hw.toLowerCase()
      );

      return (
        <span
          key={i}
          className={`inline-block ${isHighlighted ? highlightColor : "text-white"}`}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${height} flex    overflow-hidden ${textAlign === "left" ? "items-end md:items-center justify-start" : "items-center justify-center"} `}
    >
      <div
        className="absolute inset-0 "
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="md:px-10 lg:px-15">
        {hasContent && isTextVisible && (
          <div className={`relative text-white ${containerPadding} py-10 z-10 w-full flex flex-col ${contentAlignment}`}>
            <div className={containerMaxWidth}>
              {tagline && (
                <p className="text-sm font-medium text-red-500 uppercase mb-2 tracking-wider">
                  {tagline}
                </p>
              )}

              {showBadge && badgeText && !tagline && (
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  {badgeText}
                </span>
              )}

              {title && (
                <h2
                  className={`w-full max-w-md  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-2xl leading-[1.1] ${textAlign === "left"
                    ? "text-left"
                    : textAlign === "right"
                      ? "text-right"
                      : " md:text-center"
                    }`}
                >
                  <div
                    className={`flex flex-wrap ${textAlign === "center"
                      ? "justify-center"
                      : textAlign === "left"
                        ? "justify-start"
                        : "justify-end"
                      } items-center gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2`}
                  >
                    {renderHighlightedTitle()}
                  </div>
                </h2>
              )}

              {subtitle && (
                <p
                  className={`mt-3 sm:mt-4  max-w-lg text-sm sm:text-base md:text-lg lg:text-xl text-white/90 drop-shadow-2xl max-w-2xl ${textAlign === "center" ? "mx-auto" : textAlign === "left" ? "ml-0 mr-auto" : "ml-auto mr-0"}`}
                >
                  {subtitle}
                </p>
              )}

              {description && (
                <p
                  className={`mt-2 text-sm sm:text-base text-white/80 drop-shadow-2xl max-w-2xl ${textAlign === "center" ? "mx-auto" : textAlign === "left" ? "ml-0 mr-auto" : "ml-auto mr-0"}`}
                >
                  {description}
                </p>
              )}

              {breadcrumbs?.length > 0 && (
                <div
                  className={`mt-4 flex flex-wrap ${textAlign === "center" ? "justify-center" : textAlign === "left" ? "justify-start" : "justify-end"} items-center gap-2 sm:gap-3`}
                >
                  {breadcrumbs.map((item, index) => (
                    <span key={index} className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-white/80">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="relative no-underline hover:text-white transition-all duration-300 hover:scale-105 inline-flex items-center py-1 group/link"
                        >
                          <span>{slugToTitle(item.label)}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-red-400/80 to-red-600/80 group-hover/link:w-full transition-all duration-300 rounded-full" />
                        </Link>
                      ) : (
                        <span className="text-white font-medium px-1">{slugToTitle(item.label)}</span>
                      )}
                      {index !== breadcrumbs.length - 1 && (
                        <span className="text-white/40 font-light text-xs">/</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonHeroSection;