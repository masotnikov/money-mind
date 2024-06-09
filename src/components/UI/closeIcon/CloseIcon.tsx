import React from "react";
import cl from './CloseIcon.module.scss'
// @ts-ignore
import closeIcon from '../../../assets/icons/close-Icon.svg'

const CloseIcon = ({...props}) => {
  return (

    <img {...props}
         className={cl.closeIcon}
         src={closeIcon}
         title="удалить транзакцию"
         alt="remove-transaction"/>
  )
}

export default CloseIcon;