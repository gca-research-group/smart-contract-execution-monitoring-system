import { Sequelize } from 'sequelize-typescript';

import {
  Carrier,
  CarrierContact,
  Driver,
  Freight,
  ServiceMonitoring,
  Truck,
  User,
} from '@app/models';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require('../config/database');

const sequelize = new Sequelize(config);

const models = [
  Driver,
  Truck,
  Freight,
  Carrier,
  CarrierContact,
  User,
  ServiceMonitoring
];

sequelize.addModels(models);

export default sequelize;
