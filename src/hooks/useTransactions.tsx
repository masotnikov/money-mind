import {useMemo} from "react";
import {ITransaction} from "../@types/ITransaction";



export const useTransactions = (transactions: ITransaction[], query: string) => {

  const searchedTransactions: ITransaction[] = useMemo(() => {

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