export const SmartContractExecutionRoutes = [
  {
    path: 'smart-contract-execution',
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
