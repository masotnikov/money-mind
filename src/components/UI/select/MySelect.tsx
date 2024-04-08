import {FC} from "react";
import cl from './MySelect.module.scss'
interface IOption {
  name: string;
  value: string;
}

interface ISelect {
  options: IOption[];
  defaultValue: string;
  value: string;
  onChange: (value: string) => void
}

const MySelect: FC<ISelect> = ({options, defaultValue, value, onChange}) => {
  return (
    <select className={cl.root} value={value} onChange={e => onChange(e.target.value)}>
      <option disabled value="">{defaultValue}</option>
      {options.map(option => (
        <option key={option.name} value={option.value}>{option.name}</option>
      ))}
    </select>
  )
}

export default MySelect;