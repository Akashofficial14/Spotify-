import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "song",
  initialState: {
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  },
  reducers: {
    addSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    playandpause: (state) => {
      if (state.isPlaying) {
        state.isPlaying = false;
        return;
      }
      state.isPlaying = true;
    },
    updateProgress: (state, action) => {
      state.currentTime = action.payload.currentTime;
      state.duration = action.payload.duration;
    },
  },
});
export const { addSong, playandpause,updateProgress} = songSlice.actions;
export default songSlice.reducer;
