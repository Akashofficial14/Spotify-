import React, { useState } from "react";
import PhoneInputPage from "./PhoneInputPage";
import OtpVerificationPage from "./OtpVerificationPage";

// 1. Destructure settoggle out of the incoming props here!
const SpotifyPhoneAuth = ({ settoggle }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => { /* ... your OTP code ... */ };
  const handleVerifyOtp = async (otpString) => { /* ... your verify code ... */ };

  console.log("set toggle reciecess",settoggle)
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
              // 2. PASS IT HERE so PhoneInputPage can read it safely
              settoggle={settoggle} 
            />
            
            <div className="flex justify-center pt-2">
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