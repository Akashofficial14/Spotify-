import { createSlice } from "@reduxjs/toolkit";
import reducer from "./filterSongSlice";

const mobileSlice = createSlice({
  name: "navmobile",
  initialState: {
    activatedTab: "home",
    closemaxPlayer: false,
    createOpen:false,
  },
  reducers: {
    homeFn: (state) => {
      state.activatedTab = "home";
    },
    libraryFn: (state) => {
      state.activatedTab = "library";
    },
        premiumFn: (state) => {
      state.activatedTab = "premium";
    },
     searchFn: (state) => {
      state.activatedTab = "search";
    },
    createFn:(state)=>{
      state.activatedTab="create";
            if (state.createOpen == false) {
        state.createOpen = true;
        return;
      }
      state.createOpen = false;
    },
    closeCreateFn: (state) => {
      state.createOpen = false;
    },
    closeMaxFn: (state) => {
      if (state.closemaxPlayer == false) {
        state.closemaxPlayer = true;
        return;
      }
      state.closemaxPlayer = false;
    },
  },
});
export const { homeFn, libraryFn,closeMaxFn,createFn,premiumFn,searchFn,closeCreateFn } = mobileSlice.actions;
export default mobileSlice.reducer;
