import './App.css'
import MenuTabs from "./components/MenuTabs/MenuTabs";
import Main from "./pages/Main/Main";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import Goals from "./pages/Goals/Goals";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import TransactionDetailsById from "./components/TransactionDetailsById/TransactionDetailsById";
import {useEffect, useState} from "react";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {
  const LIGHT_THEME: string = 'light';
  const getThemeFromLocalStorage = () => localStorage.getItem('theme') || LIGHT_THEME;
  const [theme, setTheme] = useState(getThemeFromLocalStorage);

  useEffect(() => {
    document.body.className = theme === LIGHT_THEME ? 'light-theme' : 'dark-theme';
  }, [theme]);


  return (
    <div className='App'>
      <HashRouter>
        <MenuTabs/>
        <Routes>
          <Route path="/" element={<Navigate to="/main"/>}/>
          <Route path={'/main'} element={<Main/>}/>
          <Route path={'/details/:idUser'} element={<TransactionDetailsById/>}/>
          <Route path={'/transactions'} element={<TransactionsPage/>}/>
          <Route path={'/goals'} element={<Goals/>}/>
          <Route path={'/analytics'} element={<Analytics/>}/>
          <Route path={'/settings'} element={<Settings theme={theme} setTheme={setTheme}/>}/>
          <Route path={"*"} element={<ErrorPage/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;