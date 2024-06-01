import cl from "../BalanceWidget/BalanceWidget.module.scss";
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";
import Loader from "../UI/loader/Loader";
import {getTodayDate} from "../../utils/utils";


const SavingsAccount: FC = () => {
  const [replenishSavingAccount] = useAddNewTransactionMutation();
  const {data: balance, isLoading, error: errorBalance} = useGetBalanceAndExpensesQuery();

  const submitReplenishSavingAccount = async (transaction: ITransaction) => {
    await replenishSavingAccount(addDefaultTransactionValues(transaction));
  }

  const addDefaultTransactionValues = (transaction: ITransaction): ITransaction => {
    return {
      ...transaction,
      type: "Расход",
      category: "Другое",
      description: "Перевод на сберегательный счёт",
      date: getTodayDate(),
    }
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
        <ReplenishBalanceForm onSubmit={submitReplenishSavingAccount}></ReplenishBalanceForm>
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