"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Product1 from "@/app/assets/footerLogo/Product1.png";
import Product2 from "@/app/assets/footerLogo/Product2.png";
import Product3 from "@/app/assets/footerLogo/Product3.png";
import Product4 from "@/app/assets/footerLogo/Product4.png";
import Product5 from "@/app/assets/footerLogo/Product5.png";
import Product6 from "@/app/assets/footerLogo/Product6.png";

const AssociationCarousel = () => {
    const associations = [
        { id: 1, img: Product1, name: "ASTA" },
        { id: 2, img: Product2, name: "IATO" },
        { id: 3, img: Product3, name: "Ministry of Tourism" },
        { id: 4, img: Product4, name: "Travel Association" },
        { id: 5, img: Product5, name: "Tour Operator" },
        { id: 6, img: Product6, name: "Incredible India" },
    ];

    return (
        <div className="px-5 max-w-7xl mx-auto my-26">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl shadow-red-500/10 hover:shadow-red-500/20 transition-shadow duration-500 border border-white/5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
                    <div className="lg:w-[30%] flex-shrink-0">
                        <h4 className="text-xl md:text-2xl font-semibold mb-2">
                            Members & Approved By
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Indian Holiday is recognised by the Ministry of Tourism,
                            Government of India, and associated with respected travel
                            trade bodies.
                        </p>
                    </div>

                    <div className="lg:w-[70%] w-full relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 blur-2xl rounded-3xl"></div>
                        <div className="relative px-10">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}  
                                breakpoints={{
                                    480: {
                                        slidesPerView: 2,
                                        spaceBetween: 15,
                                    },
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 24,
                                    },
                                    1280: {
                                        slidesPerView: 4,
                                        spaceBetween: 24,
                                    },
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                loop={true}
                                className="associations-swiper"
                            >
                                {associations.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 hover:from-white/20 hover:to-white/10 transition-all duration-300 group border border-white/5 hover:border-white/20 shadow-lg hover:shadow-2xl shadow-red-500/5 hover:shadow-red-500/20 h-full flex flex-col items-center justify-center">
                                            <div className="w-full h-24 md:h-28 lg:h-32 relative overflow-hidden rounded-xl">
                                                <Image
                                                    src={item.img}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                                    sizes="(max-width: 480px) 40vw, (max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 text-center mt-3 transition-colors font-medium">
                                                {item.name}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .associations-swiper .swiper-pagination-bullet {
                    background: #fff;
                    opacity: 0.5;
                }
                .associations-swiper .swiper-pagination-bullet-active {
                    background: #da251c;
                    opacity: 1;
                }
                .associations-swiper .swiper-wrapper {
                    align-items: stretch;
                }
                .associations-swiper .swiper-slide {
                    height: auto;
                }
            `}</style>
        </div>
    );
};

export default AssociationCarousel;