import React, { FC } from "react";
import cl from './CurrentAccount.module.scss';
import ReplenishForm from "../ReplenishForm/ReplenishForm";
import { useAddNewTransactionMutation, useGetBalanceAndExpensesQuery } from "../../services/TransactionService";
import Loader from "../../shared/ui/Loader/Loader";
import { getTodayDate } from "../../utils/utils";
import { ErrorEnum, TransactionCategory, TransactionDescription, TransactionType } from "../../constants/enums";
import Hr from "../../shared/ui/Hr/hr";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ITransaction } from "../../@types/ITransaction";


const CurrentAccount: FC = () => {

  const [addNewTransaction] = useAddNewTransactionMutation();
  const { data: balanceAndExpensesData, isLoading, error } = useGetBalanceAndExpensesQuery();


  const submitReplenishCurrentAccount = async (transaction: ITransaction) => {
    await addNewTransaction(addDefaultTransactionValues(transaction));
  }

  const addDefaultTransactionValues = (transaction: ITransaction): ITransaction => {
    return {
      ...transaction,
      type: TransactionType.INCOME,
      category: TransactionCategory.OTHER,
      description: TransactionDescription.REPLENISHMENT_CURRENT_ACCOUNT,
      date: getTodayDate(),
    }
  }

  if (isLoading) {
    return <Loader/>
  }

  if (error || !balanceAndExpensesData) {
    return <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>
  }

  return (
    <div className={cl.root}>
      <h2 className={cl.titleAccount}>Баланс</h2>
      <div className={cl.balanceContainer}>
        <span className={cl.balanceCount}>{balanceAndExpensesData?.balance ?? 'Баланс недоступен'}</span>
        <ReplenishForm onSubmit={submitReplenishCurrentAccount}></ReplenishForm>
      </div>
      <Hr/>
      <h2 className={cl.titleAccount}>Расходы</h2>
      <div className={cl.balanceCount}>{balanceAndExpensesData?.expenses ?? 'Расходы недоступны'}</div>
    </div>
  )
}

export default CurrentAccount;