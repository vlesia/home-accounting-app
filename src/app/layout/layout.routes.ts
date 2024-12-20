import { Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'billing',
        loadComponent: () =>
          import('../pages/billing/billing.component').then(
            (c) => c.BillingComponent
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('../pages/history/history.component').then(
            (c) => c.HistoryComponent
          ),
      },
      {
        path: 'record',
        loadComponent: () =>
          import('../pages/record/record.component').then(
            (c) => c.RecordComponent
          ),
      },
      { path: '', redirectTo: 'billing', pathMatch: 'full' },
    ],
  },
];
