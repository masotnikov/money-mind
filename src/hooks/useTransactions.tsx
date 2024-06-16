import {useMemo} from "react";
import {ITransaction} from "../@types/ITransaction";

const useSortedTransactions = (transactions: ITransaction[], sort: string, month: string) => {

  return useMemo(() => {
    return transactions.filter(transaction => {
      let matchesSort: boolean = true;
      let matchesMonth: boolean = true;

      if (sort) {
        matchesSort = transaction.type === sort || transaction.category === sort;
      }

      if (month) {
        matchesMonth = transaction.date.slice(3, 5).includes(month);
      }
      return matchesSort && matchesMonth;
    });
  }, [sort, transactions, month])
}


export const useTransactions = (transactions: ITransaction[], query: string, sort: string, month: string) => {

  const sortedTransactions: ITransaction[] = useSortedTransactions(transactions, sort, month)

  const sortedAndSearchedTransactions: ITransaction[] = useMemo(() => {

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

  }, [sortedTransactions, query])

  return sortedAndSearchedTransactions
}