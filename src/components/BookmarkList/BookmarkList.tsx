import React, {FC, ReactNode} from "react";
import cl from './BookmarkList.module.scss'

interface Tab {
  name: string;
  component: ReactNode;
}

interface BookmarkListProps {
  tabs: Tab[];
  onTabClick: (index: number) => void;
  activeTab: number;
}

const BookmarkList: FC<BookmarkListProps> = ({tabs, onTabClick, activeTab}) => {
  return (
    <ul className={cl.tabContainer}>
      {tabs.map((tab: Tab, index: number) => (
        <li key={tab.name}
            className={`${cl.tab} ${activeTab === index ? `${cl.active}` : ''}`}
            onClick={() => onTabClick(index)}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  )
}

export default BookmarkList;
