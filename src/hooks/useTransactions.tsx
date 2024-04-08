import {ITransaction} from "../@types/types";
import {useMemo} from "react";

const useSortedTransactions = (transactions: ITransaction[], sort: string) => {

  const sortedTransactions = useMemo(() => {
    if (sort) {
      return transactions.filter(transaction => (transaction.type === sort || transaction.category === sort))
    }
    return transactions;
  }, [sort, transactions])
  return sortedTransactions
}


export const useTransactions = (transactions: ITransaction[], query: string, sort: string) => {

  const sortedTransactions = useSortedTransactions(transactions, sort)

  const sortedAndSearchedTransactions = useMemo(() => {

    if (!sortedTransactions) return [];

    return sortedTransactions.filter(transaction =>
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

  }, [transactions, query, sort])

  return sortedAndSearchedTransactions
}