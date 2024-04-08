import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import MyInput from "../../components/UI/input/MyInput";
import {useState} from "react";
import {useTransactions} from "../../hooks/useTransactions";
import MySelect from "../../components/UI/select/MySelect";



const Transactions = () => {

  const {data: transactions, isLoading, error} = useGetAllTransactionsQuery(10);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const searchedTransactions = useTransactions(transactions, query, sort);

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

  console.log(sort)
  return (
    <>
      <TransactionList
        transactions={searchedTransactions}
        title={"Все транзакции"}>
        <MyInput value={query}
                 onChange={e => setQuery(e.target.value)}
                 placeholder="Поиск..."/>
        <MySelect options={sortOptions}
                  value={sort}
                  onChange={selectedSort => setSort(selectedSort)}/>
      </TransactionList>
      {error && <h1>Произошла ошибка</h1>}
    </>
  )
}

export default Transactions;