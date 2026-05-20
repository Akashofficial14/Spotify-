import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronDown,
  MoreHorizontal,
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Share2,
  ListMusic,
} from "lucide-react";
import { addSong, playandpause } from "../features/PlaySlice";
import { songs } from "../AllSongs/Songs";
import { likedSongFn } from "../features/filterSongSlice";
import { closeMaxFn } from "../features/mobileNav";
import { toast } from "react-toastify";

const MaxPlayer = () => {
  const { likedSongs } = useSelector((state) => state.filter);
  const { currentSong, isPlaying, currentTime, duration } = useSelector(
    (state) => state.song
  );
  let dispatch = useDispatch();

  const isLiked = likedSongs.some((song) => song.id === currentSong?.id);

  const handleLikeClick = () => {
    if (!currentSong) return;
    let updatedArr;
    if (isLiked) {
      updatedArr = likedSongs.filter((song) => song.id !== currentSong.id);
                   toast.success("Removed from Liked Songs.")
    } else {
       toast.success("Added to Liked Songs.")
      updatedArr = [...likedSongs, currentSong];
    }
    localStorage.setItem("likedSongs", JSON.stringify(updatedArr));
    dispatch(likedSongFn(updatedArr));
  };

  const handleBackwardSong = () => {
    let nextSong;
    if (currentSong.id === 0) {
      nextSong = songs[songs.length - 1];
    } else {
      nextSong = songs[currentSong.id - 1];
    }
    dispatch(addSong(nextSong));
  };

  const handleForwardSong = () => {
    let nextSong;
    if (currentSong.id + 1 === songs.length) {
      nextSong = songs[0];
    } else {
      nextSong = songs[currentSong.id + 1];
    }
    dispatch(addSong(nextSong));
  };

  const onClose = () => {
    dispatch(closeMaxFn());
  };

  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const handleSeektime = (e) => {
    let newT = e.target.value;
    const masterAudio = document.querySelector("audio");
    if (masterAudio) {
      masterAudio.currentTime = newT;
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#535353] to-[#121212] flex flex-col px-8 py-6 text-white lg:hidden transition-all duration-500 animate-in slide-in-from-bottom">
      
      {/* HEADER: Close button, Artist info, and Menu */}
      <div className="flex justify-between items-center w-full mb-8">
        <button onClick={onClose} className="p-1">
          <ChevronDown size={32} strokeWidth={1.5} />
        </button>
        <div className="text-center overflow-hidden">
          <p className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold mb-0.5">
            Playing from artist
          </p>
          <h4 className="text-xs font-bold truncate px-4">{currentSong.artist}</h4>
        </div>
        <button className="p-1">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* ALBUM ART: Large, centered with subtle shadow */}
      <div className="flex-1 flex items-center justify-center w-full mb-8">
        <div className="w-full aspect-square max-w-[340px] shadow-2xl rounded-lg overflow-hidden">
          <img
            src={currentSong.image}
            alt={currentSong.song}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* SONG DETAILS: Bold Title and Artist with Like button */}
      <div className="flex justify-between items-center w-full mb-6">
        <div className="flex flex-col gap-1 overflow-hidden">
          <h2 className="text-2xl font-bold truncate leading-tight">
            {currentSong.song}
          </h2>
          <p className="text-lg text-gray-400 font-medium truncate">
            {currentSong.artist}
          </p>
        </div>
        <button onClick={handleLikeClick} className="ml-4 transition-transform active:scale-125">
          <Heart
            size={28}
            className={`${
              isLiked ? "fill-[#1DB954] text-[#1DB954]" : "text-white opacity-70"
            }`}
          />
        </button>
      </div>

      {/* PROGRESS SECTION: Spotify-style slider and time labels */}
      <div className="w-full mb-8">
        <div className="relative w-full h-1.5 bg-white/20 rounded-full flex items-center group">
          {/* Visual Progress Bar (the green part) */}
          <div 
            className="absolute top-0 left-0 h-full bg-white rounded-full group-hover:bg-[#1DB954]" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            onChange={handleSeektime}
            value={currentTime}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
        <div className="flex justify-between mt-2 text-[11px] font-medium text-gray-400 tracking-tighter">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* PLAYBACK CONTROLS: Shuffle, Back, Play/Pause, Next, Repeat */}
      <div className="flex justify-between items-center w-full mb-10 px-1">
        <Shuffle size={22} className="text-[#1DB954]" />
        
        <button onClick={handleBackwardSong}>
          <SkipBack size={36} className="fill-current" />
        </button>
        
        <button 
          onClick={() => dispatch(playandpause())} 
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black transition-transform active:scale-90"
        >
          {isPlaying ? (
            <Pause size={32} className="fill-current" />
          ) : (
            <Play size={32} className="fill-current ml-1" />
          )}
        </button>
        
        <button onClick={handleForwardSong}>
          <SkipForward size={36} className="fill-current" />
        </button>
        
        <Repeat size={22} className="text-white/60" />
      </div>

      {/* BOTTOM ACTION BAR: Device picker and Queue */}
      <div className="flex justify-between items-center w-full text-gray-400">
        <button>
          <Share2 size={20} />
        </button>
        <button>
          <ListMusic size={22} />
        </button>
      </div>

    </div>
  );
};

export default MaxPlayer;