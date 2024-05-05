import {FC} from "react";
import MySelect from "../UI/select/MySelect";
import MyInput from "../UI/input/MyInput";
import {IFilter, IOption} from "../../@types/types";


interface ITransactionFilter {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
  sortOptions: IOption[];
}

const TransactionFilter: FC<ITransactionFilter> = ({filter, setFilter, sortOptions}) => {
  return (
    <>
      <MyInput value={filter.query}
               onChange={e => setFilter({...filter, query: e.target.value})}
               placeholder="Поиск..."/>
      <MySelect options={sortOptions}
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}/>
    </>
  )
}

export default TransactionFilter;