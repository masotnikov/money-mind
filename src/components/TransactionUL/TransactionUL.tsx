import React, {FC, memo} from "react";
import cl from './TransactionUL.module.scss'
import {ITransaction} from "../../@types/ITransaction";
import { TransactionType } from "../../constants/enums";

interface ITransactionProps {
  transaction: ITransaction;
}

const TransactionUL: FC<ITransactionProps> = memo(({transaction}) => {

    return (
      <ul className={cl.root}>
        <li>Тип:
          <span className={`${cl.defaultBackground} ${transaction?.type === TransactionType.EXPENSE
            ? cl.expenseBackground
            : cl.incomeBackground}`}>
          {transaction?.type}
          </span>
        </li>
        <li>Категория: {transaction?.category}</li>
        <li>Сумма: {transaction?.amount}</li>
        <li>Дата: {transaction?.date}</li>
        <li className={cl.description}>Описание: {transaction?.description}</li>
      </ul>
    )
  }
)
export default TransactionUL;