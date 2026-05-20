import React from "react";
import { Check, Zap } from "lucide-react";

const Premium = () => {
  const plans = [
    {
      title: "Individual",
      price: "₹119",
      period: "month",
      features: ["1 Premium account", "Cancel anytime", "Subscribe or render one-time"],
      color: "bg-[#C8E0FC]", // Light blue
      textColor:"text-[#C8E0FC]",
      buttonText: "Get Premium Individual",
    },
    {
      title: "Student",
      price: "₹59",
      period: "month",
      features: ["1 verified Premium account", "Discount for eligible students", "Cancel anytime"],
      color: "bg-[#3BE477]", // Light green
      textColor:"text-[#3BE477]",
      buttonText: "Get Premium Student",
    },
    {
      title: "Duo",
      price: "₹149",
      period: "month",
      features: ["2 Premium accounts", "For couples who live together", "Cancel anytime"],
      color: "bg-[#E0CEEC]", // yellow
      textColor:"text-[#E0CEEC]",
      buttonText: "Get Premium Duo",
    },
    {
      title: "Family",
      price: "₹179",
      period: "month",
      features: ["Up to 6 Premium accounts", "Control content marked as explicit", "Cancel anytime"],
      color: "bg-[#FFCC99]", // peach
      textColor:"text-[#FFCC99]",
      buttonText: "Get Premium Family",
    }
  ];

  return (
    <div className="bg-[#121212] min-h-screen text-white pb-3 overflow-auto lg:hidden">
      {/* Header Section */}
      <div className="p-6 pt-5 text-center bg-gradient-to-b from-[#222] to-[#121212]">
        <h1 className="text-3xl font-bold mb-4">Experience the difference</h1>
        <p className="text-gray-400 text-md">Go Premium and enjoy full control of your listening. Cancel anytime.</p>
      </div>

      {/* Comparison Mini-Table */}
      <div className="px-6 mb-10">
        <div className="bg-[#282828] rounded-lg p-5">
          <h3 className="font-bold mb-4 text-lg border-b border-gray-700 pb-2">Why join Premium?</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-md">
              <Check size={18} className="text-[#1DB954]" /> Ad-free music listening
            </li>
            <li className="flex items-center gap-3 text-md">
              <Check size={18} className="text-[#1DB954]" /> Download to listen offline
            </li>
            <li className="flex items-center gap-3 text-md">
              <Check size={18} className="text-[#1DB954]" /> Play songs in any order
            </li>
            <li className="flex items-center gap-3 text-md">
              <Check size={18} className="text-[#1DB954]" /> High audio quality
            </li>
          </ul>
        </div>
      </div>
       <h3 className="text-2xl font-semibold px-6 mb-6">Available Plans</h3>
      {/* Plans Horizontal Scroll */}
      <div className="flex flex-col gap-4 overflow-x-auto px-6 snap-x pb-4 no-scrollbar">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className="snap-center min-w-[280px] bg-[#282828] rounded-xl flex flex-col overflow-hidden border border-transparent hover:border-white/20 transition-all"
          >
            {/* Plan Header Color Block */}
            <div className={`text-white border-b border-gray-400 p-4 text-black`}>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-black/10 px-2 py-0.5 rounded">
                Free for 1 month
              </span>
              <h2 className={`${plan.textColor} text-2xl font-bold mt-2`}>{plan.title}</h2>
              <p className="text-sm font-semibold">{plan.price} / {plan.period} after trial</p>
            </div>

            {/* Plan Details */}
            <div className="p-5 flex-1 flex flex-col">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-tight text-gray-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`${plan.color} mt-auto w-full text-black font-bold py-3 rounded-full hover:scale-105 transition-transform text-sm`}>
                {plan.buttonText}
              </button>
              
              <p className="text-[10px] text-gray-500 mt-4 text-center leading-tight">
                Terms and conditions apply. 1 month free not available for users who have already tried Premium.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* One-time plans link */}
      <div className="text-center mt-8">
        <button className="text-sm font-bold border border-gray-500 px-6 py-2 rounded-full hover:border-white">
          View all one-time plans
        </button>
      </div>
    </div>
  );
};

export default Premium;