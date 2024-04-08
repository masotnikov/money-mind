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
  const searchedTransactions = useTransactions(transactions, query, sort)

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
        <MySelect options={[
          {value: 'доход', name: 'доходу'},
          {value: 'расход', name: 'расходу'},
        ]}
                  defaultValue="Сортировать по: "
                  value={sort}
                  onChange={selectedSort => setSort(selectedSort)}/>
      </TransactionList>
      {error && <h1>Произошла ошибка</h1>}
    </>
  )
}

export default Transactions;