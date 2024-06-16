import cl from './CurrentAccount.module.scss';
import ReplenishBalanceForm from "../ReplenishBalanceForm/ReplenishBalanceForm";
import React, {FC} from "react";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../services/TransactionService";
import Loader from "../UI/loader/Loader";
import {getTodayDate} from "../../utils/utils";
import {ErrorEnum, TransactionCategory, TransactionDescription, TransactionType} from "../../constants/enums";
import Hr from "../UI/hr/hr";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {ITransaction} from "../../@types/ITransaction";


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
    <div className={cl.root}>
      <h2 className={cl.titleAccount}>Баланс</h2>
      <div className={cl.balanceContainer}>
        <span className={cl.balanceCount}>{balanceAndExpensesData?.balance ?? 'Баланс недоступен'}</span>
        <ReplenishBalanceForm onSubmit={submitReplenishCurrentAccount}></ReplenishBalanceForm>
      </div>
      <Hr/>
      <h2 className={cl.titleAccount}>Расходы</h2>
      <div className={cl.balanceCount}>{balanceAndExpensesData?.expenses ?? 'Расходы недоступны'}</div>
    </div>
  )
}

export default CurrentAccount;