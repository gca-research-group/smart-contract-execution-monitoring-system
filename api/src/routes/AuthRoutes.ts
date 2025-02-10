import * as AuthController from './../controllers/AuthController';
import { Router } from 'express';

const loginRoutes = Router();

loginRoutes.post('/login', AuthController.login);
loginRoutes.post('/refresh-token', AuthController.refresh);

export default loginRoutes;
