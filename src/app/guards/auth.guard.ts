import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('user');

  if (isLoggedIn) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
