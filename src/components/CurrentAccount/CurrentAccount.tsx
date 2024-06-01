import cl from "../BalanceWidget/BalanceWidget.module.scss";
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";
import Loader from "../UI/loader/Loader";
import {getTodayDate} from "../../utils/utils";


const CurrentAccount: FC = () => {

  const [replenishBalance] = useAddNewTransactionMutation();
  const {data: balanceAndExpensesData, isLoading: balanceAndExpensesLoading} = useGetBalanceAndExpensesQuery();


  const submitReplenishCurrentAccount = async (transaction: ITransaction) => {
    await replenishBalance(addDefaultTransactionValues(transaction));
  }

  const addDefaultTransactionValues = (transaction: ITransaction): ITransaction => {
    return {
      ...transaction,
      type: "Доход",
      category: "Другое",
      description: "Пополнение счёта",
      date: getTodayDate(),
    }
  }

  if (balanceAndExpensesLoading) {
    return <Loader/>
  }


  return (
    <>
      <h2>Баланс</h2>
      <div className={cl.balanceRow}>{balanceAndExpensesData?.balance ?? 'Баланс недоступен'}
        <ReplenishBalanceForm onSubmit={submitReplenishCurrentAccount}></ReplenishBalanceForm>
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