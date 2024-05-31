import {ITab} from "../@types/types";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";


export const useActiveTab = (tabs: ITab[]) => {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const findCurrentTabIndex = useCallback(() => {
    return tabs.findIndex((tab: ITab) => `/${tab.name.toLowerCase()}` === location.pathname)
  }, [location.pathname, tabs]);
  console.log(location)

  useEffect(() => {
    const currentTabIndex: number = findCurrentTabIndex();
    setActiveTabIndex(currentTabIndex !== -1 ? currentTabIndex : 0)
  }, [location.pathname, findCurrentTabIndex]);

  return [activeTabIndex, setActiveTabIndex] as const;

}