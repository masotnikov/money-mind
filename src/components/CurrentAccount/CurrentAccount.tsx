import cl from "../BalanceWidget/BalanceWidget.module.scss";
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import React from "react";
import {ITransaction} from "../../@types/types";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";
import Loader from "../UI/loader/Loader";


const CurrentAccount = () => {

  const [replenishBalance] = useAddNewTransactionMutation();

  const {data: balanceAndExpensesData, isLoading: balanceAndExpensesLoading} = useGetBalanceAndExpensesQuery();


  const addReplenishTransaction = async (transaction: ITransaction) => {
    transaction.type = "Доход";
    transaction.category = "Другое";
    transaction.description = "Пополнение счёта";
    transaction.date = "2024-03-26";
    await replenishBalance(transaction);
  }

  if (balanceAndExpensesLoading) {
    return <Loader/>
  }


  return (
    <>
      <h2>Баланс</h2>
      <div className={cl.balanceRow}>{balanceAndExpensesData?.balance ?? 'Баланс недоступен'}
        <ReplenishBalanceForm onSubmit={addReplenishTransaction}></ReplenishBalanceForm>
      </div>
      <hr/>
      <h2>Расходы</h2>
      <div>
        <span>{balanceAndExpensesData?.expenses ?? 'Расходы недоступны'}</span>
      </div>
    </>
  )
}

export default CurrentAccount;