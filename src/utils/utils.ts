import {IBalanceAndExpenses, ITransaction} from "../@types/types";
import {TransactionDescription, TransactionType} from "../constants/enums";

export const convertToEuropeanFormat = (date: string) => {
  return date.split('-').reverse().join('-')
};

export const getTodayDate = () : string => new Date().toISOString().split('T')[0];

export const balanceProcessing = (transactions: ITransaction[]) : IBalanceAndExpenses => {
  let income: number = 0;
  let balance: number = 0;
  let expenses: number = 0;
  let saving: number = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transaction: ITransaction = transactions[i];
    if (transaction.type === TransactionType.EXPENSE) {
      expenses += transaction.amount
    }
    if (transaction.description === TransactionDescription.REPLENISHMENT_SAVING_ACCOUNT) {
      saving += transaction.amount
    }
    if (transaction.type === TransactionType.INCOME) {
      balance += transaction.amount;
      income += transaction.amount
    } else {
      balance -= transaction.amount;
    }
  }

  return {balance, expenses, saving, income} ;
}

