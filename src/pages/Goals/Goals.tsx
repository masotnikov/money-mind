import cl from './Goals.module.scss'
import MyButton from "../../components/UI/button/MyButton";
import {useState} from "react";
import {useGetAllGoalsQuery} from "../../API/GoalsService";
import Loader from "../../components/UI/loader/Loader";
import RenderList from "../../components/RenderList/RenderList";
import goalItem from "../../components/GoalItem/GoalItem";
import MyModal from "../../components/UI/modal/MyModal";
import AddGoalsForm from "../../components/AddGoalsForm/AddGoalsForm";

const Goals = () => {
  const [modal, setModal] = useState<boolean>(false);

  // @ts-ignore
  const {data: goals, isLoading: goalsLoading, error: goalsError} = useGetAllGoalsQuery();

  if (goalsLoading) {
    return <Loader/>
  }

  const handleCloseModal = (): void => {
    setModal(false);
  }

  return (
    <div className={cl.root}>
      <MyButton onClick={() => setModal(true)}>Создайте цель</MyButton>
      <MyModal modal={modal} setModal={setModal}>
          <AddGoalsForm onClose={handleCloseModal}/>
      </MyModal>
      <RenderList
        emptyMessage={"Цели отсутствуют..."}
        renderData={goals}
        RenderItemComponent={goalItem}
      ></RenderList>
    </div>
  )
}

export default Goals;