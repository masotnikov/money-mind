import MyInput from "../UI/input/MyInput";
import React, {FC} from "react";
import MyButton from "../UI/button/MyButton";
import {useForm} from "react-hook-form";
import cl from './ReplenishBalanceForm.module.scss'
import {ITransaction} from "../../@types/ITransaction";

interface IReplenishBalanceFormProps {
  onSubmit: (transaction: ITransaction) => void | Promise<void>;
}

const ReplenishBalanceForm: FC<IReplenishBalanceFormProps> = ({onSubmit}) => {
  const {
    handleSubmit,
    setValue,
    reset,
    register,
    formState: {errors},
  } = useForm<ITransaction>();


  const handleFormSubmit = (transaction?: ITransaction) => {
    if (transaction) {
      onSubmit(transaction);
    }
    reset();
  }

  return (
    <form className={cl.root} onSubmit={handleSubmit(handleFormSubmit)}>
      <MyInput
        placeholder="Введите сумму"
        name="replenishBalance"
        style={{width: 140, borderRadius: 15}}
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
      {errors.amount && <span className={cl.error}>{errors?.amount?.message}</span>}
      <MyButton style={{width: 140, borderRadius: 15}} type="submit">Пополнить</MyButton>

    </form>
  )
}

export default ReplenishBalanceForm;