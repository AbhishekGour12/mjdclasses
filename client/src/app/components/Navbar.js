"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/features/authSlice';
import '../CSS/common.css';

// React Icons
import { 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus, 
  FaBars, 
  FaTimes,
  FaBook,
  FaInfoCircle,
  FaEnvelope,
  FaHome,
  FaCog,
  FaHouseUser
} from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import { authAPI } from '../lib/auth';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key for menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const logout = async() => {
    const data = {
      email: user.user.email,
      date: new Date().toISOString()
    }
   const res = await authAPI.attendanceLogout(data);
    localStorage.removeItem('token');
    dispatch(loginSuccess(""));
    closeMenu();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleCourseClick = (e) => {
    if (!user.user) {
      e.preventDefault();
      alert('Please login first to access courses!');
    }
  };

  return (
    <>
      <nav 
        className={`navbar fixed top-0 left-0 right-0 z-50 flex items-center justify-between font-sans transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-2xl shadow-purple-500/10 py-2' 
            : 'bg-white shadow-lg shadow-purple-500/5 py-4'
        }`}
      >
        {/* Logo Section */}
       <div className="flex flex-col items-start leading-tight">
  <Image
    src="/logo.png"
    alt="MJD Education Logo"
    width={260}
    height={50}
    className="w-[160px] sm:w-[260px] h-[50px] object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
    priority
  />


</div>


        {/* Desktop Navigation - Centered with proper spacing */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
          <div className="flex items-center justify-between space-x-16 text-purple-700 font-medium">
            <Link 
              href="/" 
              className="nav-link group flex items-center space-x-3 transition-all duration-200 hover:text-purple-900 hover:font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 min-w-[120px] justify-center"
            >
              <FaHouseUser className="text-lg group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap">Home</span>
            </Link>
            
            <Link 
              href="/Contact" 
              className="nav-link group flex items-center space-x-3 transition-all duration-200 hover:text-purple-900 hover:font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 min-w-[120px] justify-center"
            >
              <FaEnvelope className="text-lg group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap">Contact Us</span>
            </Link>
            
            <Link 
              href="/About" 
              className="nav-link group flex items-center space-x-3 transition-all duration-200 hover:text-purple-900 hover:font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 min-w-[120px] justify-center"
            >
              <FaInfoCircle className="text-lg group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap">About</span>
            </Link>
            
            <Link 
              href="/Course" 
              onClick={handleCourseClick}
              className={`nav-link group flex items-center space-x-3 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-purple-50 min-w-[120px] justify-center ${
                user.user 
                  ? 'hover:text-purple-900 hover:font-semibold' 
                  : 'cursor-not-allowed opacity-70'
              }`}
            >
              <FaBook className="text-lg group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap">Course</span>
            </Link>
          </div>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center space-x-4 mr-8 flex-shrink-0">
          {user.user ? (
            <div className="flex items-center space-x-6">
              {/* Logout Button */}
              <button
                onClick={logout}
                className="logout-btn group flex items-center space-x-2 px-4 py-2 rounded-xl border-2 border-purple-600 bg-white text-purple-700 font-semibold hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <IoLogOut className="text-xl group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>

              {/* User Profile */}
              <div className="user-profile flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-xl border border-purple-200">
                <div className="user-avatar bg-purple-600 text-white p-2 rounded-full">
                  <FaUser className="text-lg" />
                </div>
                <div className="user-info">
                  <p className="text-purple-900 font-semibold text-sm">
                    {user.user.name}
                  </p>
                  <p className="text-purple-600 text-xs">Student</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Login Button */}
              <Link href="/Login">
                <button className="login-btn group flex items-center space-x-2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  <FaSignInAlt className="text-lg group-hover:scale-110 transition-transform" />
                  <span>Login</span>
                </button>
              </Link>

              {/* Signup Button */}
              <Link href="/Signup">
                <button className="signup-btn group flex items-center space-x-2 px-6 py-2 rounded-xl border-2 border-purple-600 bg-white text-purple-700 font-semibold hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200 shadow-md hover:shadow-lg">
                  <FaUserPlus className="text-lg group-hover:scale-110 transition-transform" />
                  <span>Sign Up</span>
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden mr-6 text-2xl p-3 rounded-2xl transition-all duration-300 ${
            menuOpen
              ? 'bg-purple-600 text-white rotate-180'
              : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
          }`}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full right-4 mt-2 w-72 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-purple-200 animate-fadeIn z-50 overflow-hidden">
            <div className="flex flex-col py-4">
              {/* Mobile Navigation Links */}
              <Link
                href="/"
                onClick={closeMenu}
                className="mobile-nav-link group flex items-center space-x-3 px-6 py-4 text-purple-700 font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </Link>

              <Link
                href="/Contact"
                onClick={closeMenu}
                className="mobile-nav-link group flex items-center space-x-3 px-6 py-4 text-purple-700 font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                <FaEnvelope className="text-lg group-hover:scale-110 transition-transform" />
                <span>Contact Us</span>
              </Link>

              <Link
                href="/About"
                onClick={closeMenu}
                className="mobile-nav-link group flex items-center space-x-3 px-6 py-4 text-purple-700 font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                <FaInfoCircle className="text-lg group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>

              <Link
                href="/Course"
                onClick={(e) => {
                  handleCourseClick(e);
                  closeMenu();
                }}
                className={`mobile-nav-link group flex items-center space-x-3 px-6 py-4 ${
                  user.user 
                    ? 'text-purple-700 hover:bg-purple-50' 
                    : 'text-gray-400 cursor-not-allowed'
                } font-semibold transition-all duration-200`}
              >
                <FaBook className="text-lg group-hover:scale-110 transition-transform" />
                <span>Course</span>
              </Link>

              {/* Mobile Auth Section */}
              <div className="border-t border-purple-100 mt-2 pt-2">
                {user.user ? (
                  <>
                    <div className="px-6 py-3 flex items-center space-x-3 bg-purple-50 mx-4 rounded-xl mb-3">
                      <div className="user-avatar bg-purple-600 text-white p-2 rounded-full">
                        <FaUser className="text-sm" />
                      </div>
                      <div>
                        <p className="text-purple-900 font-semibold text-sm">
                          {user.user.name}
                        </p>
                        <p className="text-purple-600 text-xs">Welcome back!</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="mobile-nav-link group flex items-center space-x-3 px-6 py-4 text-red-600 font-semibold hover:bg-red-50 transition-all duration-200 w-full text-left"
                    >
                      <IoLogOut className="text-lg group-hover:scale-110 transition-transform" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/Login"
                      onClick={closeMenu}
                      className="mobile-nav-link group flex items-center space-x-3 px-6 py-4 text-purple-700 font-semibold hover:bg-purple-50 transition-all duration-200"
                    >
                      <FaSignInAlt className="text-lg group-hover:scale-110 transition-transform" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/Signup"
                      onClick={closeMenu}
                      className="mobile-nav-link group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 mx-4 rounded-xl mt-2 justify-center"
                    >
                      <FaUserPlus className="text-lg group-hover:scale-110 transition-transform" />
                      <span>Sign Up Free</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add some spacing for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}