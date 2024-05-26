import {ITransaction} from "../@types/types";

export const convertToEuropeanFormat = (date: string) => {
  return date.split('-').reverse().join('-')
};


export const balanceProcessing = (transactions: ITransaction[]) => {
  let income: number = 0;
  let balance: number = 0;
  let expenses: number = 0;
  let saving: number = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transaction: ITransaction = transactions[i];
    if (transaction.type === 'Расход') {
      expenses += transaction.amount
    }
    if (transaction.description === 'Перевод на сберегательный счёт') {
      saving += transaction.amount
    }
    if (transaction.type === 'Доход') {
      balance += transaction.amount;
      income += transaction.amount
    } else {
      balance -= transaction.amount;
    }
  }

  return {balance, expenses, saving, income};
}

