import React, { useState, useEffect } from "react";
import { auth } from "../firebase/setup"; 
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLoginUser } from "../features/AuthSlice"; 
import { toast } from "react-toastify";
import PhoneInputPage from "./PhoneInputPage";
import OtpVerificationPage from "./OtpVerificationPage";
import axiosInstance from "../config/axiosInstance"; // Ensure this matches your axios file path

const SpotifyPhoneAuth = ({ settoggle }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth instance is missing! check your ../firebase/setup import.");
      return;
    }

    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal", 
            callback: (response) => {},
            "expired-callback": () => {
              toast.error("reCAPTCHA expired. Please check the box again.");
            },
          }
        );
      } catch (err) {
        console.error("Failed to initialize RecaptchaVerifier:", err);
      }
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, [isOtpSent]); 

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      return toast.warn("Please enter a valid phone number");
    }

    setIsLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("Recaptcha verifier was not initialized properly. Refresh the page.");
      }

      const fullPhoneNumber = `${countryCode}${phoneNumber}`;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      );
      
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "Failed to send OTP. Try again.");
      
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      setIsOtpSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otpString) => {
    if (!otpString || otpString.length < 6) {
      return toast.warn("Please enter a complete 6-digit code");
    }

    setIsLoading(true);
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        throw new Error("Session expired. Please request a new OTP.");
      }

      // 1. Verify code against Firebase
      const result = await confirmationResult.confirm(otpString);
      const firebaseUser = result.user;

      // 2. Call your backend route to trigger phoneLoginSuccessController
      // Modify the URL path below to match your backend API router path
      const backendResponse = await axiosInstance.post("/auth/phone-login-success", {
        uid: firebaseUser.uid,
        phoneNumber: firebaseUser.phoneNumber
      }, {
        withCredentials: true // Essential for sending/receiving cookies correctly
      });

      // 3. Extract your backend database structures
      const backendData = backendResponse.data.data; // Adapting to your responseUtil structure
      const appToken = backendData.token;
      const appUser = backendData.user;

      // 4. Save your real backend authentication state items
      localStorage.setItem("logindata", JSON.stringify(appUser));
      localStorage.setItem("token", appToken);

      // 5. Update Redux global state & navigate home
      dispatch(setLoginUser(appUser));
      toast.success("Successfully logged in!");
      navigate("/home"); 
    } catch (error) {
      console.error("Error verifying OTP or Backend Synchronization failed:", error);
      const errMsg = error.response?.data?.message || error.message || "Invalid OTP code.";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-between">
      <div className="flex-1 w-full max-w-[450px] flex flex-col justify-center px-4 py-6">
        {!isOtpSent ? (
          <div className="space-y-4">
            <PhoneInputPage
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              onSubmit={handleSendOtp}
              isLoading={isLoading}
              settoggle={settoggle}
            />
            
            <div className="flex justify-center pt-4 pb-2">
              <div id="recaptcha-container"></div>
            </div>
          </div>
        ) : (
          <OtpVerificationPage
            fullNumber={`${countryCode} ${phoneNumber}`}
            onVerify={handleVerifyOtp}
            onBack={() => setIsOtpSent(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default SpotifyPhoneAuth;