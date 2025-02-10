import * as HealthCheckController from './../controllers/HealthCheckController';
import { Router } from 'express';

const healthCheckRoutes = Router();

healthCheckRoutes.get('/healthcheck', HealthCheckController.index);

export default healthCheckRoutes;
