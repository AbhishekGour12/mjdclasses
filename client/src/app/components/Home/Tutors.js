"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaStar, FaGraduationCap } from "react-icons/fa";

export default function Tutors() {
  const tutors = [
    { 
      name: "Dr Mahendra Chouhan", 
      title: "Director", 
      description: "PhD in Chemistry with 15 years of teaching experience. Specialized in organic chemistry and research methodology.",
      image: "/tutor1.jpg",
      experience: "15 Years",
      rating: 4.9,
      students: 5000
    },
    { 
      name: "Dheeraj Gour", 
      title: "Chemistry Teacher", 
      description: "6 years of expertise in making complex chemistry concepts simple and engaging for students.",
      image: "/tutor2.jpg",
      experience: "6 Years",
      rating: 4.8,
      students: 2500
    },
    { 
      name: "Mrs Swati", 
      title: "English Teacher", 
      description: "M.Pharma with 2 years of teaching experience. Focuses on communication skills and language fluency.",
      image: "/tutor4.jpg",
      experience: "2 Years",
      rating: 4.7,
      students: 1500
    },
    { 
      name: "Adarsh Sir", 
      title: "Physics Teacher", 
      description: "8 years of experience in physics, making complex theories understandable through real-world examples.",
      image: "/tutor5.jpg",
      experience: "8 Years",
      rating: 4.9,
      students: 4000
    },
    { 
      name: "Sonu Prajapati", 
      title: "Biology Teacher", 
      description: "2 years of expertise in biology with focus on modern teaching techniques and student engagement.",
      image: "/tutor9.jpg",
      experience: "2 Years",
      rating: 4.6,
      students: 1200
    },
    { 
      name: "Prathvipal Waskel", 
      title: "Mathematics Teacher", 
      description: "M.Tech with 2 years of experience in mathematics, specializing in calculus and advanced mathematics.",
      image: "/tutor6.jpg",
      experience: "2 Years",
      rating: 4.7,
      students: 1800
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;
  const cardWidth = 400; // card width + gap
  const maxIndex = Math.max(0, tutors.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex(current => Math.min(current + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(current => Math.max(current - 1, 0));
  };

  const translateX = -currentIndex * cardWidth;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50 text-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-purple-600 font-semibold tracking-wide uppercase mb-2 text-sm bg-purple-100 px-4 py-2 rounded-full">
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-4">
            Meet Our <span className="text-purple-600">Expert Faculty</span>
          </h1>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Learn from highly qualified instructors who bring years of real-world experience 
            and a passion for teaching to deliver quality education.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-[1320px] mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 shadow-2xl rounded-2xl hover:bg-purple-50 transition-all duration-300 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:shadow-3xl"
            }`}
          >
            <FaChevronLeft className="text-purple-600 text-xl" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-4 shadow-2xl rounded-2xl hover:bg-purple-50 transition-all duration-300 ${
              currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:shadow-3xl"
            }`}
          >
            <FaChevronRight className="text-purple-600 text-xl" />
          </button>

          {/* Slider with Gradient Overlays */}
          <div className="relative">
            {/* Left Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-purple-50 to-transparent z-10 pointer-events-none" />
            
            {/* Right Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none" />

            {/* Cards Slider */}
            <div className="overflow-hidden px-4">
              <motion.div
                animate={{ x: translateX }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="flex gap-8 py-4"
              >
                {tutors.map((tutor, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.05,
                      y: -12
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 w-[300px] bg-white rounded-3xl shadow-xl hover:shadow-3xl p-8 border border-purple-100 transition-all duration-500 group cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative">
                        <Image
                          src={tutor.image}
                          alt={tutor.name}
                          width={120}
                          height={120}
                          className="rounded-full mx-auto object-cover border-4 border-purple-200 group-hover:border-purple-400 transition-colors duration-500 z-10 shadow-lg"
                        />
                        {/* Experience Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {tutor.experience}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {tutor.name}
                    </h3>
                    <p className="text-purple-600 font-semibold mb-4">
                      {tutor.title}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {tutor.description}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-amber-500">
                        <FaStar />
                        <span className="font-semibold text-gray-700">{tutor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-purple-600">
                        <FaGraduationCap />
                        <span className="font-semibold text-gray-700">{tutor.students}+</span>
                      </div>
                    </div>

                    {/* Hover Effect Line */}
                    <div className="w-0 group-hover:w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6 transition-all duration-500 rounded-full" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-purple-600 w-8" 
                    : "bg-purple-300 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">Want to learn from our expert faculty?</p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-xl">
            Book a Free Demo Class
          </button>
        </motion.div>
      </div>
    </section>
  );
}