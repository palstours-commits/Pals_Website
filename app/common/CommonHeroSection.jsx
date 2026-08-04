"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getImageUrl } from "../utils/getImageUrl";
import { slugToTitle } from "../utils/slugToTitle";

const CommonHeroSection = ({
  title = "",
  subtitle,
  backgroundImage,
  breadcrumbs = [],
  height = "h-[450px] sm:h-[500px] md:h-[450px] lg:h-[500px]",
  overlay = "bg-gradient-to-r from-black/80 via-black/50 to-transparent",
  textAlign = "center",
  showBadge = false,
  badgeText = "",
  isTextVisible = true,
  tagline = "",
  highlightColor = "text-[#da251c]",
  highlightWords = [],
  description = "",
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const desktopImage = getImageUrl(
    backgroundImage?.desktop || backgroundImage
  );

  const mobileImage = getImageUrl(
    backgroundImage?.mobile || backgroundImage
  );
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const renderHighlightedTitle = () => {
    if (!title) return null;

    const words = typeof title === "string" ? title.split(" ") : [];

    return words.map((word, i) => {
      const isHighlighted = highlightWords.some(
        (hw) => word.toLowerCase() === hw.toLowerCase()
      );

      return (
        <motion.span
          key={i}
          custom={i}
          variants={titleWordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`inline-block ${isHighlighted
            ? `${highlightColor}`
            : textAlign === "left"
              ? "text-[#fff] md:text-[#4A2E14]"
              : "text-white md:text-white"
            }`}
        >
          {word}
        </motion.span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${height} flex overflow-hidden ${textAlign === "left" ? "items-center justify-start" : "items-center justify-center"}`}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${desktopImage})`,
          }}
        />
        <div
          className="block md:hidden absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>
      {
        textAlign === "left" && (
          <div className="block md:hidden absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        )
      }

      {overlay && textAlign === "center" && (
        <motion.div
          className={`absolute inset-0 ${overlay}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      )}

      <div className="md:px-10 lg:px-15">
        {hasContent && isTextVisible && (
          <motion.div
            className={`relative text-white ${containerPadding}  py-10 z-10 w-full flex flex-col ${contentAlignment}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className={containerMaxWidth}>
              {tagline && (
                <motion.p
                  variants={itemVariants}
                  className="text-sm font-medium text-[#da251c] uppercase mb-2 tracking-wider"
                >
                  {tagline}
                </motion.p>
              )}

              {showBadge && badgeText && !tagline && (
                <motion.span
                  variants={itemVariants}
                  className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                >
                  {badgeText}
                </motion.span>
              )}

              {title && (
                <motion.h2
                  className={`w-full max-w-[250px] md:max-w-md text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${textAlign === "left"
                    ? "text-left"
                    : textAlign === "right"
                      ? "text-right"
                      : "md:text-center"
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
                </motion.h2>
              )}

              {subtitle && (
                <motion.p
                  variants={itemVariants}
                  className={`mt-3 sm:mt-4 max-w-[250px] md:max-w-md text-sm sm:text-base md:text-lg lg:text-xl ${textAlign === "center"
                    ? "mx-auto text-white md:text-white"
                    : textAlign === "left"
                      ? "ml-0 mr-auto text-white md:text-black"
                      : "ml-auto mr-0 text-white md:text-white/80"
                    } drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:drop-shadow-2xl max-w-2xl`}
                >
                  {subtitle}
                </motion.p>
              )}

              {description && (
                <motion.p
                  variants={itemVariants}
                  className={`mt-2 text-sm sm:text-base ${textAlign === "center"
                    ? "mx-auto text-white md:text-white"
                    : textAlign === "left"
                      ? "ml-0 mr-auto text-white md:text-black"
                      : "ml-auto mr-0 text-white md:text-white/80"
                    } drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:drop-shadow-2xl max-w-2xl`}
                >
                  {description}
                </motion.p>
              )}

              {breadcrumbs?.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className={`mt-4 flex flex-wrap ${textAlign === "center" ? "justify-center" : textAlign === "left" ? "justify-start" : "justify-end"
                    } items-center gap-2 sm:gap-3`}
                >
                  {breadcrumbs.map((item, index) => (
                    <span key={index} className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
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
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommonHeroSection;