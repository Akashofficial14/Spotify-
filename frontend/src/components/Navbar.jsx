import {
  ArrowDownToLine,
  Bell,
  CircleUserRound,
  Download,
  House,
  Search,
} from "lucide-react";
import React from "react";
import { songs } from "../AllSongs/Songs";
import { useDispatch, useSelector } from "react-redux";
import { filterSongArr, clearQuery } from "../features/filterSongSlice";
import Logout from "./Logout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { LogoutFn } from "../features/AuthSlice";
import { useUserProfile } from "../hooks/user.hooks";

const Navbar = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { logout } = useSelector((state) => state.auth);
  console.log("your logout is-->", logout);

  const handleSearch = (e) => {
    let query = e.target.value.toLowerCase();
    if (!query) {
      dispatch(clearQuery());
    }
    let filterSongs = songs.filter((elem) => {
      return elem.song.toLowerCase().includes(query);
    });
    dispatch(
      filterSongArr({
        song: filterSongs,
        query,
      }),
    );
  };

  let { data, isLoading, isError } = useUserProfile();
  console.log("your data comng from backend is ", data);

  return (
    <nav className="hidden lg:flex h-[10vh] text-gray-500 w-full flex-row justify-between items-center p-8">
      {/* Spotify Logo */}
      <div className="part1 w-full lg:w-[30%]">
        <div className="flex justify-start">
          <svg
            viewBox="0 0 168 168"
            className="w-8 h-8 lg:w-9 lg:h-9 fill-white"
          >
            <path d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0zm38.2 121.3c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.6-3 .7-6-1.1-6.7-4.1-.7-3 1.1-6 4.1-6.7 33.7-7.7 63.7-4.3 86.6 9.6 2.6 1.6 3.4 5 1.8 7.6zm10.9-24.2c-2 3.2-6.3 4.2-9.5 2.2-23.8-14.6-60-18.8-88.2-10.2-3.6 1.1-7.4-.9-8.5-4.5-1.1-3.6.9-7.4 4.5-8.5 32.3-9.8 72.4-5.1 100 11.8 3.2 2 4.2 6.3 2.2 9.5zm1-25.2c-28.6-17-75.7-18.6-103-10.3-4.2 1.3-8.7-1.1-10-5.3-1.3-4.2 1.1-8.7 5.3-10 31.4-9.5 83.7-7.7 116.7 12.1 3.8 2.3 5 7.2 2.7 11-2.3 3.8-7.2 5-11 2.7z" />
          </svg>
        </div>
      </div>

      <div className="part2 h-full w-full lg:w-[70%] justify-between items-center flex flex-col lg:flex-row gap-2 lg:gap-10">
        <div className="navcenter flex gap-2 lg:gap-5 justify-center items-center w-full lg:w-auto">
          <House
            size={20}
            className="p-2 lg:p-3 rounded-full bg-[#2A2A2A] text-white hover:bg-[#2d2c2c] w-[30px] h-[30px] lg:w-[45px] lg:h-[45px]"
          />
          <div className="relative w-full lg:w-110">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full bg-[#2A2A2A] pl-11 pr-4 py-2 text-gray-200 text-sm lg:text-lg rounded-full border border-transparent focus:border-white hover:bg-[#2d2c2c] outline-none transition-all"
              type="text"
              name="search"
              id="search"
              placeholder="What do you want to play?"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="navright flex justify-center items-center gap-2 lg:gap-5">
          <h3 className="px-2 py-1 lg:px-4 lg:py-1.5 text-base lg:text-md font-semibold bg-white text-black rounded-xl hover:scale-105 cursor-pointer">
            Explore Premium
          </h3>
          <div className="down hidden lg:flex justify-center items-center gap-1 hover:text-white hover:scale-105 cursor-pointer">
            <Download /> <h2 className="font-semibold">Install App</h2>
          </div>
          <Bell
            size={24}
            className="hover:text-white hover:scale-105 lg:w-[30px] lg:h-[25px] cursor-pointer"
          />

          {/* DYNAMIC AVATAR: Switches between the initial badge or the fallback icon */}
          {!isLoading && !isError && data?.name ? (
            <div
              onClick={() => dispatch(LogoutFn())}
              className="w-[32px] h-[32px] lg:w-[36px] lg:h-[36px] rounded-full bg-[#1ed760] text-black font-bold flex items-center justify-center text-sm lg:text-base select-none cursor-pointer hover:scale-105 transition-all"
              title={`Logged in as ${data.name}`}
            >
              {data.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <CircleUserRound
              size={24}
              onClick={() => dispatch(LogoutFn())}
              className="hover:text-white hover:scale-105 lg:w-[25px] lg:h-[30px] cursor-pointer"
            />
          )}

          {logout ? <Logout /> : ""}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;