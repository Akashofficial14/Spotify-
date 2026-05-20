import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const filterSlice = createSlice({
  name: "filterSong",
  initialState: {
    fSong: [],
    query: "",
    liked: false,
    likedSongs:JSON.parse(localStorage.getItem('likedSongs'))||[],
  },
  reducers: {
    filterSongArr: (state, action) => {
      state.fSong = action.payload.song;
      state.query = action.payload.query;
    },
    clearQuery: (state) => {
      (state.fSong = []), (state.query = "");
    },
    likedFn: (state) => {
      if(state.liked==false){
        state.liked=true
        return
      }
     state.liked=false
    },
    likedSongFn:(state,action)=>{
          state.likedSongs=action.payload
    }
  }
});

export const { filterSongArr, clearQuery,likedFn ,likedSongFn, } = filterSlice.actions;
export default filterSlice.reducer;
