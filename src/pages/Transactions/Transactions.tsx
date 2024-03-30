import TransactionList from "../../components/TransactionList/TransactionList";
import {useEffect, useState} from "react";
import {ITransaction} from "../../@types/types";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import Loader from "../../components/UI/Loader/Loader";


const Transactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [limit, setLimit] = useState(10);
  const [fetchTransactions, isLoading, transactionError] = useFetching(async () => {
    const data = await PostService.getTransactions(limit);
    setTransactions(data);
  })
  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <>
      <TransactionList transactions={transactions}>Все транзакции</TransactionList>
    </>
  )
}

export default Transactions;