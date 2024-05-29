import cl from './TransactionList.module.scss'
import {ITransaction} from "../../@types/types";
import {FC} from "react";
import TransactionItem from "../TransactionItem/TransactionItem";

interface IListProps {
  transactions: ITransaction[];
  title: string;
  emptyMessage: string;
  children?: React.ReactNode;
}

const TransactionList: FC<IListProps> = ({title, children, transactions, emptyMessage}) => {
  return (
    <div className={cl.root}>
      <h3>{title}</h3>
      {children}
      {transactions?.length === 0 && <h2>{emptyMessage}</h2>}
      <ul className={cl.list}>
        {transactions.map(transaction => (
            <TransactionItem transaction={transaction} key={transaction?.id}/>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList;