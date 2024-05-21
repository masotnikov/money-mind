import React from "react";
import { FC } from "react";
import cl from './MySelect.module.scss'
import { ISelect } from "../../../@types/types";

const MySelect: FC<ISelect> = ({ options, value, onChange, register, ...props}) => {
  return (
    <select {...register} {...props} className={cl.root} value={value} onChange={e => onChange(e.target.value)}>
      {options.map((option,index: number) => (
        <option disabled={option.disabled} key={index} value={option.value}>{option.name}</option>
      ))}
    </select>);
}

export default MySelect;
