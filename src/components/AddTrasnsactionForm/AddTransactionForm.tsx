import MySelect from "../UI/select/MySelect";
import React, {FC} from "react";
import MyButton from "../UI/button/MyButton";
import {useForm} from 'react-hook-form';
import {useAddNewTransactionMutation} from "../../services/TransactionService";
import {categoryOptions, typeOptions} from "./formOptions";
import cl from './AddTransactionForm.module.scss'
import MyInput from "../UI/input/MyInput";
import {ITransaction} from "../../@types/ITransaction";

interface IAddTransactionForm {
  onClose: () => void
}

const AddTransactionForm: FC<IAddTransactionForm> = ({onClose}) => {
  const [addNewTransactionMutation] = useAddNewTransactionMutation();
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    trigger
  } = useForm<ITransaction>({
    defaultValues: {
      type: '',
      category: ''
    },
    mode: "onChange"
  });


  const handleTransactionSubmit = async (transaction: ITransaction) => {
    transaction.amount = +transaction.amount
    await addNewTransactionMutation(transaction);
    onClose();
  }

  const onSubmit = (transaction: ITransaction) => {
    handleTransactionSubmit(transaction);
    reset();
    setValue("type", '');
    setValue("category", '')
  }

  return (
    <form className={cl.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={cl.fieldWrapper}>
        <MySelect options={typeOptions}
                  onChange={selectedType => {
                    setValue('type', selectedType);
                  }}
                  register={register("type", {required: true})}
                  name="type"
        ></MySelect>
        {errors.type && <span className={cl.error}>Обязательное поле</span>}
      </div>
      <div className={cl.fieldWrapper}>
        <MySelect options={categoryOptions}
                  name="category"
                  onChange={selectedCategory => setValue("category", selectedCategory)}
                  register={register("category", {required: true})}
        ></MySelect>
        {errors.category && <span className={cl.error}>Обязательное поле</span>}
      </div>
      <div className={cl.fieldWrapper}>
        <MyInput
          name="amount"
          placeholder="Введите сумму"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue("amount", +e.target.value);
            trigger("amount")
          }}
          type="number"
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
        <MyInput type="date"
                 name="date"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("date", e.target.value)}
                 register={register("date", {required: true})}
        ></MyInput>
        {errors.date && <span className={cl.error}>Обязательное поле</span>}
      </div>
      <div className={cl.fieldWrapper}>
        <MyInput
          placeholder="Описание..."
          type="text"
          name="description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("description", e.target.value)}
        ></MyInput>
      </div>
      <MyButton type="submit">Добавить</MyButton>
    </form>
  )
}

export default AddTransactionForm;