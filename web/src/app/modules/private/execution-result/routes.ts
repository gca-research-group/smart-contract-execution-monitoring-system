export const executionResultRoutes = [
  {
    path: 'execution-result',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./list/list.component').then(m => m.ListComponent),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./form/form.component').then(m => m.FormComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./form/form.component').then(m => m.FormComponent),
      },
    ],
  },
];
