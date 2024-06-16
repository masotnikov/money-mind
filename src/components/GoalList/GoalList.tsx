import {FC} from "react";
import cl from "../TransactionList/TransactionList.module.scss";
import GoalItem from "../GoalItem/GoalItem";
import {IGoal} from "../../@types/IGoal";

export interface IGoalList {
  renderList: IGoal[];
  title?: string;
  emptyMessage: string;
  children?: React.ReactNode;
}

const GoalList: FC<IGoalList> = ({title, children, renderList, emptyMessage}) => {

  return (
    <div className={cl.root}>
      <h3 className={cl.title}>{title}</h3>
      {children}
      {renderList?.length === 0 && <h2 className={cl.emptyMessage}>{emptyMessage}</h2>}
      <ul className={cl.list}>
        {renderList.map(goal => (
          <GoalItem goal={goal} key={goal?.id}/>
        ))}
      </ul>
    </div>
  )
}

export default GoalList;