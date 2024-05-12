import {useGetAllTransactionsQuery} from "../../API/TransactionService";

const Analytics = () => {

  // @ts-ignore
  const {data: transactions, isLoading, error: transactionError} = useGetAllTransactionsQuery();


  return (
    <h2>Аналитика</h2>
  )
}

export default Analytics;