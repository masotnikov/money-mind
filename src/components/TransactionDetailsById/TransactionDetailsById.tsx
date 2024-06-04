import React from "react";
import Loader from "../UI/loader/Loader";
import {useGetTransactionByIdQuery} from "../../services/TransactionService";
import {useParams} from "react-router-dom";
import cl from './TransactionDetailsById.module.scss'
import LeafletMap from "../LeafletMap/LeafletMap";
import TransactionUL from "../TransactionUL/TransactionUL";

const TransactionDetailsById = () => {
  const {idUser} = useParams<{ idUser: string }>();

  const {
    data: transaction,
    isLoading,
    error: errorTransaction
  } = useGetTransactionByIdQuery(idUser || '');


  if (isLoading) {
    return <Loader/>;
  }

  if (errorTransaction) {
    return <div>Transaction not found</div>;
  }

  if (!transaction) {
    return <div>Transaction data is not available</div>;
  }


  return (
    <div className={cl.root}>
      <h1>Подробности транзакции</h1>
      <TransactionUL transaction={transaction}/>
      {transaction?.location?.name &&
        <>
          <h2 className={cl.locationName}>{transaction?.location?.name}</h2>
          <LeafletMap popupName={transaction?.location?.name} {...transaction?.location?.coordinates}/>
        </>
      }
    </div>
  );
};

export default TransactionDetailsById;
