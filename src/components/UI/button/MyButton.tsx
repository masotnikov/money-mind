import React, {ButtonHTMLAttributes, FC} from "react";
import cl from './MyButton.module.scss'

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
}

const MyButton: FC<MyButtonProps> = ({children, ...props}) => {
  return (
    <button className={cl.MyButton} {...props}>{children}</button>
  )
}

export default MyButton;