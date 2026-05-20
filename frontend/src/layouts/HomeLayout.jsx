import React from "react";
import Navbar from "../components/Navbar";
import Player from "../musicparts/Player";
import Liked from "../musicparts/Liked";
import Songs from "../musicparts/Songs";
import View from "../musicparts/View";
import Premium from "../mobileParts/Premium";
import SearchNav from "../mobileParts/Search";
import Navmobile from "../components/Navmobile";
import MiniPlayer from "../mobileParts/miniPlayer";
import MaxPlayer from "../mobileParts/maxPlayer";
import { useSelector } from "react-redux";
import Create from "../mobileParts/Create";

const HomeLayout = () => {
  const { activatedTab, closemaxPlayer } = useSelector((state) => state.mobileNav);

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden relative">
      
      {/* 1. DESKTOP VIEW */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="hidden lg:flex h-[74vh] w-full flex-row gap-2">
        <Liked />
        <Songs />
        <View />
      </div>

      {/* 2. MOBILE CONTENT AREA (Always visible in background) */}
      <div className="lg:hidden flex-1 overflow-y-auto pb-32">
        {activatedTab === "home" && <Songs />}
        {activatedTab === "library" && <Liked />}
        {activatedTab === "premium" && <Premium />}
        {activatedTab === "search" && <SearchNav />}
      </div>

      {/* 3. MOBILE NAVIGATION BAR */}
      <Navmobile />

      {/* 4. OVERLAYS (Fixed positioning ensures they sit on top) */}
      {/* Player Overlays */}
      {closemaxPlayer ? <MaxPlayer /> : <MiniPlayer />}
      
      {/* Create Overlay: This will now blur the Home/Search content above */}
      <Create />

      {/* Bottom Music Player Bar */}
      <div className="fixed bottom-20 lg:bottom-0 w-full z-[100]">
        <Player />
      </div>
    </div>
  );
};

export default HomeLayout;