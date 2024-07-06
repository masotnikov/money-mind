import React, {FC} from "react";
import ReplenishForm from "../ReplenishForm/ReplenishForm";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../services/TransactionService";
import Loader from "../../shared/ui/Loader/Loader";
import {getTodayDate} from "../../utils/utils";
import {ErrorEnum, TransactionCategory, TransactionDescription, TransactionType} from "../../constants/enums";
import Hr from "../../shared/ui/Hr/hr";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import cl from './SavingsAccount.module.scss'
import {ITransaction} from "../../@types/ITransaction";


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
    <div className={cl.root}>
      <h2 className={cl.titleAccount}>Накопительный счёт</h2>
      <div className={cl.balanceContainer}>
        <span className={cl.balanceCount}>{balance?.saving}</span>
        <ReplenishForm onSubmit={submitReplenishSavingAccount}></ReplenishForm>
      </div>
      <Hr/>
      <h2 className={cl.titleAccount}>Баланс</h2>
      <span className={cl.balanceCount}>{balance?.balance}</span>
    </div>

  )
}

export default SavingsAccount;