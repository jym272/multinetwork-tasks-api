import { getAllController } from '@controllers/task/getAll';
import { newTaskController } from '@controllers/task/newTask';
import { updateTaskController } from '@controllers/task/updateTask';
import { deleteTaskController } from '@controllers/task/deleteTask';

export const taskController = {
  getAll: getAllController(),
  newTask: newTaskController(),
  updateTask: updateTaskController(),
  deleteTask: deleteTaskController()
};
