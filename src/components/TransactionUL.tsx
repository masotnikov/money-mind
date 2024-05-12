import cl from "./TransactionItem/TransactionItem.module.scss";
import React, {FC, memo} from "react";
import {ITransaction} from "../@types/types";

interface ITransactionProps {
  transaction: ITransaction;
}

const TransactionUL: FC<ITransactionProps> = memo(({transaction}) => {

    return (
      <ul>
        <li>Тип:
          <span className={`${cl.defaultBackground} ${transaction?.type === 'Расход'
            ? cl.redBackground
            : cl.greenBackground}`}>
          {transaction?.type}
          </span>
        </li>
        <li>Категория: {transaction?.category}</li>
        <li>Сумма: {transaction?.amount}</li>
        <li>Дата: {transaction?.date}</li>
        <li style={{wordWrap: 'break-word'}}>Описание: {transaction?.description}</li>
      </ul>
    )
  }
)
export default TransactionUL;