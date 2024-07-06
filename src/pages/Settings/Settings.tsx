import { FC } from "react";
import cl from './Settings.module.scss'
import useTheme from "../../hooks/useTheme";
import MyButton from "../../shared/ui/Button/MyButton";
import { Theme } from "../../redux/theme/types";

const Settings: FC = () => {
  const {theme,toggleTheme} = useTheme()

  return (
    <div className={cl.root}>
        <MyButton onClick={toggleTheme}>сменить тему на {theme === Theme.LIGHT ? 'тёмную' : 'светлую' }</MyButton>
    </div>
  )
}

export default Settings;