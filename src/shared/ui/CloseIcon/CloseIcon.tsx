import React from "react";
import cl from './CloseIcon.module.scss'
import closeIconSVG from '../../assets/icons/close-Icon.svg'

const CloseIcon = ({...props}) => {
  return (

    <img {...props}
         className={cl.closeIcon}
         src={closeIconSVG}
         title="удалить транзакцию"
         alt="remove-transaction"/>
  )
}

export default CloseIcon;