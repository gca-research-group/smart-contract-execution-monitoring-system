import { Routes } from '@angular/router';

import { isAuthenticatedGuard } from './guards';
import { loginRoutes } from './modules/login';
import { smartcontractsRoutes } from './modules/smartcontract';

export const routes: Routes = [
  ...loginRoutes,
  {
    path: '',
    children: [...smartcontractsRoutes],
    canActivate: [isAuthenticatedGuard],
  },
];
