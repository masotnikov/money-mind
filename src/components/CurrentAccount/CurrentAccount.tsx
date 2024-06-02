import cl from "../BalanceWidget/BalanceWidget.module.scss";
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";
import Loader from "../UI/loader/Loader";
import {getTodayDate} from "../../utils/utils";
import {ErrorEnum, TransactionCategory, TransactionDescription, TransactionType} from "../../constants/enums";
import Hr from "../UI/hr/hr";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const CurrentAccount: FC = () => {

  const [replenishBalance] = useAddNewTransactionMutation();
  const {data: balanceAndExpensesData, isLoading, error} = useGetBalanceAndExpensesQuery();


  const submitReplenishCurrentAccount = async (transaction: ITransaction) => {
    await replenishBalance(addDefaultTransactionValues(transaction));
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
    <>
      <h2>Баланс</h2>
      <div className={cl.balanceRow}>{balanceAndExpensesData?.balance ?? 'Баланс недоступен'}
        <ReplenishBalanceForm onSubmit={submitReplenishCurrentAccount}></ReplenishBalanceForm>
      </div>
      <Hr/>
      <h2>Расходы</h2>
      <div>{balanceAndExpensesData?.expenses ?? 'Расходы недоступны'}</div>
    </>
  )
}

export default CurrentAccount;