import React from "react";
import { useNavigate } from "react-router";

const PhoneInputPage = ({
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
  onSubmit,
  isLoading,
  settoggle,
}) => {
  const navigate = useNavigate();

  const handleSocialClick = (platform) => {
    if (platform === "Google") {
      window.location.href = "http://localhost:4500/api/auth/google";
    } else if (platform === "email") {
      // Switch view layout from Phone back to standard Email Login view cleanly
      navigate("/");
    }
  };

  return (
    <div className="w-full text-center animate-fadeIn">
      <div className="flex justify-center flex-col items-center gap-2 mb-4">
        <svg
          viewBox="0 0 168 168"
          className="w-18 h-18 lg:w-10 lg:h-10 fill-white"
        >
          <path d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0zm38.2 121.3c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.6-3 .7-6-1.1-6.7-4.1-.7-3 1.1-6 4.1-6.7 33.7-7.7 63.7-4.3 86.6 9.6 2.6 1.6 3.4 5 1.8 7.6zm10.9-24.2c-2 3.2-6.3 4.2-9.5 2.2-23.8-14.6-60-18.8-88.2-10.2-3.6 1.1-7.4-.9-8.5-4.5-1.1-3.6.9-7.4 4.5-8.5 32.3-9.8 72.4-5.1 100 11.8 3.2 2 4.2 6.3 2.2 9.5zm1-25.2c-28.6-17-75.7-18.6-103-10.3-4.2 1.3-8.7-1.1-10-5.3-1.3-4.2 1.1-8.7 5.3-10 31.4-9.5 83.7-7.7 116.7 12.1 3.8 2.3 5 7.2 2.7 11-2.3 3.8-7.2 5-11 2.7z" />
        </svg>
        <h1 className="text-white text-[28px] sm:text-[40px] font-black tracking-tight mb-8">
          Welcome back
        </h1>
      </div>

      <form onSubmit={onSubmit} className="w-full space-y-4 text-left">
        <div>
          <label className="text-[12px] sm:text-[13px] font-bold text-white block mb-2 tracking-wide">
            Phone number
          </label>

          <div className="w-full flex gap-2">
            <div className="relative flex items-center bg-[#121212] border border-zinc-500 rounded-[4px] hover:border-white focus-within:border-[#1ed760] transition-all px-3">
  <select
    value={countryCode}
    onChange={(e) => setCountryCode(e.target.value)}
    className="bg-transparent text-white text-sm sm:text-base font-medium pr-6 py-3 outline-none cursor-pointer appearance-none"
  >
    {/* Explicitly styled option tags prevent browser white-flashing highlights */}
    <option className="bg-[#181818] text-white" value="+91">+91 (IN)</option>
    <option className="bg-[#181818] text-white" value="+1">+1 (US/CA)</option>
    <option className="bg-[#181818] text-white" value="+44">+44 (UK)</option>
    <option className="bg-[#181818] text-white" value="+61">+61 (AU)</option>
    <option className="bg-[#181818] text-white" value="+971">+971 (AE)</option>
    <option className="bg-[#181818] text-white" value="+49">+49 (DE)</option>
    <option className="bg-[#181818] text-white" value="+33">+33 (FR)</option>
    <option className="bg-[#181818] text-white" value="+65">+65 (SG)</option>
    <option className="bg-[#181818] text-white" value="+81">+81 (JP)</option>
    <option className="bg-[#181818] text-white" value="+27">+27 (ZA)</option>
  </select>
  
  <div className="absolute right-3 pointer-events-none text-zinc-400">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </div>
</div>

            <input
              type="tel"
              maxLength="10"
              placeholder="9174571636"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              }
              className="flex-1 bg-[#121212] border border-zinc-500 rounded-[4px] px-4 py-3 text-sm sm:text-base text-white font-medium placeholder-zinc-500 outline-none hover:border-white focus:border-[#1ed760] transition-all"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          id="spotify-continue-btn"
          type="submit"
          disabled={isLoading || phoneNumber?.length < 10}
          className="w-full bg-[#1ed760] hover:bg-[#1fdf64] disabled:bg-zinc-700 disabled:text-zinc-400 disabled:scale-100 active:scale-[0.98] text-black text-sm sm:text-base font-bold py-3 rounded-full transition duration-200 mt-2 shadow-md tracking-wider uppercase"
        >
          {isLoading ? "Transmitting..." : "Continue"}
        </button>
      </form>

      <div className="flex justify-center pt-2">
        <div id="recaptcha-container"></div>
      </div>

      <div className="flex items-center my-6">
        <div className="flex-1 h-[1px] bg-zinc-800" />
        <span className="px-4 text-zinc-400 text-xs font-semibold lowercase">
          or
        </span>
        <div className="flex-1 h-[1px] bg-zinc-800" />
      </div>

      <div className="w-full space-y-3">
        {[
          { text: "Continue with email", icon: "✉️", id: "email" },
          {
            text: "Continue with Google",
            img: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
            id: "Google",
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleSocialClick(item.id)}
            type="button"
            className="w-full relative flex items-center justify-center border border-zinc-500 text-white text-xs sm:text-[15px] font-bold py-3 rounded-full hover:border-white bg-transparent transition duration-200"
          >
            {item.img ? (
              <img
                src={item.img}
                className="w-[18px] sm:w-[22px] absolute left-4 sm:left-6"
                alt=""
              />
            ) : (
              <span className="text-md sm:text-lg absolute left-4 sm:left-6">
                {item.icon}
              </span>
            )}
            {item.text}
          </button>
        ))}
      </div>


      {/* FIXED CLICK ROUTER TARGET LINK */}
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
  );
};

export default PhoneInputPage;
