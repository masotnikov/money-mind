import RenderList from "../../components/RenderList/RenderList";
import Loader from "../../components/UI/loader/Loader";
import {useGetAllTransactionsQuery} from "../../API/TransactionService";
import {memo, useState} from "react";
import {useTransactions} from "../../hooks/useTransactions";
import TransactionFilter from "../../components/TransactionFilter/TransactionFilter";
import MyButton from "../../components/UI/button/MyButton";
import MyModal from "../../components/UI/modal/MyModal";
import AddTransactionForm from "../../components/AddTrasnsactionForm/AddTransactionForm";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import {IFilter} from "../../@types/types";


const Transactions = memo(() => {

    const [filter, setFilter] = useState<IFilter>({sort: '', query: '', month: ''});
    // @ts-ignore
    const {data: transactions = [], isLoading, error: transactionError} = useGetAllTransactionsQuery();
    console.log(filter.month)
    const [modal, setModal] = useState<boolean>(false);
    const searchedAndSortedTransactions = useTransactions(transactions, filter.query, filter.sort, filter.month);
    const handleCloseModal = (): void => {
      setModal(false);
    }

    if (isLoading) {
      return <Loader/>
    }

    return (
      <>
        <MyModal modal={modal} setModal={setModal}>
          <AddTransactionForm onClose={handleCloseModal}/>
        </MyModal>
        <RenderList
          renderData={searchedAndSortedTransactions}
          title={"Все транзакции"}
          emptyMessage={"У вас нет транзакций"}
          RenderItemComponent={TransactionItem}
        >
          <TransactionFilter filter={filter} setFilter={setFilter}/>
          <MyButton onClick={() => setModal(true)}>Добавить транзакцию</MyButton>
        </RenderList>
        {transactionError && <h1>Произошла ошибка</h1>}
      </>
    )
  }
)
export default Transactions;