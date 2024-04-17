import TransactionList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import {useState} from "react";
import {useTransactions} from "../../hooks/useTransactions";
import TransactionFilter from "../../components/TransactionFilter/TransactionFilter";
import MyButton from "../../components/UI/button/MyButton";
import MyModal from "../../components/UI/modal/MyModal";
import AddTransactionForm from "../../components/AddTrasnsactionForm/AddTransactionForm";

export interface IFilter {
  sort: string;
  query: string;
}

const sortOptions = [
  {value: '', name: 'Сортировать по: ', disabled: true},
  {value: '', name: 'По умолчанию'},
  {value: 'доход', name: '- по доходу'},
  {value: 'расход', name: '- по расходу'},
  {value: '', name: 'Категориям: ', disabled: true},
  {value: 'Продукты', name: '- продукты'},
  {value: 'Развлечения', name: '- развлечения'},
  {value: 'Другое', name: '- другое'},
]


const Transactions = () => {

  const {data: transactions, isLoading, error: transactionError} = useGetAllTransactionsQuery(10);
  const [filter, setFilter] = useState<IFilter>({sort: '', query: ''});
  const [modal, setModal] = useState<boolean>(false);
  const searchedAndSortedTransactions = useTransactions(transactions, filter.query, filter.sort);
  //
  const handleCloseModal = (): void => {
    setModal(false)
  }


  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
      <MyModal modal={modal} setModal={setModal}>
        <AddTransactionForm onClose={handleCloseModal}/>
      </MyModal>
      <TransactionList
        transactions={searchedAndSortedTransactions}
        title={"Все транзакции"}>
        <TransactionFilter filter={filter} setFilter={setFilter} sortOptions={sortOptions}/>
        <MyButton onClick={() => setModal(true)}>Добавить транзакцию</MyButton>
      </TransactionList>
      {transactionError && <h1>Произошла ошибка</h1>}
    </>
  )
}

export default Transactions;