import { Router } from 'express';

import * as AuthController from './../controllers/AuthController';

const loginRoutes = Router();

loginRoutes.post('/login', AuthController.login);
loginRoutes.post('/refresh-token', AuthController.refresh);

export default loginRoutes;
