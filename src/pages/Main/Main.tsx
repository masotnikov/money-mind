import cl from './Main.module.scss'
import {FC} from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
// import data from "../../../db.json";

interface MainProp {
  balance: number
}

// const transactions: any = data;

const Main: FC<MainProp> = ({balance}) => {
  return (

    <>
      <div className={cl.root}>
        <h2>Текущий баланс</h2>
        <div className={cl.balanceAmount}>{balance}</div>
        <hr/>
        <h2>Расходы</h2>
        <div>8000</div>

      </div>
      <div>
      </div>
      {/*<TransactionList transactions={transactions}>Последние транзакции</TransactionList>*/}
    </>

  )
}

export default Main;