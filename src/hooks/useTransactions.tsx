import {ITransaction} from "../@types/types";
import {useMemo} from "react";

export const useTransactions = (transactions: ITransaction[], query: string) => {
  const searchedTransactions = useMemo(() => {
    console.log('111')
    if (!transactions) return [];

    return transactions.filter(transaction =>
      Object.values(transaction).some(item => {
        if (typeof item === 'string') {
          return item.toLowerCase().includes(query.toLowerCase());
        }
        if (typeof item === 'number') {
          return item.toString().toLowerCase().includes(query.toLowerCase());
        }
        return false;
      })
    )

  }, [transactions, query])

  return searchedTransactions
}