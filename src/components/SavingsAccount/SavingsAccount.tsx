import cl from "../BalanceWidget/BalanceWidget.module.scss";
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import React from "react";
import {ITransaction} from "../../@types/types";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";
import Loader from "../UI/loader/Loader";


const SavingsAccount = () => {
  const [replenishSavingAccount] = useAddNewTransactionMutation();
  const {data: balance, isLoading, error: errorBalance} = useGetBalanceAndExpensesQuery();


  const today: string = new Date().toISOString().split('T')[0];
  console.log(today);
  const addDefaultValue = (data: ITransaction): ITransaction => {
    return {
      ...data,
      type: "Расход",
      category: "Другое",
      description: "Перевод на сберегательный счёт",
      date: today,
    }
  }

  const submitReplenishForm = async (data: ITransaction) => {

    await replenishSavingAccount(addDefaultValue(data));
  }

  if (isLoading) {
    return <Loader/>
  }
  if (errorBalance) {
    return <h1>Извините, произошла ошибка!</h1>
  }


  return (
    <>
      <h2>Накопительный счёт</h2>
      <div className={cl.balanceRow}>{balance?.saving}
        <ReplenishBalanceForm onSubmit={submitReplenishForm}></ReplenishBalanceForm>
      </div>
      <hr/>
      <h2>Баланс</h2>
      <div>
        <span>{balance?.balance}</span>
      </div>
    </>

  )
}

export default SavingsAccount;