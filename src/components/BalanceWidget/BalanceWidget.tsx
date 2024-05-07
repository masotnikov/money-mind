import React from "react";
import {useAddNewTransactionMutation, useGetBalanceAndExpensesQuery} from "../../API/TransactionService";
import Loader from "../UI/loader/Loader";
import cl from './BalanceWidget.module.scss'
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import {useForm} from "react-hook-form";
import {ITransaction} from "../../@types/types";

const BalanceWidget = () => {
// @ts-ignore
  const {data: balanceAndExpensesData, isLoading: balanceAndExpensesLoading} = useGetBalanceAndExpensesQuery();
  const {handleSubmit, setValue, reset, register} = useForm<ITransaction>();
  const [replenishBalance] = useAddNewTransactionMutation();

  if (balanceAndExpensesLoading) {
    return <Loader/>
  }

  const addNewTransaction = async (data: ITransaction) => {
    data.type = "Доход";
    data.category = "Другое";
    data.description = "Пополнение счёта";
    data.date = "2024-03-26";
    await replenishBalance(data);
  }

  const onSubmit = (data: ITransaction) => {
    addNewTransaction(data);
    reset();
  }

  return (
    <div className={cl.root}>
      <h2>Текущий баланс</h2>
      <div style={{display: "flex"}}>
        <span style={{padding: "0 10px"}}>{balanceAndExpensesData?.balance ?? 'Баланс недоступен'}</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MyInput
            name="replenishBalance"
            style={{width: 130, verticalAlign: "top", borderRadius: 15}}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue("amount", +e.target.value);
            }}
            register={register("amount", {
              required: "Обязательное поле",
              min: {
                value: 1,
                message: "Число должно быть больше или равно 1"
              },
            })}
          ></MyInput>
          <MyButton type="submit" style={{verticalAlign: "top", marginRight: 5}}>Пополнить</MyButton>
        </form>
      </div>
      <hr/>
      <h2>Расходы</h2>
      <div>
        <span style={{padding: "0 10px"}}>{balanceAndExpensesData?.expenses ?? 'Расходы недоступны'}</span>
      </div>
    </div>
  )
}

export default BalanceWidget;