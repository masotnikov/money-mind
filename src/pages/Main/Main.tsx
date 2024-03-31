import cl from './Main.module.scss'
import {FC, useEffect, useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import TransactionService from "../../API/TransactionService";
import TransactionList from '../../components/TransactionList/TransactionList';
import {ITransaction} from "../../@types/types";
import Loader from "../../components/UI/Loader/Loader";


const Main: FC = () => {

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [limit, setLimit] = useState<number>(3);
  const [balance, setBalance] = useState<number>(0);
  const [fetchTransactions, isLoading, transactionError] = useFetching(async () => {

    const data = await TransactionService.getLastTransactions(limit);
    setTransactions(data.reverse());
  })
  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      const data = await TransactionService.getCurrentBalance();
      setBalance(data);
    };
    fetchBalance();
  }, []);

  if (isLoading) {
    return <Loader/>
  }

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
      {transactionError && <h1 style={{textAlign: "center"}}>Произошла ошибка</h1>}
      <TransactionList transactions={transactions}>Последние транзакции</TransactionList>
    </>

  )
}

export default Main;