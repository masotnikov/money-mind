import {IOption} from "../../@types/types";

export const typeOptions: IOption[] = [
  {value: '', name: 'Тип транзакции: ', disabled: true},
  {value: 'Доход', name: 'Доход'},
  {value: 'Расход', name: 'Расход'},
]

export const categoryOptions: IOption[] = [
  {value: '', name: 'Категория: ', disabled: true},
  {value: 'Продукты', name: 'Продукты'},
  {value: 'Развлечения', name: 'Развлечения'},
  {value: 'Транспорт', name: 'Транспорт'},
  {value: 'Здоровье', name: 'Здоровье'},
  {value: 'Одежда', name: 'Одежда'},
  {value: 'Другое', name: 'Другое'},
]