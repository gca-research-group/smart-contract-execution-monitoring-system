import { Router } from 'express';

import authRoutes from './AuthRoutes';
import healthCheckRoutes from './HealthCheckRoutes';

const routes = Router();

routes.use(authRoutes);
routes.use(healthCheckRoutes);

export default routes;
