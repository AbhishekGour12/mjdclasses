"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authAPI } from "../lib/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/features/authSlice";
export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("Please fill all the fields");
    return;
  }

  setError("");
  setLoading(true);

  try {
    // API call to backend
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/signin`, {
      email: formData.email,
      password: formData.password,
      role: "admin"
    });

    // Success toast
    toast.success(response.data.message);
 
    // Save token
    //localStorage.setItem("token", response.data.token);
    localStorage.setItem("admin", JSON.stringify(response.data.user));
    

    // Save user data in Redux
   // dispatch(loginSuccess(response.data.user));

    // reset inputs
    setFormData({ email: "", password: "" });

    // Redirect to dashboard/home
    setTimeout(() => {
      router.push("/Admin");
    }, 1500);
    setTimeout(()=>{
      localStorage.removeItem("admin");
      router.push("/AdminLogin")

    },600000)

  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Login failed, please try again!"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-white px-5">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-purple-100">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Admin Login Portal
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border-2 border-purple-200 w-full px-4 py-2 rounded-md placeholder:font-medium focus:outline-none focus:border-purple-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border-2 border-purple-200 w-full px-4 py-2 rounded-md placeholder:font-medium focus:outline-none focus:border-purple-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-purple-700 hover:bg-purple-800 py-2 font-semibold rounded-md transition duration-300"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Admin Dashboard | All rights reserved
        </p>
      </div>
    </div>
  );
}