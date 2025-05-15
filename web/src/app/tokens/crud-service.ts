import { InjectionToken } from '@angular/core';

import { CrudService } from '@app/models';

export const CRUD_SERVICE = new InjectionToken<CrudService<unknown>>(
  'CRUD_SERVICE',
);
