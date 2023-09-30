import { ITask, TForm } from "../../types";
import { ADD_TASK } from "../actions/constants";

const initialState: {
  allTasks: ITask[];
  allProjects: string[];
} = {
  allTasks: [],
  allProjects: ["project-one"],
};

export const tasksReducer = (
  state = initialState,
  action: {
    type: string;
    payload: TForm;
  }
) => {
  switch (action.type) {
    case ADD_TASK: {
      const newTask = {
        ...action.payload,
        number: state.allTasks.length + 1, 
        project: state.allProjects[0], 
      };
      const updatedAllTasks = [...state.allTasks, newTask];
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
