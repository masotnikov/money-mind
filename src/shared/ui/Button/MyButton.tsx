import React, { ButtonHTMLAttributes, FC } from "react";
import cl from './MyButton.module.scss'
import { classNames } from "../../lib/сlassNames/classNames";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const MyButton: FC<MyButtonProps> = (props) => {
  const {
    className = '',
    children,
    ...otherProps
  } = props
  return (
    <button className={classNames(cl.MyButton, {}, [className])} {...otherProps}>{children}</button>
  )
}

export default MyButton;