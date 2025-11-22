import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-10 lg:px-20 xl:px-32 border-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15">
        {/* Institute Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
           <Image
               src="/logo.png"
               alt="MJD Education Logo"
               width={260}
               height={100}
               className="w-[160px] sm:w-[260px] h-[10cd 0px] object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
               priority
             />
           
          </h2>
          <p className="text-sm leading-relaxed">
            Empowering students to achieve academic excellence and success in
            every field.
          </p>
        </div>
        {/* Quick Links */}
        <div className="pl-1 md:pl-20">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Course" className="hover:text-white transition">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/About" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/Contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm mb-1">
            Baba Complex, near Indian Oil petrol pump, <br /> Tejaji Nagar,
            Khandwa Road, Indore M.P. 452020
          </p>
          <p className="text-sm mb-1">Phone: +91 6265866608</p>
           <p className="text-sm mb-1">Phone: +91 9981209825</p>
          <p className="text-sm">Email: mjdclasses@gmail.com</p>
        </div>
        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex md:flex-col flex-row gap-5 text-2xl md:gap-3 ml:0 md:ml-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-red-500 transition">
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/share/16PkLxHDHG/ "
              className="hover:text-blue-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/mjd_classes?igsh=enFubWR3eHNtM3Ns"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} MJD Coaching Institute. All rights
        reserved.
      </div>
    </footer>
  );
}
export default Footer;