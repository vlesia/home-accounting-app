import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { BillingComponent } from './pages/billing/billing.component';
import { HistoryComponent } from './pages/history/history.component';
import { RecordComponent } from './pages/record/record.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      { path: 'billing', component: BillingComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'record', component: RecordComponent },
      { path: '', redirectTo: 'billing', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
];
