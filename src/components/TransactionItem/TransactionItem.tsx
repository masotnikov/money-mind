import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import MyButton from "../UI/button/MyButton";
import cl from './TransactionItem.module.scss'
import {useNavigate} from "react-router-dom";
import TransactionUL from "../TransactionUL";
import {useSoftDeleteTransactionMutation} from "../../API/TransactionService";

interface TransactionItemProps {
  transaction: ITransaction;
}


const TransactionItem: FC<TransactionItemProps> = ({transaction}) => {

  const [updateTransaction] = useSoftDeleteTransactionMutation()
  const handleRemove = async () => {
    // Отправляем запрос на сервер для обновления транзакции с флагом "удалено"
    const { error } : any = await updateTransaction(transaction.id);
    if (error) {
      console.error('Произошла ошибка при обновлении транзакции', error);
      return;
    }
    console.log('Транзакция успешно обновлена');
  };

  const navigate = useNavigate();

  return (
    <div className={cl.root}>
      <TransactionUL transaction={transaction}/>
      <MyButton onClick={() => navigate(`/details/${transaction.id}`)}>Подробнее</MyButton>
      <img onClick={handleRemove} className={cl.closeIcon} src="/close.png" title="удалить транзакцию"
           alt="remove-transaction"/>
      <hr style={{marginTop: 10, marginBottom: 5}}/>
    </div>


  )
}
export default TransactionItem;