import React, {FC} from "react";
import {IModal} from "../../../@types/types";
import cl from './MyModal.module.css'
const MyModal: FC<IModal> = ({children, setModal, modal}) => {

const rootClasses = [cl.MyModal];

if (modal) {
  rootClasses.push(cl.active);
}
const handleClick = () => {
  setModal(false);
}
  return (
    <div className={rootClasses.join(' ')} onClick={handleClick}>
      <div className={cl.MyModalContent}  onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation() }>
        {children}
      </div>
    </div>
  )
}

export default MyModal;