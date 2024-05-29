import {ITransaction} from "../@types/types";
import {useMemo} from "react";
import {IDataForTable} from "../components/ChartsWidget/ChartsWidget";

const monthsName: Record<string, string> = {
  "01": "Январь",
  "02": "Февраль",
  "03": "Март",
  "04": "Апрель",
  "05": "Май",
  "06": "Июнь",
  "07": "Июль",
  "08": "Август",
  "09": "Сентябрь",
  "10": "Октябрь",
  "11": "Ноябрь",
  "12": "Декабрь"
};
export const useDataForTable = (transactions: ITransaction[], selectedMonth: string) => {
  const incomeAndExpenseByMonth = useMemo((): IDataForTable[] => {
      const result = transactions.reduce((acc: Record<string, IDataForTable>, transaction: ITransaction) => {
        const month = monthsName[transaction.date.slice(3, 5)];

        if (!acc[month]) {
          acc[month] = {name: month, income: 0, expense: 0};
        }
        if (transaction.type === 'Доход') acc[month].income += transaction.amount;
        if (transaction.type === 'Расход') acc[month].expense += transaction.amount;
        return acc
      }, {});

      return Object.values(result);
    }
    , [transactions]);


  const expenseByCategory = useMemo(() => {
    const filteredTransactions = transactions
      .filter((transaction: ITransaction) => transaction.date.slice(3, 5) === selectedMonth && transaction.type === 'Расход')
      .reduce((acc: Record<string, number>, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {});

    return Object.entries(filteredTransactions).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  }, [transactions, selectedMonth]);

  return { incomeAndExpenseByMonth, expenseByCategory };


}