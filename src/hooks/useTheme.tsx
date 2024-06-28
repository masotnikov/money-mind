import { Theme } from "../redux/theme/types";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { LOCAL_STORAGE_THEME_KEY, setTheme } from "../redux/theme/slice";
import { useEffect } from "react";


interface useThemeResult {
  theme: Theme;
  toggleTheme: () => void
}

export const useTheme = (): useThemeResult => {
  const dispatch = useAppDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    dispatch(setTheme(newTheme));
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }

  return { theme, toggleTheme }
}

export default useTheme;