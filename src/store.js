import {configureStore } from '@reduxjs/toolkit'
import MenuReducer from '@/slice/menuSlice'
import toolBoxReducer from '@/slice/toolboxSlice'
import roomReducer from '@/slice/roomSlice'
export const store = configureStore({
    reducer: {
        menu: MenuReducer,
        toolbox: toolBoxReducer,
        room : roomReducer,
    }
  })