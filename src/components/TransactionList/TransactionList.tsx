import cl from './TransactionList.module.scss'
import React, { FC } from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import { ITransaction } from "../../@types/ITransaction";

export interface IListProps {
  renderList: ITransaction[];
  title: string;
  emptyMessage: string;
  children?: React.ReactNode;
}

const TransactionList: FC<IListProps> = ({ title, children, renderList, emptyMessage }) => {
  return (
    <div className={cl.root}>
      <h3 className={cl.title}>{title}</h3>
      {children}
      {renderList?.length === 0 ? (
        <h2 className={cl.emptyMessage}>{emptyMessage}</h2>
      ) : (
        <ul className={cl.list}>
          {renderList.map(transaction => (
            <TransactionItem transaction={transaction} key={transaction?.id}/>
          ))}
        </ul>)

      }

    </div>
  )
}

export default TransactionList;