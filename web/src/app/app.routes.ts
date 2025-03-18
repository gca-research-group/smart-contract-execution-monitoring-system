import { Routes } from '@angular/router';

import { isAuthenticatedGuard } from './guards';
import { loginRoutes } from './modules/login';
import { smartContractRoutes } from './modules/smart-contract';

export const routes: Routes = [
  ...loginRoutes,
  {
    path: '',
    children: [...smartContractRoutes],
    canActivate: [isAuthenticatedGuard],
  },
];
