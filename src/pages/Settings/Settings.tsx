import ThemeToggle, {IThemeToggleProps} from "../../components/ThemeToggle/ThemeToggle";
import {FC} from "react";
import cl from './Settings.module.scss'

const Settings: FC<IThemeToggleProps> = ({theme, setTheme}) => {
  return (
    <div className={cl.root}>
      <ThemeToggle theme={theme} setTheme={setTheme}/>
    </div>
  )
}

export default Settings;