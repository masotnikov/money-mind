import './styles/index.scss'
import MenuTabs from "./components/MenuTabs/MenuTabs";
import Main from "./pages/Main/Main";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import Goals from "./pages/Goals/Goals";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import TransactionDetailsById from "./components/TransactionDetailsById/TransactionDetailsById";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {

  return (
    <div className='app'>
      <HashRouter>
        <MenuTabs/>
        <Routes>
          <Route path="/" element={<Navigate to="/main"/>}/>
          <Route path={'/main'} element={<Main/>}/>
          <Route path={'/details/:idUser'} element={<TransactionDetailsById/>}/>
          <Route path={'/transactions'} element={<TransactionsPage/>}/>
          <Route path={'/goals'} element={<Goals/>}/>
          <Route path={'/analytics'} element={<Analytics/>}/>
          <Route path={'/settings'} element={<Settings/>}/>
          <Route path={"*"} element={<ErrorPage/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;