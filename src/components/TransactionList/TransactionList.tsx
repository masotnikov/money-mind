import React, {FC} from "react";
import {ITransaction} from "../../@types/types";
import TransactionItem from "../TransactionItem/TransactionItem";


interface TransactionListProps {
  title: string;
  children?: React.ReactNode;
  transactions: ITransaction[];
}



const TransactionList: FC<TransactionListProps> = ({children, transactions, title}) => {

  return (
    <div>
      <h3 style={{textAlign: "center"}}>{title}</h3>
      {children}
      <div>
        {transactions?.map((transaction: ITransaction) => (
          <TransactionItem key={transaction.id} transaction={transaction}/>
        ))}
      </div>
    </div>
  );

};

export default TransactionList;