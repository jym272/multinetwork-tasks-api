import express from 'express';
import { home } from '@routes/home';
import { utils } from '@routes/utils';
import { task } from '@routes/task';

const routes = [home, task, utils];

export const addRoutes = (server: express.Express) => {
  for (const route of routes) {
    server.use(route);
  }
};
