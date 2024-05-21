import cl from "../BalanceWidget/BalanceWidget.module.scss";
import MyInput from "../UI/input/MyInput";
import React, {FC} from "react";
import MyButton from "../UI/button/MyButton";
import {useForm} from "react-hook-form";
import {ITransaction} from "../../@types/types";


const ReplenishBalanceForm: FC<any> = ({onSubmit}) => {
  const {
    handleSubmit,
    setValue,
    reset,
    register,
    formState: {errors},
  } = useForm<ITransaction>();


// @ts-ignore
  const handleFormSubmit = (data?: ITransaction) => {
    onSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={cl.fieldWrapper}>
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
      </div>
      <div className={cl.fieldWrapper}>
        <MyButton style={{width: 140, borderRadius: 15}} type="submit">Пополнить</MyButton>
      </div>
    </form>
  )
}

export default ReplenishBalanceForm;