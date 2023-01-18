export interface NewTaskType {
  name: string;
  description: string;
}

export type StatusType = 'new' | 'in-progress' | 'done';

export interface TaskType extends NewTaskType {
  status: StatusType;
}

export interface DecodedToken {
  permissions: {
    authenticate: boolean;
  };
}
