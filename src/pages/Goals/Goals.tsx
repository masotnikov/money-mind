import cl from './Goals.module.scss'
import MyButton from "../../components/UI/button/MyButton";
import {useState} from "react";
import {useGetAllGoalsQuery} from "../../API/GoalsService";
import Loader from "../../components/UI/loader/Loader";
import MyModal from "../../components/UI/modal/MyModal";
import AddGoalsForm from "../../components/AddGoalsForm/AddGoalsForm";
import GoalList from "../../components/GoalList/GoalList";

const Goals = () => {
  const [modal, setModal] = useState<boolean>(false);

  const {data: goals = [], isLoading: goalsLoading, error: goalsError} = useGetAllGoalsQuery();

  if (goalsLoading) {
    return <Loader/>
  }

  if (goalsError) {
    return <h1 className={cl.errorMessage}>Извините, произошла ошибка</h1>
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
      <GoalList renderList={goals} emptyMessage={"Цели отсутствуют..."}/>
    </div>
  )
}

export default Goals;