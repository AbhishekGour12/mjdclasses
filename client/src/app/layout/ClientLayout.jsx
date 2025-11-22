"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide navbar on /Login and /Signup
  const hideNavbar = pathname === "/Login" || pathname === "/Signup";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {/* {<Navbar />} */}
      {children}
      <Footer/>
    </div>
  );
}
