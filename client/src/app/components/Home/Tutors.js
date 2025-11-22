"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Tutors() {
  const tutors = [
    { name: "Dr Mahendra Chouhan", title: "Director", description: "PHD, 15 years Experience, Chemistry", image: "/tutor1.jpg" },
    { name: "Dheeraj Gour", title: "Chemistry Teacher", description: "6 years of Experience in Chemistry", image: "/tutor2.jpg" },
    { name: "Mrs Swati", title: "English Teacher, M.Pharama", description: "2 years of Experience in Teaching", image: "/tutor4.jpg" },
    { name: "Jaydeep Shingh Baghel", title: "Biology Teacher", description: "6 years of Experience in Biology", image: "/tutor3.jpg" },
    { name: "Adarsh Sir", title: "Physics Teacher", description: "8 years of Experience in Physics", image: "/tutor5.jpg" },
    { name: "Sonu Prjapati", title: "Biology Teacher", description: "2 years of Experience in Biology", image: "/tutor9.jpg" },
    { name: "Prathvipal Waskel", title: "M.Tech", description: "2 years of Experience in Mathematics.", image: "/tutor6.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;
  const cardWidth = 280; // card width + gap
  const maxIndex = tutors.length - cardsToShow;

  const nextSlide = () => {
    setCurrentIndex(current => Math.min(current + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(current => Math.max(current - 1, 0));
  };

  // Calculate translateX value for smooth sliding
  const translateX = -currentIndex * cardWidth;

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-purple-700 font-semibold tracking-wide uppercase mb-2 text-sm">
            Tutors
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet the Heroes
          </h1>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Our instructors bring years of real-world experience to deliver quality education.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-[1160px] mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 shadow-lg rounded-full hover:bg-purple-100 transition-all duration-300 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
          >
            <FaChevronLeft className="text-purple-600 text-lg" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 shadow-lg rounded-full hover:bg-purple-100 transition-all duration-300 ${
              currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
          >
            <FaChevronRight className="text-purple-600 text-lg" />
          </button>

          {/* Slider with Gradient Overlays */}
          <div className="relative">
            {/* Left Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-purple-50 to-transparent z-10 pointer-events-none" />
            
            {/* Right Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none" />

            {/* Cards Slider */}
            <div className="overflow-hidden px-2">
              <motion.div
                animate={{ x: translateX }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="flex gap-6 py-4"
              >
                {tutors.map((tutor, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.05,
                      y: -8
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 w-[250px] bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-purple-100 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                      <Image
                        src={tutor.image}
                        alt={tutor.name}
                        width={100}
                        height={100}
                        className="relative rounded-full mx-auto object-cover border-4 border-purple-200 group-hover:border-purple-400 transition-colors duration-300 z-10"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {tutor.name}
                    </h3>
                    <p className="text-sm text-purple-600 font-semibold mb-3">
                      {tutor.title}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tutor.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className="w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 transition-all duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-purple-600 w-6" 
                    : "bg-purple-300 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}