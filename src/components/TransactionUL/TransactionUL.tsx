import React, {FC, memo} from "react";
import cl from './TransactionUL.module.scss'
import {ITransaction} from "../../@types/ITransaction";

interface ITransactionProps {
  transaction: ITransaction;
}

const TransactionUL: FC<ITransactionProps> = memo(({transaction}) => {

    return (
      <ul className={cl.root}>
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
        <li className={cl.description}>Описание: {transaction?.description}</li>
      </ul>
    )
  }
)
export default TransactionUL;