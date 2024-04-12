import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import {useState} from "react";
import {useTransactions} from "../../hooks/useTransactions";
import TransactionFilter from "../../components/TransactionFilter/TransactionFilter";

export interface IFilter {
    sort: string;
    query: string;
  }

const Transactions = () => {

  const {data: transactions, isLoading, error} = useGetAllTransactionsQuery(10);
  const [filter, setFilter] = useState<IFilter>({sort: '', query: ''});
  const searchedAndSortedTransactions = useTransactions(transactions, filter.query, filter.sort);

  const removeTransaction = (id : number) => {

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

  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
      <TransactionList
        removeTransaction={removeTransaction}
        transactions={searchedAndSortedTransactions}
        title={"Все транзакции"}>
        <TransactionFilter filter={filter} setFilter={setFilter} sortOptions={sortOptions}/>
      </TransactionList>
      {error && <h1>Произошла ошибка</h1>}
    </>
  )
}

export default Transactions;