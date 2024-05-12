import {IGoal} from "../../@types/types";
import React, {FC} from "react";
import cl from './GoalItem.module.scss'
import ProgressBar from "../UI/progressBar/ProgressBar";
import {useSoftDeleteGoalMutation} from "../../API/GoalsService";
import {useGetBalanceAndExpensesQuery} from "../../API/TransactionService";

interface IGoalItemProps {
  item: IGoal;
}


const GoalItem: FC<IGoalItemProps> = ({item: goal}) => {
  const [updateGoal] = useSoftDeleteGoalMutation();
  // @ts-ignore
  const {data: balance} = useGetBalanceAndExpensesQuery();


  const handleRemove = async () => {
    // @ts-ignore
    const {error} = await updateGoal(goal?.id);
    if (error) {
      console.log(error, 'Произошла ошибка при обновлении цели');
      return
    }
    console.log('Цель успешно обновлена');
  }

  const calculateProgress = () => {
    let progressInPercentage: number = 0;
    if (balance?.saving && goal?.amount) {
      progressInPercentage = (balance.saving / goal.amount) * 100
    }
    return Math.ceil(progressInPercentage)
  }

  const progress : number = calculateProgress();

  return (
    <div className={cl.root}>
      <ul>
        <li>Цель: <span className={cl.title}>{goal?.title}</span></li>
        <li>Описание: <span>{goal?.description}</span></li>
        <li>Сумма: <span>{goal?.amount} руб.</span></li>
        <li className={cl.progressItem}>
          Прогресс: <ProgressBar progress={progress}/> {progress > 100 ? 100 : progress}%
        </li>
        <li>
          Статус: <span className={progress >= 100 ? cl.statusDone : cl.activeStatus}>{progress >= 100 ? "Выполнено" : "Активно"}</span>
        </li>
      </ul>
      <img onClick={handleRemove} className={cl.closeIcon} src="/close.png" title="удалить транзакцию"
           alt="remove-transaction"/>
      <hr style={{margin: '10px 0'}}/>
    </div>
  )
}

export default GoalItem;