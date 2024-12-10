import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { RegistrationForm } from './models/form.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  @Input() title!: string;
  @Input() buttonText!: string;
  @Input() linkText!: string;
  @Input() isLoading: boolean = false;
  @Input() isSignUp: boolean = false;
  @Input() serviceError = '';
  @Output() submitForm = new EventEmitter<RegistrationForm>();

  form!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (this.isSignUp) {
      this.form.addControl('name', this.fb.control('', [Validators.required]));
      this.form.addControl(
        'agree',
        this.fb.control(false, [Validators.requiredTrue])
      );
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      this.submitForm.emit(this.form.value);
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);

    if (control?.hasError('required')) {
      return 'Field is required';
    }

    if (control?.hasError('email')) {
      return 'Not a valid email';
    }

    if (control?.hasError('minlength')) {
      const currentLength = control.value?.length || 0;
      return `Password length must be more than ${control.errors?.['minlength'].requiredLength} symbols. Now ${currentLength}`;
    }

    return null;
  }
}
