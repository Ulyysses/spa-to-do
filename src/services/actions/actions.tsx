import { TForm } from "../../types";
import { ADD_TASK, DELETE_TASK } from "./constants";


export const addTask = (formData: TForm) => ({
  type: ADD_TASK,
  payload: formData,
});

export const deleteTask = (taskId: string) => ({
  type: DELETE_TASK,
  payload: { taskId },
});