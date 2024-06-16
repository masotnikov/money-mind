import React, {FC, memo} from "react";
import MyButton from "../UI/button/MyButton";
import cl from './TransactionItem.module.scss'
import {useNavigate} from "react-router-dom";
import TransactionUL from "../TransactionUL/TransactionUL";
import {useSoftDeleteTransactionMutation} from "../../services/TransactionService";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Hr from "../UI/hr/hr";
import CloseIcon from "../UI/closeIcon/CloseIcon";
import {ITransaction} from "../../@types/ITransaction";

export interface TransactionItemProps {
  transaction: ITransaction;
}


const TransactionItem: FC<TransactionItemProps> = memo(({transaction}) => {

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
        <CloseIcon onClick={handleRemove}/>
        <Hr/>
      </div>


    )
  }
)
export default TransactionItem;