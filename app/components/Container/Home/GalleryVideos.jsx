"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { IoIosPlay, IoIosPause } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getGalleryVideos } from "@/app/store/slice/gallerySlice";

export default function GalleryVideos() {
    const dispatch = useDispatch();

    const VIDEO_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL || "";

    const { galleryVideos = [], videoLoading } = useSelector(
        (state) => state.gallery
    );

    const [playingVideo, setPlayingVideo] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const videoRefs = useRef({});

    useEffect(() => {
        if (!galleryVideos?.length) {
            dispatch(getGalleryVideos());
        }
    }, [dispatch, galleryVideos.length]);

    const isSingle = galleryVideos.length === 1;

    const getVideoUrl = (video) => {
        const file =
            video?.videoUrl ||
            video?.file ||
            video?.url ||
            video?.fileUrl ||
            video?.path ||
            "";

        if (!file) return "";

        if (file.startsWith("http")) {
            return file;
        }

        return `${VIDEO_URL}/${file}`.replace(/([^:]\/)\/+/g, "$1");
    };

    const handleVideoPlay = async (id) => {
        const video = videoRefs.current[id];

        if (!video) return;

        // Pause current video
        if (playingVideo === id) {
            video.pause();
            setPlayingVideo(null);
            return;
        }

        // Pause all other videos
        Object.entries(videoRefs.current).forEach(([videoId, element]) => {
            if (element && videoId !== id) {
                element.pause();
                element.currentTime = 0;
                element.muted = true;
            }
        });

        try {
            video.muted = false;
            await video.play();
            setPlayingVideo(id);
        } catch (error) {
            console.log("Video play error:", error);
        }
    };

    const handleVideoEnd = () => {
        setPlayingVideo(null);
    };

    const getCenterIndex = (swiper) => {
        if (!swiper) return 0;

        const perView =
            typeof swiper.params.slidesPerView === "number"
                ? Math.floor(swiper.params.slidesPerView)
                : 3;

        return swiper.activeIndex + Math.floor(perView / 2);
    };

    const playCenterVideo = async (index) => {
        Object.values(videoRefs.current).forEach((video) => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        const current = galleryVideos[index];

        if (!current) return;

        const id = current?._id || current?.id;

        const videoElement = videoRefs.current[id];

        if (!videoElement) return;

        try {
            videoElement.muted = true;
            await videoElement.play();
            setPlayingVideo(id);
        } catch (error) {
            console.log("Autoplay blocked:", error);
        }
    };

    if (videoLoading) {
        return (
            <div className="w-full py-20 text-center text-gray-500">
                Loading gallery videos...
            </div>
        );
    }

    if (!galleryVideos.length) {
        return null;
    }

    return (
        <section className="w-full px-4 pt-8 md:pt-16 flex flex-col items-center overflow-hidden">

            {/* TITLE ANIMATION */}
            <div className="flex items-center gap-4 mb-6 md:mb-10">

                <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 64, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:block h-px bg-gray-800"
                />

                <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 32, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:hidden h-px bg-gray-800"
                />

                <motion.h4
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="text-xl md:text-3xl font-bold tracking-wide whitespace-nowrap"
                >
                    Client Reviews
                </motion.h4>

                <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 64, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:block h-px bg-gray-800"
                />

                <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 32, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:hidden h-px bg-gray-800"
                />

            </div>

            {/* SWIPER */}
            <Swiper
                modules={[Navigation, Mousewheel]}
                mousewheel={{
                    forceToAxis: true,
                }}
                grabCursor
                centeredSlides={false}
                onSwiper={(swiper) => {
                    const center = getCenterIndex(swiper);

                    setActiveIndex(center);

                    if (!isSingle) {
                        setTimeout(() => {
                            playCenterVideo(center);
                        }, 300);
                    }
                }}
                onSlideChange={(swiper) => {
                    const center = getCenterIndex(swiper);

                    setActiveIndex(center);

                    if (!isSingle) {
                        playCenterVideo(center);
                    }
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2.1,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 5,
                    },
                }}
                className="w-full"
            >

                {galleryVideos.slice(0, 6).map((video, index) => {
                    const id = video?._id || video?.id;

                    const videoUrl = getVideoUrl(video);

                    const isCenter = index === activeIndex;

                    return (
                        <SwiperSlide key={id || index}>

                            {/* CARD ANIMATION */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                    scale: 0.9,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                }}
                                className="relative overflow-hidden rounded cursor-pointer mb-10 group"
                                onClick={() => handleVideoPlay(id)}
                            >

                                <div
                                    className={`
                    relative w-full
                    h-[200px]
                    sm:h-[300px]
                    md:h-[340px]
                    lg:h-[360px]
                    xl:h-[380px]
                    transition-all duration-500
                    ${isCenter
                                            ? "scale-100 mt-1"
                                            : "scale-90"
                                        }
                  `}
                                >

                                    <video
                                        ref={(element) => {
                                            if (element) {
                                                videoRefs.current[id] = element;
                                            }
                                        }}
                                        className="w-full h-full object-cover rounded-xl"
                                        muted
                                        playsInline
                                        preload="metadata"
                                        onEnded={handleVideoEnd}
                                    >
                                        <source
                                            src={videoUrl}
                                            type="video/mp4"
                                        />
                                    </video>

                                    {/* NAME */}
                                    {video?.name && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.08 + 0.2,
                                            }}
                                            className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs rounded-full z-10"
                                        >
                                            {video.name}
                                        </motion.div>
                                    )}

                                    {/* GRADIENT */}
                                    <div
                                        className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/60
                      via-transparent
                      to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition duration-300
                      rounded-xl
                    "
                                    />

                                    {/* PLAY BUTTON */}
                                    <div
                                        className={`
                      absolute inset-0
                      flex items-center justify-center
                      transition
                      ${playingVideo === id
                                                ? "opacity-0"
                                                : "opacity-100"
                                            }
                      group-hover:opacity-100
                    `}
                                    >
                                        <motion.div
                                            whileHover={{
                                                scale: 1.12,
                                            }}
                                            whileTap={{
                                                scale: 0.95,
                                            }}
                                            className="
                        w-16 h-16
                        bg-white/85
                        rounded-full
                        flex items-center justify-center
                        shadow-lg
                      "
                                        >
                                            {playingVideo === id ? (
                                                <IoIosPause size={30} />
                                            ) : (
                                                <IoIosPlay
                                                    size={30}
                                                    className="ml-1"
                                                />
                                            )}
                                        </motion.div>
                                    </div>

                                </div>

                            </motion.div>

                        </SwiperSlide>
                    );
                })}

            </Swiper>
        </section>
    );
}