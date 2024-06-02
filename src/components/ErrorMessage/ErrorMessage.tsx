import {FC} from "react";

interface IErrorMessage {
  children: string
}
const ErrorMessage: FC<IErrorMessage> = ({children}) => {
  return (
    <h2>{children}</h2>
  )
}

export default ErrorMessage;