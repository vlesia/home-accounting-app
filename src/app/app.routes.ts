import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { BillingComponent } from './pages/billing/billing.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'billing', component: BillingComponent, data: { title: 'Billing Page' } },
      { path: '', redirectTo: 'billing', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
];
