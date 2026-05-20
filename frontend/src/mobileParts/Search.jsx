import React, { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { songs } from "../AllSongs/Songs"; // Import your songs data
import { useDispatch } from "react-redux";
import { addSong } from "../features/PlaySlice";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Filter songs based on input
  const filteredSongs = songs.filter(
    (s) =>
      s.song.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  // Spotify category card data
  const categories = [
    { title: "Podcasts", color: "bg-[#E13300]", img:"https://i.pinimg.com/1200x/16/35/1b/16351ba934490e73023c1319c3ba9775.jpg" },
    { title: "Made For You", color: "bg-[#1E3264]", img:"https://i.pinimg.com/736x/c3/bc/5a/c3bc5ac2f808422cc2a1c8c76116bb72.jpg"  },
    { title: "Charts", color: "bg-[#8D67AB]", img:"https://i.pinimg.com/736x/eb/37/4e/eb374eb137ada50c1a1b2eab158d4862.jpg"  },
    { title: "New Releases", color: "bg-[#7358FF]", img:"https://i.pinimg.com/736x/08/a2/ea/08a2eaad99b424d872e9fb3d98cddfa4.jpg"  },
    { title: "Discover", color: "bg-[#E8115B]" , img:"https://i.pinimg.com/736x/9f/d4/b0/9fd4b08cc3c57b51bfce00ad47644cd6.jpg" },
    { title: "Live Events", color: "bg-[#7358FF]", img:"https://i.pinimg.com/736x/87/86/e7/8786e7e2eb6f79b9f0d753434c9d5a3f.jpg"  },
    { title: "Pop", color: "bg-[#148A08]", img:"https://i.pinimg.com/736x/d4/51/69/d45169e489bbf51f7dd58df287ffb983.jpg"  },
    { title: "Hip-Hop", color: "bg-[#BC462B]" , img:"https://i.pinimg.com/736x/6a/41/ee/6a41ee5716e668766ba5a6e183331427.jpg" },
  ];

  return (
    <div className="bg-black min-h-screen w-screen text-white p-4 pb-32 lg:hidden">
      {/* 1. SEARCH BAR (Sticky) */}
      <div className="sticky top-0 z-20 bg-black pb-4 w-full">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <div className="relative group">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-black group-focus-within:text-black" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full bg-white py-3 px-10 rounded-md text-black font-medium focus:outline-none"
          />
          {query && (
            <X 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer" 
              onClick={() => setQuery("")}
            />
          )}
        </div>
      </div>

      {/* 2. CONDITIONAL RENDERING */}
      {!query ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`${cat.color} aspect-square rounded-lg p-4 relative overflow-hidden cursor-pointer hover:brightness-110 transition-all`}
              >
                <h3 className="text-lg font-bold break-words pr-4">{cat.title}</h3>
                {/* Slanted Image effect like Spotify */}
                <div className="absolute -bottom-2 -right-4 w-20 h-20 bg-white/20 rotate-[25deg] shadow-xl"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => dispatch(addSong(song))}
                className="flex items-center gap-3 active:bg-white/10 p-2 rounded-md transition-all"
              >
                <img src={song.image} className="w-15 h-15 rounded object-cover" alt="" />
                <div>
                  <h4 className="font-semibold text-xl">{song.song}</h4>
                  <p className="text-md text-gray-400">{song.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-2xl text-gray-400 mt-10">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;