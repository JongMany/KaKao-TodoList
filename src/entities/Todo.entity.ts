export type Todo = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date | null;
  startDate: Date;
  deadline: Date;
  finishedAt: Date | null;
  isDone: boolean;
};

export type CreateTodo = {
  text: string;
  schedule: {
    startDate: Date;
    endDate: Date;
  };
};

export type EditTodo = {
  text: string;
  schedule: {
    startDate: Date;
    endDate: Date;
  };
};
