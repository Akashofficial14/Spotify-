import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Play,
  Pause,
  SkipForward,
  SkipBackIcon,
  SkipForwardIcon,
  Heart,
} from "lucide-react";
import { addSong, playandpause } from "../features/PlaySlice";
import { songs } from "../AllSongs/Songs";
import { likedSongFn } from "../features/filterSongSlice";
import { useRef } from "react";
import { closeMaxFn } from "../features/mobileNav";
import { toast } from "react-toastify";
// Import your play/pause toggle action from your slice
// import { togglePlay } from "../features/PlaySlice";

const MiniPlayer = () => {
  const { currentSong, isPlaying } = useSelector((state) => state.song);
  const { likedSongs, liked } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
    const{closemaxPlayer}=useSelector((state)=>(state.mobileNav))
    // console.log(closemaxPlayer)
  const isLiked = likedSongs.some((song) => song.id === currentSong?.id);
  const handleLikeClick = () => {
    if (!currentSong) return;

    let updatedArr;
    if (isLiked) {
      // unlike
      updatedArr = likedSongs.filter((song) => song.id !== currentSong.id);
                   toast.success("Removed from Liked Songs.")
    } else {
      // like
      toast.success("Added to Liked Songs.")
      updatedArr = [...likedSongs, currentSong];
    }
    localStorage.setItem("likedSongs", JSON.stringify(updatedArr));
    dispatch(likedSongFn(updatedArr));
  };

  if (!currentSong) return null; // Don't show if no song is selected

  return (
    <div className="fixed bottom-16 left-2 right-2 bg-[#7B080C] h-14 rounded-md flex items-center justify-between px-3 shadow-2xl lg:hidden z-50">
      {/* Song Info */}
      <div onClick={()=>dispatch(closeMaxFn())} className="flex items-center gap-3 overflow-hidden">
        <img
          src={currentSong.image}
          className="h-11 w-11 rounded object-cover"
        />
        <div className="flex flex-col">
          <h4 className="text-white text-md font-bold truncate w-32">
            {currentSong.song}
          </h4>
          <p className="text-white text-sm text-[10px] truncate w-32">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Heart
          size={20}
          className={`cursor-pointer transition-transform active:scale-125 ${
            isLiked
              ? "fill-[#1DB954] stroke-[#1DB954]"
              : "fill-transparent stroke-white"
          } h-[30px] w-[30px] lg:w-[30px] h-[30px]`}
          onClick={handleLikeClick}
        />{" "}
        <button
          onClick={() => {
            /* dispatch(togglePlay()) */
          }}
        >
          {isPlaying ? (
            <Pause
              onClick={() => {
                dispatch(playandpause());
              }}
              size={24}
              className="text-white fill-white"
            />
          ) : (
            <Play
              onClick={() => {
                dispatch(playandpause());
              }}
              size={24}
              className="text-white fill-white"
            />
          )}
        </button>
      </div>

      {/* Tiny Progress Bar at the bottom of the miniplayer */}
    </div>
  );
};

export default MiniPlayer;
