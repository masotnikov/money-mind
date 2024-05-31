import React, {FC} from "react";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import BalanceWidget from "../../components/BalanceWidget/BalanceWidget";
import {ITransaction} from "../../@types/types";
import cl from './Main.module.scss'
import TransactionList from "../../components/TransactionList/TransactionList";


const Main: FC = () => {

  const {
    data: transactionsData = [],
    isLoading: transactionsLoading,
    error: transactionsError
  } = useGetAllTransactionsQuery();


  if (transactionsLoading) {
    return <Loader/>
  }
  const SLICE_LAST_TRANSACTIONS: number = -3;
  const lastThreeTransactions: ITransaction[] = transactionsData?.slice(SLICE_LAST_TRANSACTIONS);

  return (
    <div className={cl.root}>
      <BalanceWidget/>
      <TransactionList
        renderList={lastThreeTransactions}
        title={"Последние транзакции"}
        emptyMessage={"У вас нет транзакций"}>
      </TransactionList>
      {transactionsError && <h2 className={cl.errorMessage}>Извините, произошла ошибка</h2>}
    </div>

  )
}

export default Main;