import { InjectionToken } from '@angular/core';

import { Breadcrumb } from '@app/models';

export const BREADCRUMB = new InjectionToken<Breadcrumb[]>('BREADCRUMB');
