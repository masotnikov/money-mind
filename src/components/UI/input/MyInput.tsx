import {FC, InputHTMLAttributes} from "react";
import cl from './MyInput.module.scss'
interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
  register?: any
}

const MyInput: FC<IInputProps> = ({register, ...props}) => {
  return (
    <input className={cl.MyInput} {...register} {...props}/>
  )
}

export default MyInput;