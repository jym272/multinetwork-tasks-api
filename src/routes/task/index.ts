import { Router } from 'express';
import { taskController } from '@controllers/task';
import { utilsController } from '@controllers/utils';

export const task = Router();
task.get('/get-all', utilsController.handleToken, taskController.getAll);
task.post('/new-task', utilsController.handleToken, taskController.newTask);
task.post('/update-task/:id', utilsController.handleToken, taskController.updateTask);
task.delete('/delete-task/:id', utilsController.handleToken, taskController.deleteTask);
