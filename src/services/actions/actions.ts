import { TForm } from "../../types";
import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "./constants";

export const addTask = (formData: TForm, formProject: string) => ({
  type: ADD_TASK,
  payload: { formData, formProject }
});

export const deleteTask = (taskId: string) => ({
  type: DELETE_TASK,
  payload: { taskId }
});

export const editTask = (editedTask: Partial<TForm>, taskId: string) => ({
  type: EDIT_TASK,
  payload: { editedTask, taskId }
});
