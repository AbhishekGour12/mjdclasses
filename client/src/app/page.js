'use client'

import HeroSlider from "./components/Home/HeroSlider";
import Tutors from "./components/Home/Tutors";
import Services from "./components/Home/Services";
import Testimonial from "./components/Home/Testimonial";
import PopularClasses from "./components/Home/PopularClasses";
import Navbar from "./components/Navbar";
import { FaRocket, FaChartLine, FaAward, FaUsers, FaGraduationCap, FaStar, FaLightbulb, FaTrophy, FaInstagram, FaFacebook, FaPlay, FaArrowRight } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authAPI } from "./lib/auth";
import { studentAPI } from "./lib/student";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const fecthUsers = async() =>{
    const res = await studentAPI.getStudent();
    console.log(res)
    if(res){
      setUsers(res)
      setIsLoading(false);
    }
  }
  
  useEffect(() =>{
    fecthUsers()
  },[])

  return (
    <>
      <Navbar/>
      <div className="overflow-hidden">
        <HeroSlider />
        
      {/* Achievement Stats Section */}
<section className="py-16 sm:py-20 bg-gradient-to-br from-purple-950 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
  {/* Soft Glow Shapes */}
  <div className="absolute inset-0 bg-black/20"></div>
  <div className="absolute top-10 left-10 w-40 sm:w-72 h-40 sm:h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-10 right-10 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

  <div className="relative z-10 container mx-auto px-4 max-w-6xl">
    
    {/* Section Title */}
    <AnimatedSection className="text-center mb-12 sm:mb-16">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Transforming Education Since 2023
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Thousands of students chose MJD Classes to unlock their future 🎓✨
      </motion.p>
    </AnimatedSection>

    {/* Stats Grid */}
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10 text-center"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {[
        { icon: FaUsers, value: users ? users.length : '', label: "Students Enrolled", color: "text-yellow-300" },
        { icon: FaGraduationCap, value: "95%", label: "Success Rate", color: "text-green-300" },
        { icon: FaAward, value: "50+", label: "Top Rankers", color: "text-red-300" },
        { icon: FaChartLine, value: "100%", label: "Satisfaction", color: "text-blue-300" }
      ].map((stat, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          className="group p-4 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/20
          hover:bg-white/20 transition-all duration-500 hover:scale-105"
        >
          <stat.icon className={`text-3xl sm:text-4xl md:text-5xl mx-auto mb-3 sm:mb-4 md:mb-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
          
          <motion.h3
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          >
            {stat.value}
          </motion.h3>

          <p className="text-xs sm:text-sm md:text-lg font-medium opacity-95">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

        <Services/>
        <PopularClasses/>

        {/* Why Choose MJD Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-5xl font-bold text-purple-900 mb-6">Why MJD Stands Out?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the difference with our unique teaching methodology
              </p>
            </AnimatedSection>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  icon: FaLightbulb,
                  title: "Smart Learning",
                  description: "AI-powered doubt solving and personalized learning paths tailored to each student's needs.",
                  gradient: "from-purple-500 to-pink-500",
                  delay: 0
                },
                {
                  icon: IoIosSpeedometer,
                  title: "Rapid Progress",
                  description: "Our students show 3x faster improvement with our focused revision techniques.",
                  gradient: "from-blue-500 to-cyan-500",
                  delay: 0.1
                },
                {
                  icon: FaTrophy,
                  title: "Proven Results",
                  description: "Consistent track record of producing top rankers in JEE, NEET & Board exams.",
                  gradient: "from-green-500 to-emerald-500",
                  delay: 0.2
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 group-hover:border-purple-300 h-full flex flex-col">
                    <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="text-3xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 flex-grow">{feature.description}</p>
                    <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Learn more <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Tutors />
        
        <Testimonial/>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedSection>
              <motion.h2 
                className="text-5xl md:text-6xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Ready to Transform Your <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Academic Journey</span>?
              </motion.h2>
              <motion.p 
                className="text-xl mb-12 max-w-2xl mx-auto text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Join India's most trusted coaching platform and unlock your true potential
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <a href="#popularclasses">
                  <button className="group bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:scale-105 flex items-center gap-3">
                    <FaPlay className="text-sm" />
                    Free Demo Class
                  </button>
                </a>
                <Link href="/Contact">
                  <button className="group border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center gap-3">
                    Speak with Counselor
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex justify-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <a href="https://www.instagram.com/mjd_classes?igsh=enFubWR3eHNtM3Ns" className="group">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <FaInstagram className="text-2xl text-white" />
                  </div>
                </a>
                <a href="https://www.facebook.com/share/16PkLxHDHG/" className="group">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 shadow-lg">
                    <FaFacebook className="text-2xl text-white" />
                  </div>
                </a>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-5xl font-bold text-purple-900 mb-6">Everything You Need to Succeed</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive learning ecosystem for modern students
              </p>
            </AnimatedSection>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { icon: FaRocket, title: "Fast Track Courses", description: "Accelerated learning programs for quick results", color: "purple" },
                { icon: FaUsers, title: "Live Doubt Sessions", description: "24/7 doubt resolution with expert faculty", color: "blue" },
                { icon: FaChartLine, title: "Performance Analytics", description: "Detailed progress tracking and insights", color: "green" },
                { icon: FaAward, title: "Scholarship Programs", description: "Merit-based scholarships for deserving students", color: "orange" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group text-center p-8 bg-gradient-to-b from-white to-purple-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:border-purple-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="mt-6 h-1 w-0 group-hover:w-12 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 mx-auto"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}