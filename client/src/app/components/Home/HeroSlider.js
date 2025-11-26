"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Image from "next/image";

export default function HeroSlider() {
  const slides = [
  { 
    src: "/hero2.jpg", 
    alt: "Banner 1", 
    title: "Learn Today, Lead Tomorrow", 
    desc: "Your success story starts with the right guidance 🚀"
  },
  { 
    src: "/hero1.png", 
    alt: "Banner 2", 
    title: "Where Learning Meets Excellence", 
    desc: "Smart Classes • Expert Teachers • Better Grades 🔥"
  },
  { 
    src: "/hero7.jpg", 
    alt: "Banner 3", 
    title: "Unlock Your Full Potential", 
    desc: "Grow Strong Academically & Stand Out 💡"
  },
  { 
    src: "/courseImg4.jpg", 
    alt: "Banner 4", 
    title: "Stronger Concepts, Higher Scores", 
    desc: "Small Steps Today • Big Results in Boards 💯"
  },
  { 
    src: "/courseImg5.jpg", 
    alt: "Banner 5", 
    title: "Dream Big, Work Smart", 
    desc: "Join the Coaching That Changes Futures 🌟"
  }
];


  return (
    <div className="w-full mx-auto relative rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
      
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                className="object-cover transition-transform duration-[2500ms] scale-110 hover:scale-100"
              />

              {/* Overlay Dark Gradient */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg tracking-wide">
                  {slide.title}
                </h2>
                <p className="text-white text-lg md:text-2xl mt-2 drop-shadow-md">
                  {slide.desc}
                </p>

                <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-all">
                  Explore Courses 🚀
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
