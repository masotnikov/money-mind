import cl from './Main.module.scss'
import {FC} from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";


// @ts-ignore
const Main: FC = () => {
  // @ts-ignore
  const {data: transactionsData, transactionsLoading, error: transactionsError} = useGetAllTransactionsQuery();
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
        <TransactionList title="Последние транзакции" transactions={lastTransactions}></TransactionList>
        {transactionsError && <h2 style={{textAlign: 'center'}}>Извините, произошла ошибка</h2>}
      </div>
    </>

  )
}

export default Main;