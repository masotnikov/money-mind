import {FC} from "react";
import cl from './ErrorMessage.module.scss'

interface IErrorMessage {
  children: string
}

const ErrorMessage: FC<IErrorMessage> = ({children}) => {
  return (
    <h2 className={cl.root}>{children}</h2>
  )
}

export default ErrorMessage;