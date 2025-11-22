'use client'

import HeroSlider from "./components/Home/HeroSlider";
import Tutors from "./components/Home/Tutors";
import Services from "./components/Home/Services";
import Testimonial from "./components/Home/Testimonial";
import PopularClasses from "./components/Home/PopularClasses";
import Navbar from "./components/Navbar";
import { FaRocket, FaChartLine, FaAward, FaUsers, FaGraduationCap, FaStar, FaLightbulb, FaTrophy, FaInstagram, FaFacebook } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authAPI } from "./lib/auth";
import { studentAPI } from "./lib/student";

export default function Home() {
  const [users, setUsers] = useState();
  const fecthUsers = async() =>{
    const res = await studentAPI.getStudent();
    console.log(res)
    if(res){
      setUsers(res)
    }
  }
  useEffect(() =>{
    fecthUsers()

  },[])
  return (
    <>
      <Navbar/>
      <div className="">
        <HeroSlider />
        
        {/* Achievement Stats Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Transforming Education Since 2023</h2>
              <p className="text-xl opacity-90">Join thousands of successful students who trusted MJD Classes</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <FaUsers className="text-4xl mx-auto mb-4 text-yellow-300" />
                <h3 className="text-5xl font-bold mb-2">{users?users.length:''}</h3>
                <p className="text-lg">Students Enrolled</p>
              </div>
              <div className="p-6">
                <FaGraduationCap className="text-4xl mx-auto mb-4 text-green-300" />
                <h3 className="text-5xl font-bold mb-2">95%</h3>
                <p className="text-lg">Success Rate</p>
              </div>
              <div className="p-6">
                <FaAward className="text-4xl mx-auto mb-4 text-red-300" />
                <h3 className="text-5xl font-bold mb-2">50+</h3>
                <p className="text-lg">Top Rankers</p>
              </div>
              <div className="p-6">
                <FaChartLine className="text-4xl mx-auto mb-4 text-blue-300" />
                <h3 className="text-5xl font-bold mb-2">100%</h3>
                <p className="text-lg">Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        <Services/>
        <PopularClasses/>

        {/* Why Choose MJD Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-purple-900 mb-4">Why MJD Stands Out?</h2>
              <p className="text-xl text-gray-600">Experience the difference with our unique teaching methodology</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                  <FaLightbulb className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Smart Learning</h3>
                <p className="text-gray-600">AI-powered doubt solving and personalized learning paths tailored to each student's needs.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                  <IoIosSpeedometer className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Rapid Progress</h3>
                <p className="text-gray-600">Our students show 3x faster improvement with our focused revision techniques.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <FaTrophy className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Proven Results</h3>
                <p className="text-gray-600">Consistent track record of producing top rankers in JEE, NEET & Board exams.</p>
              </div>
            </div>
          </div>
        </section>

        <Tutors />
        
        {/* Success Stories Carousel 
        <section className="py-16 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Success Stories</h2>
              <p className="text-xl opacity-90">Real students, real achievements</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <FaStar className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Aarav Sharma</h4>
                    <p className="text-yellow-300">JEE Advanced: AIR 124</p>
                  </div>
                </div>
                <p className="text-white/80">"MJD's doubt sessions and test series helped me crack JEE with confidence!"</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mr-4">
                    <FaStar className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Priya Patel</h4>
                    <p className="text-green-300">NEET: 680/720</p>
                  </div>
                </div>
                <p className="text-white/80">"The biology faculty at MJD made complex topics so easy to understand!"</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center mr-4">
                    <FaStar className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Rohan Mehta</h4>
                    <p className="text-red-300">CBSE 12th: 96.4%</p>
                  </div>
                </div>
                <p className="text-white/80">"Small batch sizes ensured I got personal attention in every class."</p>
              </div>
            </div>
          </div>
        </section>
        */}

        <Testimonial/>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Academic Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join India's most trusted coaching platform and unlock your true potential
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#popularclasses">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105">
               Free Demo Class 
              </button>
              </a>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
               <Link href = "/Contact">  Speak with Counselor </Link>
              </button>
            </div>
            <div className="mt-8 flex justify-center space-x-6">
              <a href="https://www.instagram.com/mjd_classes?igsh=enFubWR3eHNtM3Ns" className="hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="font-bold "><FaInstagram className="text-4xl"/></span>
                </div>
              </a>
              <a href="https://www.facebook.com/share/16PkLxHDHG/" className="hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="font-bold"><FaFacebook className="text-4xl"/></span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-purple-900 mb-4">Everything You Need to Succeed</h2>
              <p className="text-xl text-gray-600">Comprehensive learning ecosystem for modern students</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Fast Track Courses</h3>
                <p className="text-gray-600">Accelerated learning programs for quick results</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Live Doubt Sessions</h3>
                <p className="text-gray-600">24/7 doubt resolution with expert faculty</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChartLine className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Performance Analytics</h3>
                <p className="text-gray-600">Detailed progress tracking and insights</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaAward className="text-3xl text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Scholarship Programs</h3>
                <p className="text-gray-600">Merit-based scholarships for deserving students</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}