import React from "react";
import cl from './CloseIcon.module.scss'

const CloseIcon = ({...props}) => {
  return (

    <img {...props}
         className={cl.closeIcon}
         src='../../../assets/icons/close-Icon.svg'
         title="удалить транзакцию"
         alt="remove-transaction"/>
  )
}

export default CloseIcon;