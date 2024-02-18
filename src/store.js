import {configureStore } from '@reduxjs/toolkit'
import MenuReducer from '@/slice/menuSlice'
import toolBoxReducer from '@/slice/toolBoxSlice'

export const store = configureStore({
    reducer: {
        menu: MenuReducer,
        toolbox: toolBoxReducer,
    }
  })