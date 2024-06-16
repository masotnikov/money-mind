import {IOption} from "../../@types/IOption";

export const selectOptions: IOption[] = [
  {name: 'Сортировать по: ', value: '', disabled: true},
  {name: 'По умолчанию', value: ''},
  {name: '- по доходу', value: 'Доход'},
  {name: '- по расходу', value: 'Расход'},
  {name: 'Категориям: ', value: '', disabled: true},
  {name: '- продукты', value: 'Продукты'},
  {name: '- развлечения', value: 'Развлечения'},
  {name: '- транспорт', value: 'Транспорт'},
  {name: '- здоровье', value: 'Здоровье'},
  {name: '- одежда', value: 'Одежда'},
  {name: '- другое', value: 'Другое'},
]

export const monthOptions: IOption[] = [
  {name: 'Выбрать месяц: ', value: '', disabled: true},
  {name: 'За весь период', value: ''},
  {name: 'март', value: '03'},
  {name: 'апрель', value: '04'},
  {name: 'май', value: '05'},
  {name: 'июнь', value: '06'},
  {name: 'июль', value: '07'},
  {name: 'август', value: '08'},
  {name: 'сентябрь', value: '09'},
  {name: 'октябрь', value: '10'},
  {name: 'ноябрь', value: '11'},
  {name: 'декабрь', value: '12'},
  {name: 'январь', value: '01'},
  {name: 'февраль', value: '02'},
]
