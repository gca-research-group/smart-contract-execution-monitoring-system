import { Routes } from '@angular/router';

import { isAuthenticatedGuard } from '@app/guards';

import { blockchainRoutes } from './blockchain';
import { smartContractRoutes } from './smart-contract';
import { SmartContractExecutionRoutes } from './smart-contract-execution';
import { WrapperComponent } from './wrapper';

export const privateRoutes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      ...blockchainRoutes,
      ...SmartContractExecutionRoutes,
      ...smartContractRoutes,
    ],
    canActivate: [isAuthenticatedGuard],
  },
];
