import { Sequelize } from 'sequelize-typescript';
import { User } from '@app/models';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require('../config/database');

const sequelize = new Sequelize(config);

const models = [User];

sequelize.addModels(models);

export default sequelize;
