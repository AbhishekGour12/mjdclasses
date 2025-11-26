import React from "react";
import { FaPaintBrush, FaLaptopCode, FaChartLine, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-80 transition-all duration-500"></div>

      <div className="relative bg-white rounded-3xl px-6 py-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 group-hover:border-purple-400 flex flex-col items-start md:min-h-[360px]">
        
        {/* Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-500">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Discover CTA */}
        <div className="mt-6 pt-3 border-t border-gray-200 w-full">
          <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-all duration-300 text-sm sm:text-base">
            Discover More <FaRocket className="ml-2 group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Interactive Classes",
      description:
        "Live sessions, quizzes & doubt-solving that make learning exciting, result-driven & highly engaging 📚✨",
      icon: <FaPaintBrush className="text-white text-2xl sm:text-3xl" />,
    },
    {
      id: 2,
      title: "Expert Teachers",
      description:
        "Personal guidance from experienced educators focused on boosting confidence & academic excellence 👨‍🏫💡",
      icon: <FaLaptopCode className="text-white text-2xl sm:text-3xl" />,
    },
    {
      id: 3,
      title: "Smart Study Techniques",
      description:
        "AI-based analytics, performance tracking & visual learning tools for faster improvement & better results 🚀🔍",
      icon: <FaChartLine className="text-white text-2xl sm:text-3xl" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-purple-100 relative overflow-hidden">
      
      {/* Soft Decorative Glows */}
      <div className="absolute top-10 left-0 w-56 h-56 bg-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-purple-600 text-sm sm:text-base font-semibold bg-purple-200 px-4 py-2 rounded-full">
            Our Services
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-5 leading-tight">
            We Make Learning <span className="text-purple-600">Smarter & Fun</span> 🚀
          </h1>

          <p className="text-gray-700 text-sm sm:text-lg max-w-3xl mx-auto mt-4">
            Experience a new era of teaching designed to build strong concepts, powerful results & confident students.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {services.map((service, index) => (
            <AnimatedServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
        >
          {[
            { number: "2K+", label: "Happy Students" },
            { number: "25+", label: "Experienced Teachers" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Support System" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-2xl sm:text-4xl font-bold text-purple-700">{stat.number}</div>
              <div className="text-gray-700 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
