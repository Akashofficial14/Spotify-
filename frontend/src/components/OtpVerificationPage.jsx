import React, { useRef, useState } from "react";

const OtpVerificationPage = ({ fullNumber, onVerify, onBack, isLoading }) => {
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const boxReferences = useRef([]);

  // Capture user keypad metrics and manage dynamic auto-focus jumps
  const handleCellInput = (element, index) => {
    const value = element.value.replace(/\D/g, ""); // Keep string numerical digits only
    if (!value) return;

    const updatedOtp = [...otpArray];
    updatedOtp[index] = value.slice(-1); // Pin single value to cell array index
    setOtpArray(updatedOtp);

    // Auto-focus the next grid coordinate
    if (index < 5 && value) {
      boxReferences.current[index + 1].focus();
    }

    // Auto-submit form immediately once the last digit is successfully keyed in
    if (index === 5 && value) {
      const compiledOtp = updatedOtp.join("");
      if (compiledOtp.length === 6) onVerify(compiledOtp);
    }
  };

  // Gracefully handle backspace deletion jumps
  const handleBackspaceJump = (e, index) => {
    if (e.key === "Backspace") {
      if (!otpArray[index] && index > 0) {
        // Cell is empty? Step backward and erase previous coordinate values
        const updatedOtp = [...otpArray];
        updatedOtp[index - 1] = "";
        setOtpArray(updatedOtp);
        boxReferences.current[index - 1].focus();
      } else {
        // Wipe local value cleanly
        const updatedOtp = [...otpArray];
        updatedOtp[index] = "";
        setOtpArray(updatedOtp);
      }
    }
  };

  const executeManualVerification = (e) => {
    e.preventDefault();
    const cleanTokenCode = otpArray.join("");
    if (cleanTokenCode.length === 6) {
      onVerify(cleanTokenCode);
    }
  };

  return (
    <div className="w-full text-center animate-fadeIn relative">
      {/* Return Navigation Back Arrow */}
      <button 
        onClick={onBack} 
        className="absolute -top-12 left-0 text-zinc-400 hover:text-white transition p-2"
        type="button"
      >
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-white text-[24px] sm:text-[32px] font-black tracking-tight text-left leading-tight mb-2">
        Enter the 6-digit code sent to you at {fullNumber}
      </h1>

      <form onSubmit={executeManualVerification} className="mt-8 space-y-6">
        {/* 6-Digit Code Input Grid Layout */}
        <div className="flex justify-between gap-1.5 sm:gap-3">
          {otpArray.map((digitValue, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              pattern="\d*"
              inputMode="numeric"
              value={digitValue}
              ref={(el) => (boxReferences.current[index] = el)}
              onChange={(e) => handleCellInput(e.target, index)}
              onKeyDown={(e) => handleBackspaceJump(e, index)}
              className="w-11 h-14 sm:w-14 sm:h-[68px] bg-transparent border-2 border-zinc-600 rounded-[4px] text-center text-white text-xl sm:text-2xl font-bold font-mono focus:border-white focus:outline-none transition-all"
              disabled={isLoading}
            />
          ))}
        </div>

        {/* Resend Action Area */}
        <div className="w-full flex justify-center py-2">
          <button
            type="button"
            className="text-white hover:scale-105 border border-zinc-600 text-xs font-bold px-4 py-1.5 rounded-full hover:border-white transition bg-transparent"
          >
            Resend code
          </button>
        </div>

        {/* Form Fallback Execution Button */}
        <button
          type="submit"
          disabled={isLoading || otpArray.join("").length < 6}
          className="w-full bg-[#1ed760] hover:bg-[#1fdf64] disabled:bg-zinc-700 disabled:text-zinc-400 disabled:scale-100 text-black text-sm sm:text-base font-bold py-3.5 rounded-full transition active:scale-[0.98] tracking-wider"
        >
          {isLoading ? "Verifying..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;