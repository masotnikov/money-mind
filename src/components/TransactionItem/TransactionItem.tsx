import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import MyButton from "../UI/Button/MyButton";
import cl from './TransactionItem.module.scss'
import {useNavigate} from "react-router-dom";

interface TransactionItemProps {
  transaction: ITransaction;
}


const TransactionItem: FC<TransactionItemProps> = ({transaction}) => {

const navigate = useNavigate();

  const {id, type, category, amount, description, date} = transaction;
  return (
    <div>
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
        <li>Дата: {date}</li>
        <li>Описание: {description}</li>
      </ul>
      <MyButton onClick={() => navigate(`/details/${id}`)}>Подробнее</MyButton>

      <hr style={{marginTop: 10, marginBottom: 5}}/>
    </div>


  )
}
export default TransactionItem;