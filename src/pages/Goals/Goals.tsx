import cl from './Goals.module.scss'
import MyButton from "../../components/UI/button/MyButton";
import {useState} from "react";
import {useGetAllGoalsQuery} from "../../API/GoalsService";
import Loader from "../../components/UI/loader/Loader";
import RenderList from "../../components/RenderList/RenderList";
import goalItem from "../../components/GoalItem/GoalItem";

const Goals = () => {
  const [modal, setModal] = useState<boolean>(false);

  // @ts-ignore
  const {data: goals, isLoading: goalsLoading, error: goalsError} = useGetAllGoalsQuery();

  if (goalsLoading) {
    return <Loader/>
  }

  return (
    <div className={cl.root}>
      <MyButton>Создайте цель</MyButton>
      <RenderList
        emptyMessage={"Цели отсутствуют..."}
        renderData={goals}
        RenderItemComponent={goalItem}
      ></RenderList>
    </div>
  )
}

export default Goals;