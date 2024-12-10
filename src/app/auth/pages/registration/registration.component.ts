import { Component, inject, OnDestroy } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { AuthComponent } from '../../auth.component';
import { AuthService } from '../../services/auth.service';
import { RegistrationForm } from '../../models/form.model';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnDestroy {
  serviceError = '';
  isLoading = false;
  private destroy$ = new Subject<void>();

  private router = inject(Router);
  private authService = inject(AuthService);

  onSignUp(formData: RegistrationForm): void {
    this.isLoading = true;

    this.authService
      .registerUserIfNotExists(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['auth/login']);
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
