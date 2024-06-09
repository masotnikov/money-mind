import cl from './MenuTabs.module.scss'
import {Link} from "react-router-dom";
import {ITab} from "../../@types/types";
import {useActiveTab} from "../../hooks/useActiveTabe";


const MenuTabs = () => {
  const tabs: ITab[] = [
    {category: "Главная", name: "main"},
    {category: "Транзакции", name: "transactions"},
    {category: "Цели", name: "goals"},
    {category: "Аналитика", name: "analytics"},
    {category: "Настройки", name: "settings"}
  ];

  const [categoryId, setCategoryId] = useActiveTab(tabs);

  return (
    <div className={cl.root}>
      <nav>
        <ul>
          {
            tabs.map((tab, index) => (
              <Link to={`/${tab.name.toLowerCase()}`}
                       onClick={() => setCategoryId(index)}
                       className={`${cl.link} ${categoryId === index ? cl.active : ''}`}
                       key={tab.name}
              >
                {tab.category}
              </Link>
            ))
          }
        </ul>
      </nav>
    </div>
  );}
export default MenuTabs;