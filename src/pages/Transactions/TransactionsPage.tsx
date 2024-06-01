import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import {memo, useState} from "react";
import {useTransactions} from "../../hooks/useTransactions";
import TransactionFilter from "../../components/TransactionFilter/TransactionFilter";
import MyButton from "../../components/UI/button/MyButton";
import MyModal from "../../components/UI/modal/MyModal";
import AddTransactionForm from "../../components/AddTrasnsactionForm/AddTransactionForm";
import {IFilter, ITransaction} from "../../@types/types";
import cl from './TransactionsPage.module.scss'
import TransactionList from "../../components/TransactionList/TransactionList";
import restoreTransactions from "../../utils/restoreTransactions";


const TransactionsPage = memo(() => {

    const {data: transactions = [], isLoading, error: transactionError, refetch} = useGetAllTransactionsQuery();
    const [filter, setFilter] = useState<IFilter>({sort: '', query: '', month: ''});
    const [modal, setModal] = useState<boolean>(false);

    const searchedAndSortedTransactions: ITransaction[] = useTransactions(transactions, filter.query, filter.sort, filter.month);
    const handleCloseModal = (): void => {
      setModal(false);
    }

    const remoteDeletedTransactionsAndRefetch = async () => {
      await restoreTransactions();
      refetch();
    }

    if (isLoading) {
      return <Loader/>
    }

    return (
      <div className={cl.root}>
        <MyModal modal={modal} setModal={setModal}>
          <AddTransactionForm onClose={handleCloseModal}/>
        </MyModal>
        <TransactionList
          renderList={searchedAndSortedTransactions}
          title={"Все транзакции"}
          emptyMessage={"У вас нет транзакций"}>
          <TransactionFilter filter={filter} setFilter={setFilter}/>
          <MyButton onClick={() => setModal(true)}>Добавить транзакцию</MyButton>
          <MyButton onClick={remoteDeletedTransactionsAndRefetch}>Восстановить транзакции</MyButton>
        </TransactionList>
        {transactionError && <h1 className={cl.errorMessage}>Произошла ошибка</h1>}
      </div>
    )
  }
)
export default TransactionsPage;