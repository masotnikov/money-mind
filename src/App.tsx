import './App.css'
import MenuTabs from "./components/MenuTabs/MenuTabs";
import Main from "./pages/Main/Main";
import {Route, Routes} from "react-router-dom";
import Transactions from "./pages/Transactions/Transactions";
import Goals from "./pages/Goals/Goals";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
// @ts-ignore

const App = () => {

  fetch(`http://localhost:3000/transactions`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка при выполнении запроса:', error));


  const balance: number = 20000;

  return (
    <div className='App'>
      <MenuTabs/>
      <Routes>
        <Route path={'/'} element={<Main balance={balance}/>}/>
        <Route path={'/main'} element={<Main balance={balance}/>}/>
        <Route path={'/transactions'} element={<Transactions/>}/>
        <Route path={'/goals'} element={<Goals/>}/>
        <Route path={'/analytics'} element={<Analytics/>}/>
        <Route path={'/settings'} element={<Settings/>}/>
      </Routes>
    </div>
  )
}

export default App;