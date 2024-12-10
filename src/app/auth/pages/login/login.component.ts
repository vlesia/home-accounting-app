import { Component, inject, OnDestroy } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { AuthComponent } from '../../auth.component';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../models/form.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  serviceError = '';
  isLoading = false;
  private destroy$ = new Subject<void>();

  private router = inject(Router);
  private authService = inject(AuthService);

  onSignIn(formData: LoginForm): void {
    this.isLoading = true;

    this.authService
      .loginUser(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (userData) => {
          localStorage.setItem('user', JSON.stringify(userData));

          this.router.navigate(['home']);
        },
        error: (err) => {
          this.serviceError = err.message;

          setTimeout(() => {
            this.serviceError = '';
          }, 5000);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
