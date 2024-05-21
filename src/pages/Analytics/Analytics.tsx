import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import Loader from "../../components/UI/loader/Loader";
import {ITransaction} from "../../@types/types";
import React, {useMemo} from "react";
import ChartsWidget from "../../components/ChartsWidget/ChartsWidget";

export interface IDataGeneralTable {
  name: string,
  income: number,
  expense: number,
}

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

const incomeAndExpenseByMonth = (transactions: ITransaction[]): IDataGeneralTable[] => {
  const result = transactions.reduce((acc: Record<string, IDataGeneralTable>, transaction: ITransaction) => {
    const month = monthsName[transaction.date.slice(3, 5)];

    if (!acc[month]) {
      acc[month] = {name: month, income: 0, expense: 0};
    }
    if (transaction.type === 'Доход') acc[month].income += transaction.amount
    if (transaction.type === 'Расход') acc[month].expense += transaction.amount
    return acc
  }, {});

  return Object.values(result)
}


const Analytics = () => {

  // @ts-ignore
  const {data: transactions = [], isLoading, error: transactionError} = useGetAllTransactionsQuery();
  const dataForTable = useMemo(() => incomeAndExpenseByMonth(transactions), [transactions]);

  if (isLoading) {
    <Loader/>
  }
  console.log(dataForTable)

  return (
    <>
      <ChartsWidget data={dataForTable}/>
    </>
  )
}

export default React.memo(Analytics);