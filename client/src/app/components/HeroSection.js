"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function HeroSlider() {
    return (
        <div className=" m-auto">
            <div className="w-full h-[700px] relative">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-full"
                >
                    {/* Slide 1 */}
                    {/* <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero1.jpg"
                                alt="Banner 1"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide> */}

                    {/* Slide 2 */}
                    {/* <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero2.jpg"
                                alt="Banner 1"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide> */}

                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero3.jpg"
                                alt="Banner 1"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>

                    {/* Slide 1 */}
                    {/* <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero4.jpg"
                                alt="Banner 1"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide> */}

                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero5.jpg"
                                alt="Banner 1"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>

                    {/* Slide 1 */}
                    {/* <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero6.jpg"
                                alt="Banner 1"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide> */}

                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/hero7.jpg"
                                alt="Banner 1"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>




        </div>

    );
}
