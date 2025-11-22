"use client";
import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Award,
  Globe,
  BookOpen,
  Target,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

// Animated component wrapper
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Page() {
  const stats = [
    { number: "2000+", label: "Students Trained" },
    { number: "10+", label: "Years of Excellence" },
    { number: "95%", label: "Success Rate" },
    { number: "100+", label: "Expert Mentors" },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description:
        "To provide quality education and personalized guidance to every student, helping them achieve academic excellence and build a strong foundation for their future.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Our Vision",
      description:
        "To become Indore’s most trusted coaching institute by shaping students into confident learners and future leaders through innovative and effective teaching methods.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Our Values",
      description:
        "We believe in discipline, dedication, and determination. Every student deserves the right environment to grow and unlock their full potential.",
    },
  ];

  return (
    <div className="w-full bg-white overflow-hidden">
      <Navbar />
      {/* Upper Section */}
      <div className="flex justify-center items-center py-16 px-4 bg-gradient-to-br from-purple-50 to-white ">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Left Text Section */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-purple-800 pt-6"
            >
              About Us
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-semibold text-gray-900 leading-snug"
            >
              <span className="text-orange-500">MJD Coaching Institute</span> —
              Empowering Students to Achieve Academic Excellence.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              MJD Coaching Institute is a trusted name in education, dedicated
              to providing quality coaching for students from school to
              competitive levels. Our goal is to nurture every learner’s
              potential through expert guidance, innovative teaching techniques,
              and personalized attention.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              Since our establishment, we have helped thousands of students
              achieve remarkable results in their exams. Our experienced faculty
              focuses on concept clarity, discipline, and regular performance
              tracking to ensure consistent growth and confidence in every
              student.
            </motion.p>

            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition shadow-lg hover:shadow-xl"
            >
              <Link href="/Contact">
              Join Us
              </Link>
               <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/about.jpg"
                alt="Students learning together"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl w-full max-w-[500px]  object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <AnimatedSection className="py-16 bg-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <motion.div
                  className="text-3xl md:text-5xl font-bold text-orange-400 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-purple-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Lower Section */}
      <div className="flex justify-center items-center py-20 px-6 md:px-12 bg-white">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-16">
          {/* Left Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial="initial"
            animate="animate"
            variants={fadeInLeft}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/about1.jpg"
                alt="Classroom Session"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            className="w-full md:w-1/2 max-w-lg space-y-6"
            initial="initial"
            animate="animate"
            variants={fadeInRight}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              variants={fadeInUp}
              className="font-semibold text-lg md:text-xl text-purple-700"
            >
              Features
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-normal text-gray-800"
            >
              We are always working to provide you the best learning experience.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-normal text-gray-600 text-base md:text-lg"
            >
              At MJD Coaching Institute, we are committed to helping students
              achieve success through structured teaching, regular doubt
              sessions, and performance evaluations. Our modern classrooms and
              interactive methods make learning fun and effective.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-600 text-base">
              We focus on conceptual clarity, consistent practice, and
              confidence building. Whether you're preparing for school exams or
              competitive tests, our faculty ensures that every student stays
              motivated and supported.
            </motion.p>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-purple-700 hover:bg-purple-800 transition-colors text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl"
            >
              Learn More <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h3 className="text-purple-700 font-bold text-3xl md:text-4xl mb-4">
              Our Mission & Vision
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              MJD Coaching Institute believes in empowering students through
              knowledge, discipline, and guidance to achieve their dreams.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl border border-purple-100"
              >
                <div className="text-purple-600 mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="flex justify-center items-center w-full bg-white py-20 px-4">
        <div className="w-full max-w-6xl text-center">
          <motion.h3
            variants={fadeInUp}
            className="text-purple-700 font-bold text-4xl mb-3"
          >
            Our Benefits
          </motion.h3>
          <motion.h1
            variants={fadeInUp}
            className="font-bold text-3xl md:text-4xl mb-4"
          >
            By Joining MJD Coaching Institute,
            <br /> You Unlock Countless Learning Opportunities.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
          >
            We provide complete academic support — from concept learning to
            performance analysis — ensuring that each student becomes confident,
            capable, and exam-ready.
          </motion.p>

          {/* ✅ Keeping the same structure for benefit cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center sm:justify-items-stretch"
            variants={staggerContainer}
          >
            {[
              {
                number: "01",
                title: "Experienced Faculty",
                description:
                  "Our highly qualified teachers bring years of experience and proven teaching methods to help students excel in their academics.",
              },
              {
                number: "02",
                title: "Regular Tests",
                description:
                  "Weekly and monthly tests help monitor progress and identify improvement areas to strengthen performance.",
              },
              {
                number: "03",
                title: "Personal Mentorship",
                description:
                  "Each student gets personalized attention and guidance to overcome challenges and boost confidence.",
              },
              {
                number: "04",
                title: "Study Material",
                description:
                  "We provide updated, easy-to-understand study material designed by subject experts for complete exam preparation.",
              },
              {
                number: "05",
                title: "Doubt Solving Sessions",
                description:
                  "Dedicated sessions to clarify doubts and ensure that no student lags behind in understanding key concepts.",
              },
              {
                number: "06",
                title: "Modern Classrooms",
                description:
                  "Smart classrooms, digital resources, and comfortable learning environments enhance focus and understanding.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="max-w-sm bg-purple-50 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all border border-purple-100"
              >
                <h1 className="text-purple-500 font-bold text-2xl mb-3">
                  {benefit.number}
                </h1>
                <h2 className="font-semibold text-xl mb-3 text-gray-800">
                  {benefit.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Begin Your Learning Journey?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of students who have built their future with MJD
            Coaching Institute. Let’s achieve your academic goals together.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition"
            >
              Enroll Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 rounded-full font-bold text-lg transition"
            >
              Schedule a Consultation
            </motion.button>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
