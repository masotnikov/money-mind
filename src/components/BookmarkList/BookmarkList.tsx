import React, { FC } from "react";
import cl from './BookmarkList.module.scss'


interface BookmarkListProps {
  tabs: string[];
  onTabClick: (index: number) => void;
  activeTab: number;
}

const BookmarkList: FC<BookmarkListProps> = ({ tabs, onTabClick, activeTab }) => {
  return (
    <ul className={cl.tabContainer}>
      {tabs.map((tab: string, index: number) => (
        <li key={tab}
            className={`${cl.tab} ${activeTab === index ? `${cl.active}` : ''}`}
            onClick={() => onTabClick(index)}
        >
          {tab}
        </li>
      ))}
    </ul>
  )
}

export default BookmarkList;
