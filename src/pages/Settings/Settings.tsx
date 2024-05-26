import ThemeToggle, {IThemeToggleProps} from "../../components/ThemeToggle/ThemeToggle";
import {FC} from "react";


const Settings: FC<IThemeToggleProps> = ({theme, setTheme}) => {
  return (
    <>
      <h2>Настройки</h2>
      <ThemeToggle theme={theme} setTheme={setTheme}/>
    </>
  )
}

export default Settings;