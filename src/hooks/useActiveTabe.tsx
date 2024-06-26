import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {ITab} from "../@types/ITab";


export const useActiveTab = (tabs: ITab[]) => {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const findCurrentTabIndex = useCallback(() => {
    return tabs.findIndex((tab: ITab) => `/${tab.name.toLowerCase()}` === location.pathname)
  }, [location.pathname, tabs]);

  useEffect(() => {
    const currentTabIndex: number = findCurrentTabIndex();
    setActiveTabIndex(currentTabIndex !== -1 ? currentTabIndex : 0)
  }, [location.pathname, findCurrentTabIndex]);

  return [activeTabIndex, setActiveTabIndex] as const;

}