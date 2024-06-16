import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../services/TransactionService";
import React, {memo, useState} from "react";
import {useTransactions} from "../../hooks/useTransactions";
import TransactionFilter from "../../components/TransactionFilter/TransactionFilter";
import MyButton from "../../components/UI/button/MyButton";
import MyModal from "../../components/UI/modal/MyModal";
import AddTransactionForm from "../../components/AddTrasnsactionForm/AddTransactionForm";
import cl from './TransactionsPage.module.scss'
import TransactionList from "../../components/TransactionList/TransactionList";
import restoreDeletedTransactions from "../../utils/restoreDeletedTransactions";
import {ErrorEnum} from "../../constants/enums";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {ITransaction} from "../../@types/ITransaction";
import {IFilter} from "../../@types/IFilter";


const TransactionsPage = memo(() => {

    const {data: transactions = [], isLoading, error: transactionError, refetch} = useGetAllTransactionsQuery();
    const [filter, setFilter] = useState<IFilter>({sort: '', query: '', month: ''});
    const [modal, setModal] = useState<boolean>(false);

    const searchedAndSortedTransactions: ITransaction[] = useTransactions(transactions, filter.query, filter.sort, filter.month);
    const handleCloseModal = (): void => {
      setModal(false);
    }

    const remoteDeletedTransactionsAndRefetch = async () => {
      await restoreDeletedTransactions();
      refetch();
    }

    if (isLoading) {
      return <Loader/>
    }

    if (transactionError || !transactions) {
      return <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>;
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
        {transactionError && <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>}
      </div>
    )
  }
)
export default TransactionsPage;