import React from "react";
import { useDispatch } from "react-redux";
import { logoutresetFn } from "../features/AuthSlice";
import { LogOut } from "lucide-react";

const Logout = () => {
  let dispatch = useDispatch();
  return (
    <div className="btn absolute top-14 lg:top-18 right-4 lg:right-10 gap-1 lg:gap-2 flex justify-center items-center text-sm lg:text-lg px-2 py-1 lg:px-3 lg:py-1 rounded-md text-black bg-white  hover: hover:scale-105" onClick={() => dispatch(logoutresetFn())}>
      <button className=' active:scale-95 transition-transform duration-150"'>
        LogOut
      </button>
      <LogOut size={16} className="lg:w-[20px] lg:h-[20px]" />
    </div>
  );
};

export default Logout;
