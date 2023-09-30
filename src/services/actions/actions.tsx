import { ADD_TASK } from "./constants";

export const addTask = (formData: TForm) => ({
    type: ADD_TASK,
    payload: formData,
  });