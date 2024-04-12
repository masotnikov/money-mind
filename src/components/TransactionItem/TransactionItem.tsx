import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import MyButton from "../UI/button/MyButton";
import cl from './TransactionItem.module.scss'
import {useNavigate} from "react-router-dom";
import TransactionListProps from "../TransactionListProps";

interface TransactionItemProps {
  transaction: ITransaction;
  removeTransaction: (id: number) => void;
}


const TransactionItem: FC<TransactionItemProps> = ({transaction, removeTransaction}) => {

  const handleClickRemove = () => {
    removeTransaction(transaction.id)
  }

  const navigate = useNavigate();

  return (
    <div className={cl.root}>
      <TransactionListProps transaction={transaction}/>
      <MyButton onClick={() => navigate(`/details/${transaction.id}`)}>Подробнее</MyButton>
      <img onClick={handleClickRemove} className={cl.closeIcon} src="/close.png"
           alt="remove-transaction"/>
      <hr style={{marginTop: 10, marginBottom: 5}}/>
    </div>


  )
}
export default TransactionItem;