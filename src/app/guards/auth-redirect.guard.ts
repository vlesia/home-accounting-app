import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('user');

  if (isLoggedIn) {
    return router.parseUrl('/home');
  }

  return router.parseUrl('/auth/login');
};
