export interface ITask {
  id: string;
  summary: string;
  subTasks?: number[];
  priority: Priority;
  description: string;
  startDate?: string | null;
  endDate?: string | null;
  status: Status;
  files?: string[];
  project: string;
  comments?: string
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Status {
  Queue = 'Queue',
  Development = 'Development',
  Done = 'Done',
}

export type TForm = Omit<ITask, 'project' | 'id'>