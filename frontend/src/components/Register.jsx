import { useForm } from "react-hook-form";
// import React, { useContext, useState } from 'react'
// import { MyStore } from "../contextApi/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { setRegUser } from "../features/AuthSlice";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";

const Register = ({ settoggle }) => {
  // let {regdata,setRegdata} = useContext(MyStore)
  let { regUserData } = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Register Data Sent:", data);

    try {
      const res = await axiosInstance.post("/auth/register", data, {
        withCredentials: true,
      });

      console.log("your res data coming from backend is--->", res);

      // 1. Rely entirely on the backend success response flag
      if (res.data?.success) {
        // Extract the created user from your backend response structure
        const newUser = res.data.data?.user || res.data.data;

        // Update local storage and dispatch the actual backend user data to Redux
        localStorage.setItem("regdata", JSON.stringify(newUser));
        dispatch(setRegUser(newUser));

        // Display the actual success message returned by your server
        toast.success(
          // res.data.message ||
          "Account created successfully. Welcome to Spotify!",
        );

        reset();
        settoggle((prev) => !prev);
      } else {
        toast.error(
          res.data?.message || "Registration failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Register Error Object caught on frontend:", error);

      // 2. Safely capture the error message, handling both JSON objects and standard HTML pages
      const rawErrorData = error.response?.data;
      let serverMessage = "Registration failed. Please check your credentials.";

      if (rawErrorData) {
        if (typeof rawErrorData === "string") {
          if (rawErrorData.includes("<pre>")) {
            const match = rawErrorData.match(/<pre>Error:\s*([^<]+)/);
            if (match && match[1]) {
              serverMessage = match[1].split("\n")[0].trim();
            }
          } else {
            serverMessage = rawErrorData;
          }
        } else if (rawErrorData.message) {
          serverMessage = rawErrorData.message;
        }
      }

      toast.error(serverMessage);
    }
  };

  const handleGoogleAuth = () => {
    console.log("i am clickingg here in btn");
    // Now proceed to Google Login
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-[100dvh] bg-[#121212] flex items-center justify-center py-4 lg:py-10 px-4 lg:px-0">
      <div className="w-full max-w-md px-4 flex flex-col gap-8 lg:px-6 lg:gap-5">
        {/* Spotify Logo */}
        <div className="flex justify-center flex-col items-center gap-2 mb-4">
          <svg
            viewBox="0 0 168 168"
            className="w-18 h-18 lg:w-10 lg:h-10 fill-white"
          >
            <path d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0zm38.2 121.3c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.6-3 .7-6-1.1-6.7-4.1-.7-3 1.1-6 4.1-6.7 33.7-7.7 63.7-4.3 86.6 9.6 2.6 1.6 3.4 5 1.8 7.6zm10.9-24.2c-2 3.2-6.3 4.2-9.5 2.2-23.8-14.6-60-18.8-88.2-10.2-3.6 1.1-7.4-.9-8.5-4.5-1.1-3.6.9-7.4 4.5-8.5 32.3-9.8 72.4-5.1 100 11.8 3.2 2 4.2 6.3 2.2 9.5zm1-25.2c-28.6-17-75.7-18.6-103-10.3-4.2 1.3-8.7-1.1-10-5.3-1.3-4.2 1.1-8.7 5.3-10 31.4-9.5 83.7-7.7 116.7 12.1 3.8 2.3 5 7.2 2.7 11-2.3 3.8-7.2 5-11 2.7z" />
          </svg>
          {/* Title */}
          <h1 className="text-white text-4xl lg:text-6xl font-bold text-center mb-4 lg:mb-6">
            Sign up to start listening
          </h1>
        </div>
        <div className="child">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 lg:space-y-4"
          >
            {/* Name */}
            <div>
              <label className="text-xs lg:text-sm font-bold text-white block mb-1">
                Full name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="name"
                className="w-full bg-[#121212] border border-gray-600 rounded-md px-3 py-2 text-sm lg:text-base text-white focus:outline-none focus:border-white"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs lg:text-sm font-bold text-white block mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full bg-[#121212] border border-gray-600 rounded-md px-3 py-2 text-sm lg:text-base text-white focus:outline-none focus:border-white"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs lg:text-sm font-bold text-white block mb-1">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="mobile number"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className="w-full bg-[#121212] border border-gray-600 rounded-md px-3 py-2 text-sm lg:text-base text-white focus:outline-none focus:border-white"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs lg:text-sm font-bold text-white block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full bg-[#121212] border border-gray-600 rounded-md px-3 py-2 text-sm lg:text-base text-white focus:outline-none focus:border-white"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#1ed760] hover:bg-[#1fdf64] text-black text-sm lg:text-base font-semibold py-2 lg:py-3 rounded-full transition"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4 lg:my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="px-3 text-gray-400 text-xs lg:text-sm">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-2 lg:space-y-3 font-bold">
            {[
              {
                img: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
                text: "Continue with Google",
              },
            ].map((elem) => (
              <div className="box relative" onClick={handleGoogleAuth}>
                <button
                  // key={}
                  type="button"
                  className="w-full flex items-center justify-center border py-3 border-gray-600 text-white text-xs lg:text-base  lg:py-3 rounded-full hover:border-white transition"
                >
                  {elem.text}
                </button>
                <img
                  className="w-7 absolute left-4 top-1/2 -translate-y-1/2 "
                  src={elem.img}
                  alt=""
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-white text-md lg:text-md mt-6 lg:text-gray-400 mt-8">
            Already have an account? <br />
            <span
              className="text-white text-lg lg:text-base font-semibold hover:scale-110 transition duration-300 cursor-pointer"
              onClick={() => settoggle("login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
