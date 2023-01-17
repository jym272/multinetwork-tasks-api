import { Router } from 'express';
import { taskController } from '@controllers/task';

export const task = Router();

task.get('/get-all', taskController.getAll);
task.post('/new-task', taskController.newTask);
