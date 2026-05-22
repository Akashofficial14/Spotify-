import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../features/AuthSlice";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router";
// import { MyStore } from "../contextApi/MyContext";

const Login = ({ settoggle }) => {
  //  let {regdata,setLogindata} =useContext(MyStore)
  let { loginUserData, regUserData } = useSelector((state) => state.auth);
  console.log("loginuser=>", loginUserData);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data Sent:", data);

    try {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      });

      console.log("your res data coming from backend is--->", res);

      // Check if the backend responded with a success flag
      if (res.data?.success) {
        const { token, user } = res.data.data;

        // Save the authentication token and user details to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("logindata", JSON.stringify(user));

        // Dispatch the backend user details to Redux instead of raw form inputs
        dispatch(setLoginUser(user));
        toast.success(res.data.message || "Login successful. Welcome back!");
        navigate("/home");
        reset();
      } else {
        // Fallback if status is 200 but success flag is false
        console.log("your error is-->", res.data);
        toast.error(
          res.data?.message || "Invalid Credentials or Register first",
        );
      }
    } catch (error) {
      console.error("Login Error:", error?.response);

      // Safely extract the exact error message sent back by your backend
      const serverMessage = error.response?.data?.message;

      console.log("Your extracted server message is --->", serverMessage);

      toast.error(serverMessage || "Invalid Credentials or Register first");
    }
  };

  // 1. Define your 3 specific authentication handler functions
  const handlePhoneAuth = () => {
    console.log("Phone number authentication logic runs here...");
    // Open an OTP modal or redirect to phone entry form
    settoggle("phone")
  };

  const handleGoogleAuth = () => {
    console.log("Redirecting to Google OAuth backend...");
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const authProviders = [
    {
      id: "phone",
      img: "https://img.icons8.com/?size=100&id=13616&format=png&color=000000",
      text: "Continue with phone number",
      action: handlePhoneAuth,
    },
    {
      id: "google",
      img: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
      text: "Continue with Google",
      action: handleGoogleAuth,
    },
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-[#121212] flex items-center justify-center py-4 lg:py-10 px-4 lg:px-0">
      <div className="w-full max-w-md flex flex-col gap-8 px-4 lg:px-6 lg:gap-5">
        {/* Spotify Logo */}
        <div className="flex justify-center items-center flex-col gap-2 mb-4">
          <svg
            viewBox="0 0 168 168"
            className="w-18 h-18 lg:w-10 lg:h-10 fill-white"
          >
            <path d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0zm38.2 121.3c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.6-3 .7-6-1.1-6.7-4.1-.7-3 1.1-6 4.1-6.7 33.7-7.7 63.7-4.3 86.6 9.6 2.6 1.6 3.4 5 1.8 7.6zm10.9-24.2c-2 3.2-6.3 4.2-9.5 2.2-23.8-14.6-60-18.8-88.2-10.2-3.6 1.1-7.4-.9-8.5-4.5-1.1-3.6.9-7.4 4.5-8.5 32.3-9.8 72.4-5.1 100 11.8 3.2 2 4.2 6.3 2.2 9.5zm1-25.2c-28.6-17-75.7-18.6-103-10.3-4.2 1.3-8.7-1.1-10-5.3-1.3-4.2 1.1-8.7 5.3-10 31.4-9.5 83.7-7.7 116.7 12.1 3.8 2.3 5 7.2 2.7 11-2.3 3.8-7.2 5-11 2.7z" />
          </svg>
          <h1 className="text-white text-4xl lg:text-6xl font-bold text-center mb-4 lg:mb-6">
            Log in to Spotify
          </h1>
        </div>
        <div className="child flex flex-col gap-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 lg:space-y-4"
          >
            <div>
              <label className="block text-xs lg:text-sm text-white mb-1 font-bold">
                Email or username
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email or username is required",
                })}
                className="w-full  bg-[#121212] border border-gray-600 rounded-md px-3 py-2 text-sm lg:text-base text-white focus:outline-none focus:border-white"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
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

            <button
              type="submit"
              className="w-full bg-[#1ed760] hover:bg-[#1fdf64] text-black text-sm lg:text-base font-semibold py-2 lg:py-3 rounded-full transition"
            >
              Continue
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
            {authProviders.map((elem) => (
              /* FIXED: Moved key prop to the outermost wrapper element for proper React DOM reconciliation */
              <div key={elem.id} className="box relative">
                <button
                  onClick={elem.action} // Attaching the specific function reference here
                  type="button"
                  className="w-full flex items-center justify-center border py-3 border-gray-600 text-white text-xs lg:text-base lg:py-3 rounded-full hover:border-white transition"
                >
                  {elem.text}
                </button>
                <img
                  className="w-7 absolute left-4 top-1/2 -translate-y-1/2"
                  src={elem.img}
                  alt=""
                />
              </div>
            ))}
          </div>
          {/* Sign up */}
          <p className="text-center text-white text-md lg:text-gray-400 text-md mt-6 lg:mt-8">
            Don&apos;t have an account? <br />
            <span
              className="text-white text-lg lg:text-base font-semibold transform hover:scale-110 transition duration-300 cursor-pointer"
              onClick={() => settoggle("register")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
