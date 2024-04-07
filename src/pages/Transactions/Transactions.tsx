import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/Loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import MyInput from "../../components/UI/Input/MyInput";


const Transactions = () => {

  const {data: transactions, isLoading, error} = useGetAllTransactionsQuery(10);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
      <TransactionList searchField={<MyInput placeholder="Поиск..."/>} transactions={transactions}>Все транзакции</TransactionList>
      {error && <h1>Произошла ошибка</h1>}
    </>
  )
}

export default Transactions;