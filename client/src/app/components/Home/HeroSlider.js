"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function HeroSlider() {
  return (
    <div className="w-full mx-auto ">
      <div className="w-full relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white !opacity-70",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-orange-500 !opacity-100",
          }}
          loop={true}
          className="w-full h-full rounded-lg overflow-hidden"
        >
          {[
            { src: "/hero2.jpg", alt: "Banner 1" },
            { src: "/hero1.png", alt: "Banner 2" },
            { src: "/hero7.jpg", alt: "Banner 3" },
            {src: "/courseImg4.jpg", alt: "Banner4"},
            {src: "/courseImg5.jpg", alt: "Banner5"}
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[350px] sm:h-[350px] md:h-[550px] lg:h-[700px] ">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority
                  className=" sm:object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient overlay (optional) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
