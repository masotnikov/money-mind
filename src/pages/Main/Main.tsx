import React, {FC} from "react";
import RenderList from "../../components/RenderList/RenderList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import BalanceWidget from "../../components/BalanceWidget/BalanceWidget";


// @ts-ignore
const Main: FC = () => {

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError
    // @ts-ignore
  } = useGetAllTransactionsQuery();


  if (transactionsLoading) {
    return <Loader/>
  }

  const lastTransactions = transactionsData.slice(-3);

  return (
    <>
      <BalanceWidget/>
      <RenderList emptyMessage="У вас нет транзакций"
                  title="Последние транзакции"
                  renderData={lastTransactions}
                  RenderItemComponent={TransactionItem}
      ></RenderList>
      {transactionsError && <h2 style={{textAlign: 'center'}}>Извините, произошла ошибка</h2>}
    </>

  )
}

export default Main;