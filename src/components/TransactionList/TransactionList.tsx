import React, {FC, ReactNode} from "react";
import {ITransaction} from "../../@types/types";
import TransactionItem from "../TransactionItem/TransactionItem";


interface TransactionListProps {
  children: React.ReactNode;
  transactions: ITransaction[];
  searchField?: ReactNode
}



const TransactionList: FC<TransactionListProps> = ({children, transactions, searchField}) => {
  return (
    <div>
      <h3 style={{textAlign: "center"}}>{children}</h3>
      {searchField}
      <div>
        {transactions?.map((transaction: ITransaction) => (
          <TransactionItem key={transaction.id} transaction={transaction}/>
        ))}
      </div>
    </div>
  );

};

export default TransactionList;