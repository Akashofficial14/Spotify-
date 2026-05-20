import React from "react";
import { useSelector } from "react-redux";
import { songs } from "../AllSongs/Songs";

const View = () => {
  let { currentSong, isPlaying } = useSelector((state) => state.song);
  return (
    <div className="view h-full w-full lg:w-[25%] bg-[#121212] p-2 lg:p-3 rounded-xl mr-2 text-white overflow-auto hidden lg:block">
      {currentSong == null ? (
        <div className="look flex flex-col gap-2 lg:gap-3 ">
          <img className="rounded-xl" src={songs[0].image} alt="" />
          <div className="artist bg-[#1F1F1F] p-2 rounded-lg flex flex-col gap-2">
            <img
              className="w-full h-70 object-cover object-top-right rounded-lg"
              src={songs[0].artistImg}
              alt=""
            />
            <div className="a flex justify-between items-center">
              <h3 className="text-lg lg:text-xl font-semibold">{songs[0].artist}</h3>
              <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-base font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
            </div>
            <p  className="text-[#A8A8A8] text-base lg:text-md">{songs[0].aboutArtist}</p>
          </div>
          <div className="supporters w-full bg-[#1F1F1F] rounded-lg p-2 flex flex-col gap-4 lg:gap-4 ">
            <div className="one flex justify-between ">
              <h3 className="text-sm lg:text-lg font-semibold">Credits</h3>
              <h3 className="text-sm lg:text-lg font-semibold">Show All</h3>
            </div>
            <div className="art flex justify-between">
              <div className="one flex flex-col">
                <h3 className="text-sm lg:text-lg font-semibold">{songs[0].artist}</h3>
                <h6  className="text-[#A8A8A8] text-base lg:text-md">Main Singer</h6>
              </div>
              <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-base font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
            </div>
            <div className="art flex justify-between">
            <div className="one flex flex-col">
              <h3 className="text-sm lg:text-lg font-semibold">{songs[0].credits.supporters[0]}</h3>
              <h6 className="text-[#A8A8A8] text-base lg:text-md">Composer</h6>
            </div>
            <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-base font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
          </div>
          <div className="art flex justify-between">
          <div className="one flex flex-col">
            <h3 className="text-sm lg:text-lg font-semibold">{songs[0].credits.supporters[1]}</h3>
            <h6 className="text-[#A8A8A8] text-base lg:text-md">Lyrisict</h6>
          </div>
          <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-lg font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
        </div>
                 </div>
        </div>
      ) : (
        <div className="look flex flex-col gap-2 lg:gap-3 ">
          <img className="rounded-xl" src={currentSong.image} alt="" />
          <div className="artist bg-[#1F1F1F] p-2 rounded-lg flex flex-col gap-2">
            <img
              className="w-full h-70 object-cover object-top-right rounded-lg"
              src={currentSong.artistImg}
              alt=""
            />
            <div className="a flex justify-between items-center">
              <h3 className="text-lg lg:text-xl font-semibold">{currentSong.artist}</h3>
              <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-base font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
            </div>
            <p  className="text-[#A8A8A8] text-base lg:text-md">{currentSong.aboutArtist}</p>
          </div>
          <div className="supporters w-full bg-[#1F1F1F] rounded-lg p-2 flex flex-col gap-4 lg:gap-4 ">
            <div className="one flex justify-between ">
              <h3 className="text-sm lg:text-lg font-semibold">Credits</h3>
              <h3 className="text-sm lg:text-lg font-semibold">Show All</h3>
            </div>
            <div className="art flex justify-between">
              <div className="one flex flex-col">
                <h3 className="text-sm lg:text-lg font-semibold">{currentSong.artist}</h3>
                <h6  className="text-[#A8A8A8] text-base lg:text-md">Main Singer</h6>
              </div>
              <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-base font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
            </div>
            <div className="art flex justify-between">
            <div className="one flex flex-col">
              <h3 className="text-sm lg:text-lg font-semibold">{currentSong.credits.supporters[0]}</h3>
              <h6 className="text-[#A8A8A8] text-base lg:text-md">Composer</h6>
            </div>
            <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-base font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
          </div>
          <div className="art flex justify-between">
          <div className="one flex flex-col">
            <h3 className="text-sm lg:text-lg font-semibold">{currentSong.credits.supporters[1]}</h3>
            <h6 className="text-[#A8A8A8] text-base lg:text-md">Lyrisict</h6>
          </div>
          <h3 className="px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-lg font-semibold bg-[#1F1F1F] border w-16 h-7 lg:w-19 lg:h-9 text-center rounded-full text-white">
            Follow
          </h3>
        </div>
                 </div>
        </div>
      )}
    </div>
  );
};

export default View;
