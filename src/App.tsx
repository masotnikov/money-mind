import './App.css'
import MenuTabs from "./components/MenuTabs/MenuTabs";
import Main from "./pages/Main/Main";
import {Route, Routes} from "react-router-dom";
import Transactions from "./pages/Transactions/Transactions";
import Goals from "./pages/Goals/Goals";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";

const App = () => {



  const balance: number = 20000;

  return (
    <div className='App'>
      <MenuTabs/>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/main'} element={<Main/>}/>
        <Route path={'/transactions'} element={<Transactions/>}/>
        <Route path={'/goals'} element={<Goals/>}/>
        <Route path={'/analytics'} element={<Analytics/>}/>
        <Route path={'/settings'} element={<Settings/>}/>
      </Routes>
    </div>
  )
}

export default App;