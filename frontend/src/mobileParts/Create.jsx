import React from "react";
import { Blend, Music, UsersRound } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { closeCreateFn } from "../features/mobileNav";

const Create = () => {
  const { createOpen } = useSelector((state) => state.mobileNav);
  const dispatch = useDispatch();

  if (!createOpen) return null;

  return (
    /* FIXED: Changed bg-red to bg-black/40 and increased blur to md */
    <div 
      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md lg:hidden flex flex-col justify-end"
      onClick={() => dispatch(closeCreateFn())} 
    >
      
      {/* THE CONTENT CARD */}
      <div 
        className="w-full bg-[#121212] rounded-t-3xl p-6 pb-12 flex flex-col gap-8 text-white animate-in slide-in-from-bottom duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="w-12 h-1 bg-gray-600 rounded-full self-center mb-2" />

        <div className="flex items-center gap-5 active:scale-95 transition-transform cursor-pointer">
          <div className="bg-[#282828] p-4 rounded-full">
            <Music size={28} className="text-gray-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Playlist</h3>
            <p className="text-sm text-gray-400">Create a playlist with songs or episodes</p>
          </div>
        </div>

        <div className="flex items-center gap-5 active:scale-95 transition-transform cursor-pointer">
          <div className="bg-[#282828] p-4 rounded-full">
            <UsersRound size={28} className="text-gray-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Collaborative Playlist</h3>
            <p className="text-sm text-gray-400">Create a playlist together with friends</p>
          </div>
        </div>

        <div className="flex items-center gap-5 active:scale-95 transition-transform cursor-pointer">
          <div className="bg-[#282828] p-4 rounded-full">
            <Blend size={28} className="text-gray-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Blend</h3>
            <p className="text-sm text-gray-400">Combine tastes with friends</p>
          </div>
        </div>

        <button 
          onClick={() => dispatch(closeCreateFn())}
          className="mt-4 text-center text-gray-400 font-semibold text-lg active:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Create;