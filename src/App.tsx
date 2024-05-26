import './App.css'
import MenuTabs from "./components/MenuTabs/MenuTabs";
import Main from "./pages/Main/Main";
import {Navigate, Route, Routes} from "react-router-dom";
import Transactions from "./pages/Transactions/Transactions";
import Goals from "./pages/Goals/Goals";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import {useEffect, useState} from "react";

const App = () => {
  const LIGHT_THEME: string = 'light';
  const getThemeFromLocalStorage = () => localStorage.getItem('theme') || LIGHT_THEME;
  const [theme, setTheme] = useState(getThemeFromLocalStorage);

  useEffect(() => {
    document.body.className = theme === LIGHT_THEME ? 'light-theme' : 'dark-theme';
  }, [theme]);


  return (
    <div className='App'>
      <MenuTabs/>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path={'/main'} element={<Main/>}/>
        <Route path={'/details/:idUser'} element={<TransactionDetails />} />
        <Route path={'/transactions'} element={<Transactions/>}/>
        <Route path={'/goals'} element={<Goals/>}/>
        <Route path={'/analytics'} element={<Analytics/>}/>
        <Route path={'/settings'} element={<Settings theme={theme} setTheme={setTheme}/>}/>
      </Routes>
    </div>
  )
}

export default App;