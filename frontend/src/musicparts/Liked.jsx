import {
  Heart,
  Maximize2,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import React from "react";
import { likedFn } from "../features/filterSongSlice";
import { useDispatch, useSelector } from "react-redux";
import LikedSongView from "../components/LikedSongView";

const Liked = () => {
  const { liked } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
<div
  className="flex flex-col gap-3 w-screen h-screen bg-[#121212] text-white p-6 
             lg:w-[25%] lg:h-[74vh] lg:bg-[#121212] rounded-xl ml-2 "
>
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl lg:text-2xl font-semibold">Your Library</h3>

        <div className=" flex gap-4  items-center lg:flex items-center gap-3">
          <Plus className="p-1.5 lg:p-2 bg-[#282828] rounded-full" size={32} />
          <Maximize2 size={22} />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 items-center">
        <h3 className="text-lg px-4 py-2 lg:text-lg font-semibold bg-[#282828] px-3 py-1 rounded-full">
          Playlist
        </h3>
        <h3 className="text-lg px-4 py-2 lg:text-lg font-semibold bg-[#282828] px-3 py-1 rounded-full">
          Artist
        </h3>
      </div>

      {/* SEARCH */}
      <div className="flex justify-between items-center">
        <Search size={22} />

        <div className="flex items-center gap-2 lg:gap-3">
          <h4 className="text-lg lg:text-sm">Recent</h4>
          <SlidersHorizontal size={22} />
        </div>
      </div>

      {/* LIKED SONG */}
      <div
        onClick={() => dispatch(likedFn())}
        className="
          flex items-center gap-2
          text-xl lg:text-lg
          bg-[#282828] py-2 px-2
          rounded-xl
          cursor-pointer
        "
      >
        {/* <Heart className=" fill-red-500 stroke-red-500" size={35} />
         */}
         <img className="w-9 rounded-sm" src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg" alt="" />
        Liked Song
      </div>

      {liked && <LikedSongView />}
    </div>
  );
};

export default Liked;
