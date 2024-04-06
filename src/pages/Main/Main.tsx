import cl from './Main.module.scss'
import {FC} from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/Loader/Loader";
import {useGetCurrentBalanceQuery, useGetLastTransactionsQuery} from "../../API/TransactionService";


// @ts-ignore
const Main: FC = () => {
  // const balance = 20000
 // @ts-ignore
  const {data: transactions, isLoading, error} = useGetLastTransactionsQuery();
  // @ts-ignore
  const {data: balance} = useGetCurrentBalanceQuery();
 //
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
        <TransactionList transactions={transactions}>Последние транзакции</TransactionList>
        {error && <h2 style={{textAlign: 'center'}}>Извините, произошла ошибка</h2>}
      </div>
    </>

  )
}

export default Main;