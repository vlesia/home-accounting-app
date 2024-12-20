import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('user');

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
