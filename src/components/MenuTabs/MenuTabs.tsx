import cl from './MenuTabs.module.scss'
import {useState} from "react";
import {Link} from "react-router-dom";

interface Tab {
  category: string;
  name: string;
}

const MenuTabs = () => {
  const tabs: Tab[] = [
    { category: "Главная", name: "main" },
    { category: "Транзакции", name: "transactions" },
    { category: "Цели", name: "goals" },
    { category: "Аналитика", name: "analytics" },
    { category: "Настройки", name: "settings" }
  ];

  const [categoryId, setCategoryId] = useState<number>(0);

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
  )
}

export default MenuTabs;