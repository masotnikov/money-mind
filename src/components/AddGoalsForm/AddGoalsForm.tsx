import React, {FC} from "react";
import MyInput from "../UI/input/MyInput";
import cl from "./AddGoals.module.scss"
import MyButton from "../UI/button/MyButton";
import {IGoal} from "../../@types/types";
import {useAddNewGoalMutation} from "../../API/GoalsService";
import {useForm} from "react-hook-form";

interface IAddGoalsForm {
  onClose: () => void
}

const AddGoalsForm: FC<IAddGoalsForm> = ({onClose}) => {
  const [addNewGoalMutation] = useAddNewGoalMutation();
  const {handleSubmit, reset, setValue, register} = useForm<IGoal>();

  const addNewGoal = async (goal: IGoal) => {
    await addNewGoalMutation(goal);
    onClose();
  }

  const onSubmit = (goal: IGoal) => {
    addNewGoal(goal);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.root}>
      <MyInput
        name="goalTitle"
        type="text"
        placeholder="Название цели"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("title", e.target.value);
        }}
      ></MyInput>
      <MyInput
        name="goalDescription"
        type="text"
        placeholder="Описание цели"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("description", e.target.value);
        }}
      ></MyInput>
      <MyInput
        name="goalAmount"
        type="number"
        placeholder="Необходимая сумма"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("amount", +e.target.value);
        }}
        register={register("amount", {required: true})}
      ></MyInput>
      <MyButton type="submit">Добавить</MyButton>
    </form>
  )
}

export default AddGoalsForm;