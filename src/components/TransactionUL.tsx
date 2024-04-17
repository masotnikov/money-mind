import cl from "./TransactionItem/TransactionItem.module.scss";
import React, {FC} from "react";
import {ITransaction} from "../@types/types";

interface ITransactionProps {
  transaction: ITransaction;
}

const TransactionUL:FC<ITransactionProps> = ({transaction}) => {
  const {type, category, amount, description, date} = transaction;

  return (
    <ul>
      <li>Тип:
        <span className={`${cl.defaultBackground} ${type === 'расход'
          ? cl.redBackground
          : cl.greenBackground}`}>
          {type}
          </span>
      </li>
      <li>Категория: {category}</li>
      <li>Сумма: {amount}</li>
      <li>Дата: {date.split('-').reverse().join('-')}</li>
      <li>Описание: {description}</li>
    </ul>
  )
}

export default TransactionUL;