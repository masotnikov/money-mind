import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "./types";

export const LOCAL_STORAGE_THEME_KEY = 'theme'


const defaultTheme: Theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme  || Theme.LIGHT;

const initialState = {
  theme: defaultTheme
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
        state.theme = action.payload
    },
  }

})
export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer