"use client"
import MainLayout from '@/app/common/MainLayout'
import { Star } from 'lucide-react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function TestimonialSection() {
    const allTestimonials = [
        { id: 1, name: "Robert Wilson", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, text: "Excellent car rental service! The vehicle was clean and well-maintained. Great value for money.", subtext: "Business Traveler" },
        { id: 2, name: "Patricia Lee", avatar: "https://randomuser.me/api/portraits/women/45.jpg", rating: 5, text: "Smooth airport transfer experience. Driver was punctual and professional. Highly recommended!", subtext: "Frequent Flyer" },
        { id: 3, name: "Thomas Brown", avatar: "https://randomuser.me/api/portraits/men/44.jpg", rating: 5, text: "Booked an SUV for our family trip. Comfortable ride and excellent customer support throughout.", subtext: "Family Traveler" },
        { id: 4, name: "Jennifer Clark", avatar: "https://randomuser.me/api/portraits/women/22.jpg", rating: 5, text: "The booking process was seamless. Got a luxury car for our anniversary at a great price.", subtext: "Luxury Seeker" },
        { id: 5, name: "William Martinez", avatar: "https://randomuser.me/api/portraits/men/33.jpg", rating: 4, text: "Good selection of cars and transparent pricing. Will definitely use again for my next trip.", subtext: "Road Trip Enthusiast" },
        { id: 6, name: "Margaret Davis", avatar: "https://randomuser.me/api/portraits/women/55.jpg", rating: 5, text: "24/7 support helped me extend my rental at midnight. Amazing service!", subtext: "Late Planner" },
        { id: 7, name: "Joseph Rodriguez", avatar: "https://randomuser.me/api/portraits/men/66.jpg", rating: 5, text: "Best rates in town! Saved 40% compared to other rental companies.", subtext: "Deal Hunter" },
        { id: 8, name: "Nancy Thompson", avatar: "https://randomuser.me/api/portraits/women/32.jpg", rating: 5, text: "Clean cars, friendly staff, and hassle-free booking. This is my go-to transport service now.", subtext: "Solo Traveler" }
    ];

    const TestimonialCard = ({ testimonial }) => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all h-full">
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                    <div className="flex text-yellow-400 gap-0.5 mt-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="fill-current" />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3 italic">
                "{testimonial.text}"
            </p>
            <p className="text-gray-400 text-xs">
                {testimonial.subtext}
            </p>
        </div>
    );

    return (
        <MainLayout>
            <div className="py-16 md:py-20 overflow-hidden max-w-7xl mx-auto px-5">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                    What Our Travelers Say
                </h4>

                <div className="hidden md:block">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        className="testimonials-swiper"
                    >
                        {allTestimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <TestimonialCard testimonial={testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Mobile view - Single slide with pagination */}
                <div className="md:hidden">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        className="testimonials-swiper-mobile"
                    >
                        {allTestimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <TestimonialCard testimonial={testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .testimonials-swiper .swiper-pagination-bullet,
                    .testimonials-swiper-mobile .swiper-pagination-bullet {
                        background: #9CA3AF;
                        opacity: 1;
                    }
                    .testimonials-swiper .swiper-pagination-bullet-active,
                    .testimonials-swiper-mobile .swiper-pagination-bullet-active {
                        background: #4F46E5;
                    }
                    .testimonials-swiper .swiper-wrapper,
                    .testimonials-swiper-mobile .swiper-wrapper {
                        padding-bottom: 40px;
                    }
                `
            }} />
        </MainLayout>
    )
}

export default TestimonialSection