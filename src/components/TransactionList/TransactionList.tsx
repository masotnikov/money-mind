import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import TransactionItem from "../TransactionItem/TransactionItem";


interface TransactionListProps {
  children: React.ReactNode;
  transactions: ITransaction[];
}

const TransactionList: FC<TransactionListProps> = ({children, transactions}) => {
  return (
    <div>
    <h3 style={{textAlign: "center"}}>{children}</h3>
      <div>
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction}/>
        ))}
      </div>
    </div>
  )
}

export default TransactionList;