export interface ITask {
  id: string;
  summary: string;
  subTasks?: number[];
  priority: Priority;
  description: string;
  startDate?: string;
  endDate?: string;
  status: Status;
  files?: string[];
  project: string;
}

export enum Priority {
  Low,
  Medium,
  High,
}

export enum Status {
  Queue,
  Development,
  Done,
}

export type TForm = Omit<ITask, 'project' | 'id'>