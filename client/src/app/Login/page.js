"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { authAPI } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/features/authSlice";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  // VALIDATION LOGIC ---------------
  const validateInputs = () => {
    let err = {};

    // EMAIL FORMAT CHECK
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = "Invalid email format";
    }

    // PASSWORD CHECK
    if (!formData.password || formData.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // HANDLE INPUT CHANGE ----------
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // HANDLE SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please correct the errors");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(formData);

      if (response) {
        toast.success(response.message);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);

        dispatch(loginSuccess(response.data));

        setFormData({ email: "", password: "" });

        setTimeout(() => router.push("/"), 1500);
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // UI RENDER ----------
  return (
    <div className="flex py-9 max-lg:py-3 sm:px-10 max-sm:px-6 justify-between max-lg:justify-center mt-10 w-[95%] m-auto">

      <div className="max-lg:hidden flex items-center flex-1 max-w-[650px] h-auto mr-8">
        <Image src="/SignUpImg.svg" alt="Login" width={700} height={700} className="w-full" />
      </div>

      <div className="max-lg:flex-1 md:max-w-[460px] max-md:max-w-[400px] mx-auto px-2">

        <form onSubmit={handleSubmit} className="lg:max-w-[430px] rounded-2xl lg:pt-10">

          <h1 className="lg:text-[32px] md:text-[36px] max-md:text-[25px] font-bold text-purple-800 text-center mb-10">
            Log In To Continue Your <br /> Learning Journey
          </h1>

          <div className="flex flex-col gap-6 px-2">

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border-2 border-purple-200 w-full px-3 py-2 rounded-md focus:outline-none focus:border-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border-2 border-purple-200 w-full px-3 py-2 rounded-md focus:outline-none focus:border-purple-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-purple-700 hover:bg-purple-800 py-2 font-semibold transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>

          {/* OTHER OPTIONS ---------------- */}
          <div className="my-10 flex items-center gap-2 text-[#AEAEAE] px-2">
            <hr className="border flex-1" />
            <p className="font-semibold text-[16px]">Other Log In Options</p>
            <hr className="border flex-1" />
          </div>

          {/* SIGNUP LINK ---------------- */}
          <div className="bg-[#E9E9E9] text-center mx-2">
            <p className="py-3 text-[16px] font-semibold">
              Don't Have An Account?{" "}
              <Link href="/Signup">
                <span className="ml-1 text-purple-600 hover:underline cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
