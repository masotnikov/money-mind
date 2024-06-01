import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import MyButton from "../UI/button/MyButton";
import cl from './TransactionItem.module.scss'
import {useNavigate} from "react-router-dom";
import TransactionUL from "../TransactionUL/TransactionUL";
import {useSoftDeleteTransactionMutation} from "../../API/TransactionService";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export interface TransactionItemProps {
  transaction: ITransaction;
}


const TransactionItem: FC<TransactionItemProps> = ({transaction}) => {

  const [updateTransaction] = useSoftDeleteTransactionMutation();
  const handleRemove = async () => {
    try {
      await updateTransaction(transaction?.id).unwrap();
    } catch (error) {
      const apiError = error as FetchBaseQueryError;
      console.error(apiError, 'Произошла ошибка при удалении транзакции')
    }
  };

  const navigate = useNavigate();

  return (
    <div className={cl.root}>
      <TransactionUL transaction={transaction}/>
      <MyButton onClick={() => navigate(`/details/${transaction?.id}`)}>Подробнее</MyButton>
      <img onClick={handleRemove} className={cl.closeIcon} src="/close.png" title="удалить транзакцию"
           alt="remove-transaction"/>
      <hr style={{marginTop: 2, marginBottom: 5}}/>
    </div>


  )
}
export default TransactionItem;