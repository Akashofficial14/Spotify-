import { House, Library, LibraryBig, Plus, Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFn, homeFn, libraryFn, premiumFn, searchFn } from "../features/mobileNav";

const Navmobile = () => {
  let { activatedTab,createOpen} = useSelector((state) => state.mobileNav);
  let dispatch = useDispatch();
  // console.log(activatedTab);
  return (
    <>
      <div className="flex justify-between items-center gap-2 px-5 fixed z-100 bottom-0 left-0 h-16 bg-black/80 text-white w-full  lg:hidden">
        <h3
          onClick={() => {
            dispatch(homeFn());
          }}
          className="text-sm flex flex-col justify-center items-center gap-1"
        >
          <House size={25} className="fill-transparent stroke-white" /> Home
        </h3>
        <h3 
        onClick={()=>{dispatch(searchFn())}}
        className="text-sm flex flex-col justify-center items-center gap-1 ">
          <Search size={25} className="lg:p-3 text-white " /> Search
        </h3>
        <h3
          onClick={() => {
            dispatch(libraryFn());
          }}
          className="text-sm flex flex-col justify-center items-center gap-1 "
        >
          <LibraryBig size={25} className="lg:p-3 text-white " />
          Library
        </h3>
        <h3 
                  onClick={() => {
            dispatch(premiumFn());
          }} className="text-sm flex flex-col justify-center items-center gap-1 ">
          <div className="part1 w-full lg:w-[30%] flex flex-col justify-center items-center">
            <div className="flex justify-start items-center">
              <svg
                viewBox="0 0 168 168"
                className="w-5 h-6 lg:w-10 lg:h-10 fill-white"
              >
                <path d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0zm38.2 121.3c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.6-3 .7-6-1.1-6.7-4.1-.7-3 1.1-6 4.1-6.7 33.7-7.7 63.7-4.3 86.6 9.6 2.6 1.6 3.4 5 1.8 7.6zm10.9-24.2c-2 3.2-6.3 4.2-9.5 2.2-23.8-14.6-60-18.8-88.2-10.2-3.6 1.1-7.4-.9-8.5-4.5-1.1-3.6.9-7.4 4.5-8.5 32.3-9.8 72.4-5.1 100 11.8 3.2 2 4.2 6.3 2.2 9.5zm1-25.2c-28.6-17-75.7-18.6-103-10.3-4.2 1.3-8.7-1.1-10-5.3-1.3-4.2 1.1-8.7 5.3-10 31.4-9.5 83.7-7.7 116.7 12.1 3.8 2.3 5 7.2 2.7 11-2.3 3.8-7.2 5-11 2.7z" />
              </svg>
            </div>
          </div>
          Premium
        </h3>
        <h3
          onClick={() => {
            dispatch(createFn());
          }}
          className="text-sm flex flex-col justify-center items-center gap-1"
        >
          <Plus className=" rounded-full " size={25} />
          Create
        </h3>
      </div>
    </>
  );
};

export default Navmobile;
