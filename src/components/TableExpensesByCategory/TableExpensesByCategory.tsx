import React, {FC} from "react";
import MySelect from "../UI/select/MySelect";
import {IOption} from "../../@types/types";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


interface ITableExpensesByCategoryProps {
  value: string;
  onChange: (selectedOptions: string) => void;
  data: any;
}

const monthOptions: IOption[] = [
  {name: 'Выбрать месяц: ', value: '', disabled: true},
  {name: 'январь', value: '01'},
  {name: 'февраль', value: '02'},
  {name: 'март', value: '03'},
  {name: 'апрель', value: '04'},
  {name: 'май', value: '05', selected: true},
  {name: 'июнь', value: '06'},
  {name: 'июль', value: '07'},
  {name: 'август', value: '08'},
  {name: 'сентябрь', value: '09'},
  {name: 'октябрь', value: '10'},
  {name: 'ноябрь', value: '11'},
  {name: 'декабрь', value: '12'},
]


const TableExpensesByCategory: FC<ITableExpensesByCategoryProps> = ({value, onChange, data}) => {
  console.log('byCat', data)

  return (
    <div style={{width: 600, height: 300}}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <MySelect options={monthOptions} onChange={selectedOption => onChange(selectedOption)} value={value}/>
      </div>
      {!data?.length ?
        <h1 style={{textAlign: "center"}}>Транзакций за этот месяц нет</h1>
        :
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8"/>
          </BarChart>
        </ResponsiveContainer>
      }

    </div>
  )
}

export default TableExpensesByCategory;