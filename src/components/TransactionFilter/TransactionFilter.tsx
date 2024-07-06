import {FC, memo} from "react";
import MySelect from "../../shared/ui/Select/MySelect";
import MyInput from "../../shared/ui/Input/MyInput";
import {monthOptions, selectOptions} from "../../pages/Transactions/selectOptions";
import {IFilter} from "../../@types/IFilter";


export interface ITransactionFilter {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
}



const TransactionFilter: FC<ITransactionFilter> = memo(({filter, setFilter}) => {
    return (
      <>
        <MyInput value={filter.query}
                 onChange={e => setFilter({...filter, query: e.target.value})}
                 placeholder="Поиск..."/>
        <MySelect options={selectOptions}
                  value={filter.sort}
                  onChange={selectedSort => setFilter({...filter, sort: selectedSort})}/>
        <MySelect options={monthOptions}
                  value={filter.month}
                  onChange={selectedSort => setFilter({...filter, month: selectedSort})}/>
      </>
    )
  }
)
export default TransactionFilter;