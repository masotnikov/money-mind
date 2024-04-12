import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import TransactionItem from "../TransactionItem/TransactionItem";


interface TransactionListProps {
  title: string;
  children?: React.ReactNode;
  transactions: ITransaction[];
  removeTransaction: (id: number) => void
}



const TransactionList: FC<TransactionListProps> = ({children, transactions, title, removeTransaction}) => {
  return (
    <div>
      <h3 style={{textAlign: "center"}}>{title}</h3>
      {children}
      <div>
        {transactions?.map((transaction: ITransaction) => (
          <TransactionItem removeTransaction={removeTransaction} key={transaction.id} transaction={transaction}/>
        ))}
      </div>
    </div>
  );

};

export default TransactionList;