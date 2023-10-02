import { ITask, Priority, Status, TForm } from "../../types";
import { ADD_TASK, DELETE_TASK } from "../actions/constants";

const initialState: {
  allTasks: ITask[];
  allProjects: string[];
} = {
  allTasks: [{
    id: "4214bef0-1a99-4e46-8173-dfb447769aa7",
    summary: 'Первая задача',
    priority: Priority.Low,
    description: 'Первая задача для примера',
    startDate: '09.03.2023',
    status: Status.Development,
    project: "project-one",
  }],
  allProjects: ["project-one"],
};

export const tasksReducer = (
  state = initialState,
  action: | {
    type: 'ADD_TASK';
    payload: TForm;
  }
    | {
      type: 'DELETE_TASK';
      payload: string;
    }
) => {
  switch (action.type) {
    case ADD_TASK: {
      const id = window.crypto.randomUUID();
      const newTask = {
        ...action.payload,
        id: id,
        project: state.allProjects[0],
      };
      const updatedAllTasks = [...state.allTasks, newTask];
      return {
        ...state,
        allTasks: updatedAllTasks,
      };
    }
    case DELETE_TASK: {
      const taskId = action.payload;
      const updatedAllTasks = state.allTasks.filter(task => task.id !== taskId);
      return {
        ...state,
        allTasks: updatedAllTasks,
      };
    }
    default: {
      return state;
    }
  }
};
