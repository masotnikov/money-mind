import cl from "../BalanceWidget/BalanceWidget.module.scss";
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import React from "react";
import {ITransaction} from "../../@types/types";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";


const SavingsAccount = () => {
  const [replenishSavingAccount] = useAddNewTransactionMutation();
  // @ts-ignore
  const {data: balance, isLoading} = useGetBalanceAndExpensesQuery();


  const addNewTransaction = async (data: ITransaction) => {
    data.type = "Расход";
    data.category = "Другое";
    data.description = "Перевод на сберегательный счёт";
    data.date = "2024-03-26";
    await replenishSavingAccount(data);
  }


  return (
    <>
      <h2>Накопительный счёт</h2>
      <div className={cl.balanceRow}>{balance?.saving}
        <ReplenishBalanceForm onSubmit={addNewTransaction}></ReplenishBalanceForm>
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