"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { slugToTitle } from "../utils/slugToTitle";

const CommonHeroSection = ({
  title = "",
  subtitle,
  backgroundImage,
  breadcrumbs = [],
  height = "min-h-[250px] sm:min-h-[300px] md:h-[350px] lg:h-[400px]", // Made default height responsive
  overlay = "bg-gradient-to-t from-black/50 via-black/20 to-black/20", // Slightly darkened for better mobile readability
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textVisible, setTextVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const bgImage = getImageUrl(backgroundImage);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${height} flex items-center justify-center overflow-hidden group`}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${mousePosition.y}px ${mousePosition.x}px`,
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) scale(1.03)`,
          filter: "brightness(0.85) contrast(1.05)",
        }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${overlay} transition-all duration-700 group-hover:bg-gradient-to-b group-hover:from-black/60 group-hover:to-transparent`}
      />

      {/* Floating Particles - Adjusted sizes and positioning for mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-4 sm:left-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/30 rounded-full animate-bounce [animation-delay:0s]" />
        <div className="absolute top-3/4 right-6 sm:right-20 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/20 rounded-full animate-ping [animation-delay:1.5s]" />
        <div className="absolute bottom-1/4 left-1/4 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gradient-to-r from-white/40 to-blue-400/20 rounded-full animate-pulse [animation-delay:0.8s]" />
        <div className="absolute bottom-1/3 right-1/4 sm:right-1/3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/25 rounded-full animate-bounce [animation-delay:2s]" />
      </div>

      {/* Main Content */}
      <div className="relative text-center text-white px-4 sm:px-6 py-10 max-w-4xl z-10 w-full">
        
        {/* Title */}
        <h3
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl capitalize overflow-hidden leading-tight transition-all duration-1000 ${
            textVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          } group-hover:scale-[1.02]`}
        >
          {/* Added flex-wrap and gap-y to prevent horizontal overflow on mobile */}
          <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2">
            {typeof title === "string" && title.split(" ").length > 0 ? (
              title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    transform: textVisible ? `translateY(0)` : `translateY(30px)`,
                    opacity: textVisible ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.1}s`,
                  }}
                >
                  {word}
                </span>
              ))
            ) : (
              <span
                className="inline-block"
                style={{
                  transform: textVisible ? `translateY(0)` : `translateY(30px)`,
                  opacity: textVisible ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                }}
              >
                {title}
              </span>
            )}
          </div>
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/95 drop-shadow-2xl transition-all duration-1000 delay-500 max-w-2xl mx-auto ${
              textVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } group-hover:[text-shadow:0_0_25px_rgba(255,255,255,0.9)]`}
          >
            {subtitle}
          </p>
        )}

        {/* Breadcrumbs - Changed from group-hover to automatic fade-in so mobile users can see it */}
        {breadcrumbs?.length > 0 && (
          <div
            className={`mt-6 sm:mt-10 transition-all duration-1000 delay-[800ms] flex flex-wrap justify-center items-center gap-2 sm:gap-3 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-white/80">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="relative no-underline hover:text-white transition-all duration-300 hover:scale-105 inline-flex items-center py-1 group/link"
                  >
                    <span>{slugToTitle(item.label)}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400/80 to-purple-500/80 group-hover/link:w-full transition-all duration-300 rounded-full" />
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
  );
};

export default CommonHeroSection;