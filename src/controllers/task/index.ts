import { getAllController } from '@controllers/task/getAll';
import { newTaskController } from '@controllers/task/newTask';

export const taskController = {
  getAll: getAllController(),
  newTask: newTaskController()
};
