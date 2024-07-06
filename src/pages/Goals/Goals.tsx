import cl from './Goals.module.scss'
import MyButton from "../../shared/ui/Button/MyButton";
import React, { useState } from "react";
import { useGetAllGoalsQuery } from "../../services/GoalsService";
import Loader from "../../shared/ui/Loader/Loader";
import MyModal from "../../shared/ui/Modal/MyModal";
import AddGoalsForm from "../../components/AddGoalsForm/AddGoalsForm";
import GoalList from "../../components/GoalList/GoalList";
import { ErrorEnum } from "../../constants/enums";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Goals = () => {
  const [modal, setModal] = useState<boolean>(false);

  const { data: goals = [], isLoading: goalsLoading, error: goalsError } = useGetAllGoalsQuery();

  if (goalsLoading) {
    return <Loader/>
  }

  if (goalsError || !goals) {
    return <ErrorMessage>{ErrorEnum.STANDARD_ERROR_MESSAGE}</ErrorMessage>
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