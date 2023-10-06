import { ITask, Priority, Status, TForm } from "../../types";
import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "../actions/constants";
import dayjs from "dayjs";

interface IEditTaskPayload {
  editedTask: Partial<TForm>;
  taskId: string;
}

const initialState: {
  allTasks: ITask[];
  allProjects: string[];
} = {
  allTasks: [
    {
      id: "1",
      summary: "Первая задачка",
      subTasks: ["2"],
      priority: Priority.Medium,
      description: "Это первая задачка для теста",
      startDate: "02/10/2023",
      status: Status.Development,
      project: "project-one",
      comments: "Тут можно оставить комментарий",
    },
    {
      id: "2",
      summary: "Вторая задачка",
      priority: Priority.High,
      description: "Это вторая задачка для теста",
      startDate: "01/10/2023",
      endDate: "02/10/2023",
      status: Status.Done,
      project: "project-one",
    },
    {
      id: "123",
      summary: "Задача второго проекта",
      priority: Priority.Low,
      description: "Второй проект, не первый)",
      startDate: "10/04/2023",
      endDate: "10/06/2023",
      status: Status.Queue,
      project: "project-two",
    },
  ],
  allProjects: ["project-one", "project-two"],
};

export const tasksReducer = (
  state = initialState,
  action:
    | {
        type: "ADD_TASK";
        payload: {
          formData: TForm,
          formProject: string
        };
      }
    | {
        type: "DELETE_TASK";
        payload: string;
      }
    | {
        type: "EDIT_TASK";
        payload: IEditTaskPayload;
      }
) => {
  switch (action.type) {
    case ADD_TASK: {
      const id = window.crypto.randomUUID();
      const project = action.payload.formProject;
      const newTask = {
        ...action.payload.formData,
        id: id,
        project: project,
      };
      const updatedAllTasks = [...state.allTasks, newTask];
      return {
        ...state,
        allTasks: updatedAllTasks,
      };
    }
    case DELETE_TASK: {
      const taskId = action.payload;
      const updatedAllTasks = state.allTasks.filter(
        (task) => task.id !== taskId
      );
      return {
        ...state,
        allTasks: updatedAllTasks,
      };
    }
    case EDIT_TASK: {
      const { editedTask, taskId } = action.payload;

      const updatedAllTasks = state.allTasks.map((task) => {
        if (task.id === taskId) {
          const date: {
            startDate?: string | null;
            endDate?: string | null;
          } = {};

          if (editedTask.status === Status.Development) {
            date.startDate = dayjs().format();
            date.endDate = null;
          }

          if (editedTask.status === Status.Done) {
            date.endDate = dayjs().format();
          }

          if (editedTask.status === Status.Queue) {
            date.startDate = null;
            date.endDate = null;
          }

          return {
            ...task,
            ...editedTask,
            ...date,
          };
        }
        return task;
      });
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
