import {
  CirclePlus,
  Heart,
  Maximize,
  MicVocal,
  Minimize,
  MonitorSpeaker,
  Pause,
  Play,
  Plus,
  Rows3,
  SkipBackIcon,
  SkipForwardIcon,
  Volume,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, playandpause, updateProgress } from "../features/PlaySlice";
import { songs } from "../AllSongs/Songs";
import { likedSongFn } from "../features/filterSongSlice";
import { toast } from "react-toastify";

const Player = () => {
  // “currentSong bar-bar render ho raha hai, to likedSongFn bar-bar call ho jayega?”
  //aisa nhi hoga kyoki ham ye click par kareg click karne par add hoga
  let { currentSong, isPlaying,currentTime,duration } = useSelector((state) => state.song);
  // console.log(currentTime,duration)
  let { likedSongs } = useSelector((state) => state.filter);
  //  console.log(likedSongs)  yee bar baar kyo chal rha haii isse optimization me koi problem to nhi hai

  //  const handleLikeClick=()=>{
  //  const sortedDup= likedSongs.filter((song)=>(song.id!==currentSong.id))
  //  console.log(sortedDup)
  //   let upArr=[...sortedDup,currentSong]
  //   localStorage.setItem("likedSongs",JSON.stringify(upArr))
  //  return dispatch(likedSongFn(upArr))
  //  }
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
      updatedArr = [...likedSongs, currentSong];
        toast.success("Added to Liked Songs.")
    }

    localStorage.setItem("likedSongs", JSON.stringify(updatedArr));
    dispatch(likedSongFn(updatedArr));
  };

  ///mere bhai s kyo nhi likha hai  -------- LIKEDSONGS
  let dispatch = useDispatch();
  const audioRef = useRef();
  useEffect(() => {
    if (isPlaying && currentSong) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);
  // gana yaha se baj rha hai
  let nextSong;
  const handleBackwardSong = () => {
    if (currentSong.id === 0) {
      nextSong = songs[songs.length - 1];
      dispatch(addSong(nextSong));
      return;
    }
    nextSong = songs[currentSong.id - 1];
    dispatch(addSong(nextSong));
  };
  const handleForwardSong = () => {
    if (currentSong.id + 1 === songs.length) {
      nextSong = songs[0];
      dispatch(addSong(nextSong));
      return; // sirf ye nhi likhne se gaana nhi baj rha tha kal subah logic dekhege
    }
    nextSong = songs[currentSong.id + 1];
    dispatch(addSong(nextSong));
  }; //forward or backward wala song yaha se baj rha hai

  // const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuratiom] = useState(0); 
  //ise globallay set karege taaki saari component me progress bar bana paye
  const handleUpdatetime = () => {
    //  console.log(audioRef.current.currentTime) //ye current time de rha hai in mili second
   dispatch(updateProgress({
    currentTime:audioRef.current.currentTime,
    duration:audioRef.current.duration,
   }))
    //  console.log(audioRef.current.duration)
  };
  function formatTime(time) {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  const handleSeektime = (e) => {
    let newT = e.target.value;
    audioRef.current.currentTime = newT;
    dispatch(updateProgress({
      currentTime:newT
    }))
  };
  return (
    <div className="hidden lg:flex player h-[15vh] w-full text-white justify-between items-center p-2">
      {currentSong ? (
        <div className="playerleft h-full w-full lg:w-[25%] rounded-lg overflow-hidden p-1 lg:p-2 gap-1 lg:gap-2 flex justify-start items-center ">
          <img
            className=" h-12 w-12 lg:h-18 lg:w-28 rounded-lg object-cover object-top"
            src={currentSong?.image}
            alt=""
          />
          <div className="tog flex flex-col">
            <h3 className="text-xs lg:text-lg font-semibold">
              {currentSong?.song}
            </h3>
            <h5 className="text-xs lg:text-md ">{currentSong?.artist}</h5>
          </div>
          <Heart
            size={20}
            className={`cursor-pointer transition ${
              isLiked
                ? "fill-red-500 stroke-red-500"
                : "fill-transparent stroke-white"
            } lg:w-[30px] h-[30px]`}
            onClick={handleLikeClick}
          />{" "}
        </div>
      ) : (
        <div className="playerleft h-full w-full lg:w-[25%] rounded-lg overflow-hidden p-1 lg:p-2 gap-1 lg:gap-2 flex justify-start items-center ">
          <img
            className=" h-12 w-12 lg:h-18 lg:w-28 rounded-lg object-cover object-top"
            src={songs[0]?.image}
            alt=""
          />
          <div className="tog flex flex-col">
            <h3 className="text-xs lg:text-lg font-semibold">
              {songs[0]?.song}
            </h3>
            <h5 className="text-xs lg:text-md ">{songs[0]?.artist}</h5>
          </div>
          <Heart
            size={20}
            className={`cursor-pointer transition ${
              isLiked
                ? "fill-red-500 stroke-red-500"
                : "fill-transparent stroke-white"
            } lg:w-[30px] h-[30px]`}
            onClick={handleLikeClick}
          />{" "}
        </div>
      )}
      <div className="playercenter h-full w-full lg:w-[50%] p-1 lg:p-2 flex flex-col justify-center items-center gap-1 lg:gap-1 ">
        <div className="control flex gap-2 lg:gap-4">
          <SkipBackIcon
            onClick={handleBackwardSong}
            size={35}
            className="p-1 lg:p-2 text-[#C2C2C2] lg:w-[40px] h-[40px]"
          />
          {isPlaying ? (
            <Pause
              onClick={() => dispatch(playandpause())}
              size={35}
              className="p-1 lg:p-2 bg-white text-black rounded-full lg:w-[40px] h-[40px]"
            />
          ) : (
            <Play
              onClick={() => dispatch(playandpause())}
              size={50}
              className="p-1 lg:p-2 bg-white text-black rounded-full lg:w-[40px] h-[40px]"
            />
          )}
          <SkipForwardIcon
            onClick={handleForwardSong}
            size={30}
            className="p-1 lg:p-2 text-[#C2C2C2] lg:w-[40px] h-[40px]"
          />
        </div>
        <div className="tracker flex gap-1 lg:gap-3 items-center justify-center w-full px-2">
          <h3 className="text-base lg:text-md">{formatTime(currentTime)}</h3>
          <div className="outsider h-1 lg:h-2 w-full lg:w-130 bg-white rounded-xl relative">
            {/* <div className="insider absolute h-full bg-green-500 w-[50%] rounded-xl"></div> */}
            {/* apan range ka use kar rhe as a input to track the song currenttime */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              onChange={handleSeektime}
              value={currentTime}
              className="absolute accent-green-500 h-full w-full"
            />
          </div>
          {/* <h3>{currentSong?.duration}</h3> */}
          {/* //ye ek tarika hai ki aap statically duration de do par best approach is to take it from audioRef */}
          <h3 className="text-base lg:text-md">{formatTime(duration)}</h3>
        </div>
      </div>
      <div className="playerright h-full w-full lg:w-[25%] flex justify-center items-center gap-2 lg:gap-2 ">
        <MicVocal size={30} className="text-[#C2C2C2] lg:h-[20px]" />
        <Rows3 size={30} className="text-[#C2C2C2] lg:h-[20px]" />
        <MonitorSpeaker size={30} className="text-[#C2C2C2] lg:h-[20px]" />
        <div className="mic hidden lg:flex justify-center items-center">
          <Volume className="text-[#C2C2C2] " />
          <div className="div h-1 w-25 rounded-lg bg-white"></div>
        </div>
        <Minimize size={30} className="text-[#C2C2C2] lg:h-[20px]" />
        <Maximize size={30} className="text-[#C2C2C2] lg:h-[20px]" />
      </div>
      <div>
        <audio
          src={currentSong?.url}
          ref={audioRef}
          onTimeUpdate={handleUpdatetime}
        ></audio>
      </div>
    </div>
  );
};

export default Player;
