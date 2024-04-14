import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import {useState} from "react";
import {useTransactions} from "../../hooks/useTransactions";
import TransactionFilter from "../../components/TransactionFilter/TransactionFilter";
import MyButton from "../../components/UI/button/MyButton";

export interface IFilter {
    sort: string;
    query: string;
  }

const sortOptions = [
  { value: '', name: 'Сортировать по: ', disabled: true },
  { value: '', name: 'По умолчанию' },
  { value: 'доход', name: '- по доходу' },
  { value: 'расход', name: '- по расходу' },
  { value: '', name: 'Категориям: ', disabled: true },
  { value: 'Продукты', name: '- продукты'},
  { value: 'Развлечения', name: '- развлечения' },
  { value: 'Другое', name: '- другое' },
]


const Transactions = () => {

  const {data: transactions, isLoading, error : transactionError} = useGetAllTransactionsQuery(10);
  const [filter, setFilter] = useState<IFilter>({sort: '', query: ''});
  const searchedAndSortedTransactions = useTransactions(transactions, filter.query, filter.sort);



  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
      <TransactionList
        transactions={searchedAndSortedTransactions}
        title={"Все транзакции"}>
        <TransactionFilter filter={filter} setFilter={setFilter} sortOptions={sortOptions}/>
        <MyButton>Добавить транзакцию</MyButton>
      </TransactionList>
      {transactionError && <h1>Произошла ошибка</h1>}
    </>
  )
}

export default Transactions;