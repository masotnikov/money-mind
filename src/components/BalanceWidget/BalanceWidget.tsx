import React, {useState} from "react";
import cl from './BalanceWidget.module.scss'
import BookmarkList from "../BookmarkList/BookmarkList";
import CurrentAccount from "../CurrentAccount/CurrentAccount";
import SavingsAccount from "../SavingsAccount/SavingsAccount";

const CURRENT_ACCOUNT: string = 'Текущий счёт';
const SAVING_ACCOUNT: string = 'Накопительный счёт';

const bookmarks = [
  {name: CURRENT_ACCOUNT, component: <CurrentAccount/>},
  {name: SAVING_ACCOUNT, component: <SavingsAccount/>}
];

const BalanceWidget = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  }

  return (
    <div className={cl.root}>
      <BookmarkList tabs={bookmarks} activeTab={activeTab} onTabClick={handleTabClick}/>
      {bookmarks[activeTab].component}
    </div>
  )
}

export default BalanceWidget;
