import React, {FC} from "react";
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import {ITransaction} from "../../@types/types";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../services/TransactionService";
import Loader from "../UI/loader/Loader";
import {getTodayDate} from "../../utils/utils";
import {TransactionCategory, TransactionDescription, TransactionType, ErrorEnum} from "../../constants/enums";
import cl from "../BalanceWidget/BalanceWidget.module.scss";
import Hr from "../UI/hr/hr";
import ErrorMessage from "../ErrorMessage/ErrorMessage";



const SavingsAccount: FC = () => {
  const [replenishSavingAccount] = useAddNewTransactionMutation();
  const {data: balance, isLoading, error: errorBalance} = useGetBalanceAndExpensesQuery();

  const submitReplenishSavingAccount = async (transaction: ITransaction) => {
    await replenishSavingAccount(addDefaultTransactionValues(transaction));
  }

  const addDefaultTransactionValues = (transaction: ITransaction): ITransaction => {
    return {
      ...transaction,
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      description: TransactionDescription.REPLENISHMENT_SAVING_ACCOUNT,
      date: getTodayDate(),
    }
  }

  if (isLoading) {
    return <Loader/>
  }

  if (errorBalance || !balance) {
    return <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>;
  }

  return (
    <>
      <h2>Накопительный счёт</h2>
      <div className={cl.balanceRow}>
        {balance?.saving}
        <ReplenishBalanceForm onSubmit={submitReplenishSavingAccount}></ReplenishBalanceForm>
      </div>
      <Hr/>
      <h2>Баланс</h2>
      <div>{balance?.balance}</div>
    </>

  )
}

export default SavingsAccount;