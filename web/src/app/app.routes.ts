import { Routes } from '@angular/router';
import { smartcontractsRoutes } from './modules/smartcontract';
import { isAuthenticatedGuard } from './guards';
import { loginRoutes } from './modules/login';

export const routes: Routes = [
  ...loginRoutes,
  {
    path: '',
    children: [
      ...smartcontractsRoutes
    ],
    canActivate: [isAuthenticatedGuard],
  }
];
