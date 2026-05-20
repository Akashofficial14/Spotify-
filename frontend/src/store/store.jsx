import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/AuthSlice'
import songReducer from '../features/PlaySlice'
import filterReducer from '../features/filterSongSlice'
import mobileReducer from '../features/mobileNav'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    song:songReducer,
    filter:filterReducer,
    mobileNav:mobileReducer,
  },
})