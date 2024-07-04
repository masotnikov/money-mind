import React, {FC} from "react";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../services/TransactionService";
import BalanceWidget from "../../components/BalanceWidget/BalanceWidget";
import cl from './Main.module.scss'
import TransactionList from "../../components/TransactionList/TransactionList";
import {ErrorEnum} from "../../constants/enums";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {ITransaction} from "../../@types/ITransaction";


const Main: FC = () => {

  const {
    data: transactionsData = [],
    isLoading,
    error: transactionsError
  } = useGetAllTransactionsQuery({});


  if (isLoading) {
    return <Loader/>
  }

  if (transactionsError || !transactionsData) {
    return <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>
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
      {transactionsError && <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>}
    </div>

  )
}

export default Main;