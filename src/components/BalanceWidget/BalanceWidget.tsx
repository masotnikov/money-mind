import React, {useState} from "react";
import cl from './BalanceWidget.module.scss'
import BookmarkList from "../BookmarkList/BookmarkList";
import CurrentAccount from "../CurrentAccount/CurrentAccount";
import SavingsAccount from "../SavingsAccount/SavingsAccount";


const bookmarks: string[] = [
  'Текущий счёт',
  'Накопительный счёт'
];

const BalanceWidget = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  }

  return (
    <div className={cl.root}>
      <BookmarkList tabs={bookmarks} activeTab={activeTab} onTabClick={handleTabClick}/>
      {activeTab === 0 ?
        <CurrentAccount/>
        :
        <SavingsAccount/>
      }
    </div>
  )
}

export default BalanceWidget;
