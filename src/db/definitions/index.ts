import { Sequelize } from 'sequelize';

import * as task from '@db/definitions/Task';

const appLabels = [task];

export const initDefinitions = (sequelize: Sequelize) => {
  for (const label of appLabels) {
    label.init(sequelize);
  }
};
