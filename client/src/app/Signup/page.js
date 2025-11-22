"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { authAPI } from "../lib/auth";

export default function Page() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    
  });

  const [studentclass, setStudentclass] = useState("");
  const [stream, setStream] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // INDIVIDUAL FIELD ERRORS
  const [errors, setErrors] = useState({});

  // VALIDATIONS ------------------------
  const validateInputs = () => {
    let err = {};

    // NAME → Only alphabets + spaces
    if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
      err.name = "Name can contain only alphabets";
    }

    // EMAIL FORMAT
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = "Invalid email format";
    }

    // PHONE → Numbers only + exactly 10 digits
    if (!/^\d{10}$/.test(formData.number)) {
      err.number = "Phone number must be 10 digits";
    }

    // CITY → Only alphabets + spaces
   

    // PASSWORD → 6+ characters (you can increase this)
    if (formData.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    // CLASS REQUIRED
    if (!studentclass) {
      err.studentclass = "Please select a class";
    }

    // STREAM ONLY FOR CLASS 11 & 12
    if ((studentclass === "11" || studentclass === "12") && !stream) {
      err.stream = "Please select a stream";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // HANDLERS ------------------------
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please fix the errors");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.register({
        ...formData,
        classes: studentclass,
        stream,
      });

      toast.success(response.message);

      // reset
      setFormData({ name: "", email: "", number: "", password: "" });
      setStudentclass("");
      setStream("");

    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // RENDER ---------------------------
  return (
    <div className="flex py-9 max-lg:py-3 sm:px-10 max-sm:px-6 justify-between max-lg:justify-center mt-10 w-[95%] m-auto">

      <div className="max-lg:hidden flex items-center flex-1 max-w-[650px] h-auto mr-5">
        <Image src="/SignUpImg.svg" alt="Signup" width={700} height={700} className="w-full" />
      </div>

      <div className="max-lg:flex-1 md:max-w-[460px] max-md:max-w-[400px] mx-auto px-2">

        <form onSubmit={handleSubmit} className="lg:max-w-[406px] rounded-2xl lg:pt-6">

          <h1 className="mx-12 lg:text-3xl max-md:text-[25px] font-bold text-center text-purple-800 mb-6">
            Sign Up And Start Learning
          </h1>

          <div className="flex flex-col gap-4">

            {/* NAME */}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border-2 border-purple-200 px-3 py-2 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border-2 border-purple-200 px-3 py-2 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            {/* NUMBER */}
            <input
              name="number"
              value={formData.number}
              maxLength="10"
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) handleChange(e);
              }}
              placeholder="Mobile No"
              className="border-2 border-purple-200 px-3 py-2 rounded-md"
            />
            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}

           
            {/* CLASS */}
            <select
              value={studentclass}
              onChange={(e) => setStudentclass(e.target.value)}
              className="border-2 border-purple-200 px-3 py-2 rounded-md"
            >
              <option value="">--Select class--</option>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(v => (
                <option key={v} value={v}>{`Class ${v}`}</option>
              ))}
            </select>
            {errors.studentclass && <p className="text-red-500 text-sm">{errors.studentclass}</p>}

            {/* STREAM ONLY 11 & 12 */}
            {(studentclass === "11" || studentclass === "12") && (
              <>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="border-2 border-purple-200 px-3 py-2 rounded-md"
                >
                  <option value="">--Select Stream--</option>
                  <option value="Maths">Maths</option>
                  <option value="Bio">Bio</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
                {errors.stream && <p className="text-red-500 text-sm">{errors.stream}</p>}
              </>
            )}

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border-2 border-purple-200 px-3 py-2 rounded-md w-full"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-purple-700 hover:bg-purple-800 py-2 font-semibold"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          <div className="my-4 text-center bg-[#E9E9E9]">
            <p className="font-medium py-2">
              Already Have An Account?{" "}
              <Link href="/Login">
                <span className="text-purple-600 underline ml-2">Log In</span>
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
