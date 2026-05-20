import React from "react";
import { songs } from "../AllSongs/Songs";
import { EllipsisVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../features/PlaySlice";

const LikedSongView = () => {
  let { likedSongs } = useSelector((state) => state.filter);
    let { currentSong, isPlaying } = useSelector((state) => state.song);
    let dispatch=useDispatch()
//agar bole dispatch ke time ki currentSong is not a function it is just beacuse of it show ki currentsong konsa hai 
// song ko set karne ke liye to addSong banaya hai na ki current song
  return (
    <>
    <div className="liked w-full overflow-auto flex flex-col gap-4 lg:gap-2 py-1">
      {likedSongs.map((elem,idx) => {
        return (
          <div key={idx} onClick={()=>dispatch(addSong(elem))} className="playerleft lg:w-full rounded-lg p-1 flex justify-between items-center hover:bg-[#2d2c2c] ">
            <div className="one flex justify-start items-center gap-4 lg:gap-3">
              <img className="h-15 w-15 lg:h-15 w-25 rounded-lg object-cover object-top" src={elem?.image} alt="" />
              <div className="tog flex flex-col">
                <h3 className="text-xl lg:text-md font-semibold">{elem?.song}</h3>
                <h5 className="text-lg lg:text-sm ">{elem?.artist}</h5>
              </div>
            </div>
            <EllipsisVertical size={18} className="lg:w-[20px] h-[20px]" />
          </div>
        );
      })}
      </div>
    </>
  );
};

export default LikedSongView;
