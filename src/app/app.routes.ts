import { Routes } from '@angular/router';

import { authRedirectGuard } from './guards/auth-redirect.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
 {
    path: '',
    component: AppComponent,
    canActivate: [authRedirectGuard],
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  }
];
