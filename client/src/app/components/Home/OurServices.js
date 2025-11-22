import React from 'react'
import { FaPaintBrush, FaLaptopCode, FaChartLine } from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: "Interactive Classes",
    description:
      "Engaging lessons designed to make learning fun and effective for every student.",
    icon: <FaPaintBrush className="text-purple-500 text-2xl" />,
  },
  {
    id: 2,
    title: "Expert Teachers",
    description:
      "Highly qualified instructors dedicated to personalized attention and growth.",
    icon: <FaLaptopCode className='text-2xl text-purple-500'/>,
  },
  {
    id: 3,
    title: "Modern Learning Tools",
    description:
      "Smart boards, visual aids, and digital resources for better understanding.",
    icon: <FaChartLine className="text-purple-500 text-2xl" />,
  },
];

const OurServices = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      {/* Header */}
      <p className="text-emerald-500 font-medium">Our Services</p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-4xl text-center mx-auto mt-2">
        Fostering a playful & engaging learning environment
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-8 text-left shadow-md transition-all duration-500 hover:bg-purple-400 hover:text-white hover:translate-y-2 hover:shadow-xl"
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-purple-100 transition-all duration-500  group-hover:bg-white"
            >
              {service.icon}
            </div>

            {/* Content */}
            <h3
              className="text-xl font-semibold "
            >
              {service.title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
            >
              {service.description}
            </p>

            {/* Learn More */}
            <button
              className={`flex items-center gap-2 mt-6 text-sm font-medium ${
                service.active ? "text-white" : "text-purple-900"
              }`}
            >
              Learn More →
            </button>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-10 gap-2">
        <span className="w-3 h-1 rounded-full bg-emerald-400"></span>
        <span className="w-3 h-1 rounded-full bg-gray-300"></span>
        <span className="w-3 h-1 rounded-full bg-gray-300"></span>
      </div>
    </section>
  );
};

export default OurServices;