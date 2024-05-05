import cl from './Main.module.scss'
import React, {FC} from "react";
import RenderList from "../../components/RenderList/RenderList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";
import TransactionItem from "../../components/TransactionItem/TransactionItem";


// @ts-ignore
const Main: FC = () => {
  // @ts-ignore
  const {data: transactionsData, isLoading: transactionsLoading, error: transactionsError} = useGetAllTransactionsQuery();
  // @ts-ignore
  const {data: balanceAndExpensesData, isLoading: balanceAndExpensesLoading} = useGetBalanceAndExpensesQuery();

  if (transactionsLoading || balanceAndExpensesLoading) {
    return <Loader/>
  }

const lastTransactions = transactionsData?.slice(0, 3);


  return (
    <>
      <div className={cl.root}>
        <h2>Текущий баланс</h2>
        <div className={cl.balanceAmount}>{balanceAndExpensesData?.balance ?? 'Баланс недоступен'}</div>
        <hr/>
        <h2>Расходы</h2>
        <div>{balanceAndExpensesData?.expenses ?? 'Расходы недоступны'}</div>
      </div>
      <div>
        <RenderList emptyMessage="У вас нет транзакций"
                    title="Последние транзакции"
                    renderData={lastTransactions}
                    RenderItemComponent={TransactionItem}
        ></RenderList>
        {transactionsError && <h2 style={{textAlign: 'center'}}>Извините, произошла ошибка</h2>}
      </div>
    </>

  )
}

export default Main;