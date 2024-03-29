import React, {FC} from "react";
import {ITransaction} from "../../@types/types";

interface TransactionItemProps {
  transaction: ITransaction;
}
const TransactionItem:FC<TransactionItemProps> = ({transaction  }) => {
  return (
    <>
      <ul key={transaction.id}>
        <li>Тип: {transaction.type}</li>
        <li>Категория: {transaction.category}</li>
        <li>Сумма: {transaction.amount}</li>
        <li>Дата: {transaction.date}</li>
        <li>Описание: {transaction.description}</li>
      </ul>
      <hr style={{marginTop: 10}}/>
    </>

  )
}

export default TransactionItem;