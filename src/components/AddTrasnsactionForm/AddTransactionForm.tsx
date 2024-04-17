import MySelect from "../UI/select/MySelect";
import {IOption, ITransaction} from "../../@types/types";
import React, {FC, useState} from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

interface IAddTransactionForm {
  onClose: () => void
}

const stateTransaction: ITransaction = {
  type: '',
  category: '',
  description: '',
  date: '',
  amount: 0,
}

const AddTransactionForm: FC<IAddTransactionForm> = ({onClose}) => {
  const [newTransaction, setNewTransaction] = useState(stateTransaction)

  const typeOptions: IOption[] = [
    {value: '', name: 'Тип транзакции: ', disabled: true},
    {value: 'доход', name: 'доход'},
    {value: 'расход', name: 'расход'},
  ]

  const categoryOptions: IOption[] = [
    {value: '', name: 'Категория: ', disabled: true},
    {value: 'продукты', name: 'продукты'},
    {value: 'развлечения', name: 'развлечения'},
    {value: 'транспорт', name: 'транспорт'},
    {value: 'здоровье', name: 'здоровье'},
    {value: 'одежда', name: 'одежда'},
    {value: 'другое', name: 'другое'},
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewTransaction(prevState => (
      {...prevState, [name]: name === "amount" ? +value : value}
    ))
  }

  const handleSelectChange = (key: keyof ITransaction, type: string) => {
    setNewTransaction(prevState => ({
      ...prevState,
      [key]: type
    }))
  }

  const addNewTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTransaction);
    setNewTransaction(stateTransaction);
    onClose();
  }

  return (
    <form style={{display: "flex", flexDirection: "column"}} onSubmit={addNewTransaction}>
      <MySelect options={typeOptions}
                value={newTransaction.type}
                onChange={selectedType => handleSelectChange('type', selectedType)}></MySelect>
      <MySelect options={categoryOptions}
                value={newTransaction.category}
                onChange={selectedCategory => handleSelectChange('category', selectedCategory)}></MySelect>
      <MyInput value={newTransaction.amount !== 0 ? newTransaction.amount : ''}
               name="amount"
               placeholder="Введите сумму"
               onChange={handleInputChange}
               type="number"></MyInput>
      <MyInput type="date"
               name="date"
               value={newTransaction.date}
               onChange={handleInputChange}></MyInput>
      <MyInput placeholder="Описание..."
               type="text"
               name="description"
               value={newTransaction.description}
               onChange={handleInputChange}
      ></MyInput>
      <MyButton type="submit">Добавить</MyButton>
    </form>
  )
}

export default AddTransactionForm;