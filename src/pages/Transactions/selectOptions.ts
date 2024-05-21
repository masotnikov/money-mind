import {IOption} from "../../@types/types";

export const selectOptions: IOption[] = [
  {name: 'Сортировать по: ', value: '', disabled: true},
  {name: 'По умолчанию', value: ''},
  {name: '- по доходу', value: 'Доход'},
  {value: 'Расход', name: '- по расходу'},
  {value: '', name: 'Категориям: ', disabled: true},
  {value: 'Продукты', name: '- продукты'},
  {name: '- развлечения', value: 'Развлечения'},
  {value: 'Другое', name: '- другое'},
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