import cl from './ChartsWidget.module.scss'
import React, { FC, memo, useState } from "react";
import BookmarkList from "../BookmarkList/BookmarkList";
import TableExpensesByCategory from '../TableExpensesByCategory/TableExpensesByCategory';
import GeneralTable from '../GeneralTable/GeneralTable';
import { useDataForTable } from "../../hooks/useDataForTable";
import { useGetAllTransactionsQuery } from "../../services/TransactionService";
import Loader from "../../shared/ui/Loader/Loader";
import { ErrorEnum } from "../../constants/enums";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const bookmarks: string[] = [
  'Доходы / Расходы',
  'Расходы по месяцам',
];


const ChartsWidget: FC = memo(() => {
    const DEFAULT_MONTH: string = '05'
    const [selectedMonth, setSelectedMonth] = useState<string>(DEFAULT_MONTH);
    const [activeTab, setActiveTab] = useState<number>(0);

    const { data: transactions = [], isLoading, error: errorTransactions } = useGetAllTransactionsQuery({})
    const { incomeAndExpenseByMonth = [], expenseByCategory } = useDataForTable(transactions, selectedMonth);

    const bookmarkElements = [
      <GeneralTable data={incomeAndExpenseByMonth}/>,
      <TableExpensesByCategory data={expenseByCategory} value={selectedMonth} onChange={setSelectedMonth}/>
    ]

    const handleTabClick = (index: number) => {
      setActiveTab(index);
    }

    if (isLoading) {
      return <Loader/>
    }

    if (errorTransactions || !transactions) {
      return <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>;
    }

    return (
      <div className={cl.root}>
        <BookmarkList tabs={bookmarks} activeTab={activeTab} onTabClick={handleTabClick}/>
        {bookmarkElements[activeTab]}
      </div>
    )
  }
)
export default ChartsWidget;