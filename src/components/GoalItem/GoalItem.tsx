import {IGoal} from "../../@types/types";
import React, {FC} from "react";
import cl from './GoalItem.module.scss'
import ProgressBar from "../UI/progressBar/ProgressBar";
import {useSoftDeleteGoalMutation} from "../../API/GoalsService";

interface IGoalItemProps {
  item: IGoal;
}


const GoalItem: FC<IGoalItemProps> = ({item: goal}) => {
  const {title, amount, status, description, progress} = goal
  const [updateGoal] = useSoftDeleteGoalMutation();

  const handleRemove = async () => {
    // @ts-ignore
    const {error} = await updateGoal(goal.id);
    if (error) {
      console.log(error, 'Произошла ошибка при обновлении цели');
      return
    }
    console.log('Цель успешно обновлена');
  }


  return (
    <div className={cl.root}>
      <ul>
        <li>Цель: <span className={cl.title}>{title}</span></li>
        <li>Описание: <span>{description}</span></li>
        <li>Сумма: <span>{amount}</span></li>
        <li className={cl.progressItem}>
          Прогресс: <ProgressBar progress={progress}/> {progress}%
        </li>
        <li>
          Статус: <span className={status === "Активно" ? cl.activeStatus : ''}>{status}</span>
        </li>
      </ul>
      <img onClick={handleRemove} className={cl.closeIcon} src="/close.png" title="удалить транзакцию"
           alt="remove-transaction"/>
      <hr style={{margin: '10px 0'}}/>
    </div>
  )
}

export default GoalItem;