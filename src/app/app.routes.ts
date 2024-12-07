import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/signup', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.authRoutes),
  },
];
