import cl from './Main.module.scss'
import {FC, useEffect, useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import TransactionList from '../../components/TransactionList/TransactionList';
import {ITransaction} from "../../@types/types";

interface MainProp {
  balance: number
}



const Main: FC<MainProp> = ({balance}) => {

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [fetchTransactions, isLoading, transactionError] = useFetching(async () => {

    const data = await PostService.getTransactions();
    setTransactions(data);
  })
  useEffect(() => {
    fetchTransactions();
  }, []);

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
      <TransactionList transactions={transactions}>Последние транзакции</TransactionList>
    </>

  )
}

export default Main;