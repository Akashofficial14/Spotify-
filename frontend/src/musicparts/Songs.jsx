import React, { useEffect, useRef } from "react";
import { songs } from "../AllSongs/Songs";
import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../features/PlaySlice";
import { filterSongArr } from "../features/filterSongSlice";
import { Outlet } from "react-router";
import { CircleUserRound } from "lucide-react";
import { LogoutFn } from "../features/AuthSlice";
import Logout from "../components/Logout";
import { useUserProfile } from "../hooks/user.hooks";

const Songs = () => {
  const songData = songs;
  let dispatch = useDispatch();
  let { fSong, query } = useSelector((state) => state.filter);
  let { logout } = useSelector((state) => state.auth);

  // Fetching user profile info just like the desktop layout
  let { data, isLoading, isError } = useUserProfile();

  let Displaysong = fSong.length > 0 ? fSong : songData;

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="flex fixed top-0 px-3 bg-black py-3 h-14 w-full justify-between items-center gap-2 lg:hidden">
        <div className="child1 flex justify-start gap-2">
          <div className="part1 lg:w-[30%]">
            <div>
              <svg
                viewBox="0 0 168 168"
                className="w-8 h-8 lg:w-10 lg:h-10 fill-white"
              >
                <path d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0zm38.2 121.3c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.6-3 .7-6-1.1-6.7-4.1-.7-3 1.1-6 4.1-6.7 33.7-7.7 63.7-4.3 86.6 9.6 2.6 1.6 3.4 5 1.8 7.6zm10.9-24.2c-2 3.2-6.3 4.2-9.5 2.2-23.8-14.6-60-18.8-88.2-10.2-3.6 1.1-7.4-.9-8.5-4.5-1.1-3.6.9-7.4 4.5-8.5 32.3-9.8 72.4-5.1 100 11.8 3.2 2 4.2 6.3 2.2 9.5zm1-25.2c-28.6-17-75.7-18.6-103-10.3-4.2 1.3-8.7-1.1-10-5.3-1.3-4.2 1.1-8.7 5.3-10 31.4-9.5 83.7-7.7 116.7 12.1 3.8 2.3 5 7.2 2.7 11-2.3 3.8-7.2 5-11 2.7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-md px-4 py-1 bg-green-500 text-white rounded-full ">
            All
          </h3>
          <h3 className="text-md px-4 py-1 bg-gray text-white rounded-full border-2 border-white ">
            Music
          </h3>
          <h3 className="text-md px-4 py-1 bg-gray text-white rounded-full border-2">
            Podcast
          </h3>
        </div>

        {/* Dynamic Avatar Setup - Matches desktop navbar behavior */}
        {!isLoading && !isError && data?.name ? (
          <div
            onClick={() => dispatch(LogoutFn())}
            className="w-[32px] h-[32px] rounded-full bg-[#1ed760] text-black font-bold flex items-center justify-center text-sm select-none cursor-pointer hover:scale-105 transition-all"
            title={`Logged in as ${data.name}`}
          >
            {data.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <CircleUserRound
            size={32}
            onClick={() => dispatch(LogoutFn())}
            className="text-white hover:text-white hover:scale-105 cursor-pointer"
          />
        )}

        {logout ? <Logout /> : ""}
      </div>

      {/* Main Music Grid Section */}
      <div className="container pt-16 pb-2 overflow-auto lg:pt-2 pb-2 lg:w-[50%] bg-[#121212] flex flex-wrap justify-center items-center gap-2 text-white rounded-xl ">
        {query && fSong.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-gray-400 text-base lg:text-xl">
              No results found
            </h1>
          </div>
        ) : (
          Displaysong.map((songs, idx) => {
            return (
              <div
                onClick={() => dispatch(addSong(songs))}
                key={idx}
                className="song h-[30vw] w-[30vw] lg:h-38 lg:w-43 gap-0.5 rounded-lg overflow-hidden p-1 lg:p-2 flex justify-center items-center flex-col hover:bg-[#2d2c2c] "
              >
                <img
                  className="h-8/12 w-full rounded-lg object-cover object-top"
                  src={songs.image}
                  alt=""
                />
                <h3 className="text-sm lg:text-lg font-semibold">
                  {songs.song}
                </h3>
                <h5 className="text-xs lg:text-md ">{songs.artist}</h5>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Songs;