import React from "react";
import Loader from "../UI/Loader/Loader";
import {useGetTransactionByIdQuery} from "../../API/TransactionService";
import {useParams} from "react-router-dom";
import cl from './TransactionDetails.module.scss'
import LeafletMap from "../LeafletMap/LeafletMap";

const TransactionDetails = () => {
  const {idUser} = useParams();
  const {data: transaction, isLoading, isError} = useGetTransactionByIdQuery(idUser);

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <div>Transaction not found</div>;
  }

  const {type, category, amount, description, date, location} = transaction[0];

  // @ts-ignore
  return (
    <div className={cl.root}>
      <h1>Подробности транзакции</h1>
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
      <>
        {location?.name &&
          <>
            <h2 className={cl.locationName}>{location?.name}</h2>
            <LeafletMap popupName={location.name} {...location.coordinates}/>
          </>
        }
      </>
    </div>
  );
};

export default TransactionDetails;
