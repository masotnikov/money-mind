import {IGoal} from "../../@types/types";
import React, {FC} from "react";
import cl from './GoalItem.module.scss'
import ProgressBar from "../UI/progressBar/ProgressBar";
import {useSoftDeleteGoalMutation} from "../../services/GoalsService";
import {useGetBalanceAndExpensesQuery} from "../../services/TransactionService";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Hr from "../UI/hr/hr";
import CloseIcon from "../UI/closeIcon/CloseIcon";

interface IGoalItemProps {
  goal: IGoal;
}


const GoalItem: FC<IGoalItemProps> = ({goal}) => {
  const [updateGoal] = useSoftDeleteGoalMutation();
  const {data: balance} = useGetBalanceAndExpensesQuery();


  const handleRemove = async () => {
    try {
      await updateGoal(goal?.id).unwrap();
    } catch (error) {
      const apiError = error as FetchBaseQueryError;
      console.error(apiError, 'Произошла ошибка при удалении цели');
    }
  }

  const calculateProgress = () => {
    let progressInPercentage: number = 0;
    if (balance?.saving && goal?.amount) {
      progressInPercentage = (balance.saving / goal.amount) * 100
    }
    return Math.ceil(progressInPercentage)
  }

  const progress: number = calculateProgress();

  return (
    <div className={cl.root}>
      <ul className={cl.list}>
        <li>Цель: <span className={cl.title}>{goal?.title}</span></li>
        <li>Описание: <span>{goal?.description}</span></li>
        <li>Сумма: <span>{goal?.amount} руб.</span></li>
        <li className={cl.progressItem}>
          Прогресс: <ProgressBar progress={progress}/> {progress > 100 ? 100 : progress}%
        </li>
        <li>
          Статус: <span
          className={progress >= 100 ? cl.statusDone : cl.activeStatus}>{progress >= 100 ? "Выполнено" : "Активно"}</span>
        </li>
      </ul>
      <CloseIcon onClick={handleRemove}/>
      <Hr/>
    </div>
  )
}

export default GoalItem;