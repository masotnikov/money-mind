import React from "react";
import { FC } from "react";
import cl from './MySelect.module.scss'
import { ISelect } from "../../../@types/types";

const MySelect: FC<ISelect> = ({ options, value, onChange, register, ...props}) => {
  return (
    <select {...register} {...props} className={cl.root} value={value} onChange={e => onChange(e.target.value)}>
      {options.map(option => (
        <option disabled={option.disabled} key={option.name} value={option.value}>{option.name}</option>
      ))}
    </select>);
}

export default MySelect;
