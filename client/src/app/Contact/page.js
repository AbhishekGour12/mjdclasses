"use client";
import React, { useState } from "react";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaLinkedin,
  FaPaperPlane,
  FaUser,
  FaHeading,
  FaCheckCircle
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { authAPI } from "../lib/auth";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const res = await authAPI.contact(formData);
    if(res.success){
      toast.success(res.message)
    }
   // setIsSubmitted(true);
   {/** setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
    */}
  }catch(err){
    toast.error(err.message)
  }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Our Campus",
      details: ["Baba Complex, near Indian Oil petrol pump, Tejaji Nagar, Khandwa Road, Indore M.P. 452020"],
      color: "text-blue-500"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: ["+91 6265866608", "+91 9981209825"],
      color: "text-green-500"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["mjdclasses@gmail.com"],
      color: "text-red-500"
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat: 9:00 AM - 6:00 PM", "Sun: 10:00 AM - 2:00 PM"],
      color: "text-purple-500"
    }
  ];

  const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/mjd_classes?igsh=enFubWR3eHNtM3Ns", color: "hover:text-pink-600", label: "Instagram" },
    { icon: FaFacebookF, href: "https://www.facebook.com/share/16PkLxHDHG/", color: "hover:text-blue-600", label: "Facebook" },
    { icon: FaTwitter, href: "#", color: "hover:text-blue-400", label: "Twitter" },
    { icon: FaYoutube, href: "#", color: "hover:text-red-600", label: "YouTube" },
    { icon: FaWhatsapp, href: "https://wa.me/919981209825", color: "hover:text-green-500", label: "WhatsApp" },
    { icon: FaLinkedin, href: "#", color: "hover:text-blue-700", label: "LinkedIn" }
  ];

  const faqItems = [
    {
      question: "What are your coaching center timings?",
      answer: "We are open from 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 6:00 PM on Saturdays."
    },
    {
      question: "Do you offer demo classes?",
      answer: "Yes, we provide free demo classes for all subjects. Contact us to schedule one."
    },
    {
      question: "What courses do you offer?",
      answer: "We offer courses for Mathematics, Physics, Chemistry, Biology, and Computer Science for grades 6-12."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help you achieve your academic goals. Reach out to us for any queries about our courses, admissions, or scheduling.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto">
          {/* Contact Form & Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-100"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">We typically respond within 24 hours</p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="relative">
                      <FaHeading className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message..."
                      rows="6"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <FaPaperPlane className="text-lg" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-${item.color.split('-')[1]}-50`}>
                        <item.icon className={`text-2xl ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm mb-1">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-semibold text-gray-800 mb-4 text-center">Connect With Us</h3>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 gap-4"
              >
                <motion.a
                  href="tel:+919981209825"
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/919981209825"
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-100 mb-20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Us Here</h2>
              <p className="text-gray-600">Visit our campus for a personal consultation</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.5656407739815!2d75.91156167455883!3d22.65079483152693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd14aaaaaaab%3A0xe91a8b5a690dd1e4!2sTejaji%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452020!5e0!3m2!1sen!2sin!4v1730713572460!5m2!1sen!2sin"
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
                style={{ filter: "grayscale(0.2) contrast(1.1)" }}
              ></iframe>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-100"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Quick answers to common questions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100"
                >
                  <h3 className="font-semibold text-gray-800 mb-3 text-lg">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
              
              {/* Additional FAQ Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100"
              >
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">What is the fee structure?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Our fees vary by course and duration. Contact us for detailed fee structure and payment plans.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100"
              >
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Do you provide study materials?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Yes, we provide comprehensive study materials, practice papers, and digital resources to all our students.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100"
              >
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Are there any scholarships available?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">We offer merit-based scholarships and discounts for siblings. Contact us for eligibility criteria.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="text-xl mb-8 text-purple-100">Join hundreds of successful students who trust our coaching</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+919599272754"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300"
                >
                  Call for Admission
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  Download Brochure
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}