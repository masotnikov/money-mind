import {FC, InputHTMLAttributes} from "react";
import cl from './MyInput.module.scss'
interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{}

const MyInput: FC<IInputProps> = (props) => {
  return (
    <input className={cl.MyInput} {...props} type="text"/>
  )
}

export default MyInput;