import {FC} from "react";
import {IGoalList} from "../../@types/types";
import cl from "../TransactionList/TransactionList.module.scss";
import GoalItem from "../GoalItem/GoalItem";


const GoalList: FC<IGoalList> = ({title, children, renderList, emptyMessage}) => {
  return (
    <div className={cl.root}>
      <h3>{title}</h3>
      {children}
      {renderList?.length === 0 && <h2>{emptyMessage}</h2>}
      <ul className={cl.list}>
        {renderList.map(goal => (
          <GoalItem goal={goal} key={goal?.id}/>
        ))}
      </ul>
    </div>
  )
}

export default GoalList;