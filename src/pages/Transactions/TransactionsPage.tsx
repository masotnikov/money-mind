import React, { memo, useState } from "react";
import cl from './TransactionsPage.module.scss'
import { useGetAllTransactionsQuery } from "../../services/TransactionService";
import TransactionFilter from "../../components/TransactionFilter/TransactionFilter";
import MyButton from "../../shared/ui/Button/MyButton";
import MyModal from "../../shared/ui/Modal/MyModal";
import Loader from "../../shared/ui/Loader/Loader";
import AddTransactionForm from "../../components/AddTrasnsactionForm/AddTransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useTransactions } from "../../hooks/useTransactions";
import restoreDeletedTransactions from "../../utils/restoreDeletedTransactions";
import { IFilter } from "../../@types/IFilter";
import { ErrorEnum } from "../../constants/enums";
import { ITransaction } from "../../@types/ITransaction";

const TransactionsPage = memo(() => {

    const [filter, setFilter] = useState<IFilter>({ sort: '', query: '', month: '' });
    const [modal, setModal] = useState<boolean>(false);

    const { data: transactions = [], isLoading, error: transactionError, refetch } = useGetAllTransactionsQuery(filter);

    const searchedTransactions: ITransaction[] = useTransactions(transactions, filter.query || '');
    const handleCloseModal = (): void => {
      setModal(false);
    }

    const restoreDeletedTransactionsAndRefetch = async () => {
      await restoreDeletedTransactions();
      refetch();
    }

    if (isLoading) {
      return <Loader/>
    }

    if (transactionError) {
      return <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>;
    }

    return (
      <div className={cl.root}>
        <MyModal modal={modal} setModal={setModal}>
          <AddTransactionForm onClose={handleCloseModal}/>
        </MyModal>
        <TransactionList
          renderList={searchedTransactions}
          title={"Все транзакции"}
          emptyMessage={"У вас нет транзакций"}>
          <TransactionFilter filter={filter} setFilter={setFilter}/>
          <MyButton onClick={() => setModal(true)}>Добавить транзакцию</MyButton>
          <MyButton onClick={restoreDeletedTransactionsAndRefetch}>Восстановить транзакции</MyButton>
        </TransactionList>
        {transactionError && <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>}
      </div>
    )
  }
)
export default TransactionsPage;