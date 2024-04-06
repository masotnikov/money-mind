import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/Loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";


const Transactions = () => {

  const {data: transactions, isLoading, error} = useGetAllTransactionsQuery(10);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
      <TransactionList transactions={transactions}>Все транзакции</TransactionList>
      {error && <h1>Произошла ошибка</h1>}
    </>
  )
}

export default Transactions;