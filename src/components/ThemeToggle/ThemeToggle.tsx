import {FC, useEffect} from "react";
import './ToggleTheme.css'
import MyButton from "../UI/button/MyButton";

export interface IThemeToggleProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const LIGHT_THEME: string = 'light';
const DARK_THEME: string = 'dark';

const ThemeToggle: FC<IThemeToggleProps> = ({theme, setTheme}) => {

  useEffect(() => {
    document.body.className = theme === LIGHT_THEME ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevState => prevState === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  }

  return (
    <div>
      <MyButton onClick={toggleTheme}>Переключить на {theme === LIGHT_THEME ? 'тёмную' : 'светлую'} тему</MyButton>
    </div>
  )
}

export default ThemeToggle;