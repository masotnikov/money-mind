import {FC} from "react";
import cl from './MySelect.module.scss'
interface IOption {
  name: string;
  value: string;
  disabled?: boolean
}

interface ISelect {
  options: IOption[];
  value: string;
  onChange: (value: string) => void;
}

const MySelect: FC<ISelect> = ({options, value, onChange}) => {
  return (
    <select className={cl.root} value={value} onChange={e => onChange(e.target.value)}>
      {options.map(option => (
        <option disabled={option.disabled} key={option.name} value={option.value}>{option.name}</option>
      ))}
    </select>
  )
}

export default MySelect;