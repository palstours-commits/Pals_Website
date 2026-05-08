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
  height = "h-[350px]",
  overlay = "bg-gradient-to-t from-black/20 via-black/10 to-black/10",
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

      <div
        className={`absolute inset-0 ${overlay} transition-all duration-700 group-hover:bg-gradient-to-b group-hover:from-black/50 group-hover:to-transparent`}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:0s]" />
        <div className="absolute top-3/4 right-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping [animation-delay:1.5s]" />
        <div className="absolute bottom-1/4 left-1/4 w-2.5 h-2.5 bg-gradient-to-r from-white/40 to-blue-400/20 rounded-full animate-pulse [animation-delay:0.8s]" />
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce [animation-delay:2s]" />
      </div>
      <div className="relative text-center text-white px-4 max-w-4xl z-10">
        <h3
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl capitalize overflow-hidden leading-tight transition-all duration-1000 ${textVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            } group-hover:scale-[1.02]`}
        >
          <div className="flex items-center gap-2">
            {typeof title === 'string' && title.split(' ').length > 0 ? (
              title.split(' ').map((word, i) => (
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
        {subtitle && (
          <p
            className={`mt-6 text-base md:text-lg text-white/95 drop-shadow-2xl transition-all duration-1000 delay-500 ${textVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } group-hover:[text-shadow:0_0_25px_rgba(255,255,255,0.9)]`}
          >
            {subtitle}
          </p>
        )}
        {breadcrumbs?.length > 0 && (
          <div className="mt-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-700 flex flex-wrap justify-center items-center gap-4">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center space-x-2 text-sm text-white/80">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="relative no-underline hover:text-white/100 transition-all duration-400 hover:scale-110 inline-flex items-center space-x-1 group/link"
                  >
                    <span>{slugToTitle(item.label)}</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400/80 to-purple-500/80 group-hover/link:w-full transition-all duration-400 origin-left rounded-full" />
                  </Link>
                ) : (
                  <span className="text-white/100 font-semibold">{slugToTitle(item.label)}</span>
                )}
                {index !== breadcrumbs.length - 1 && (
                  <span className="text-white/50 font-light">/</span>
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
