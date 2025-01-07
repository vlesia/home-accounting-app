import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Category } from '../../models/history.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-modal-form-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-form-category.component.html',
  styleUrl: './modal-form-category.component.scss',
})
export class ModalFormCategoryComponent implements OnInit {
  public form!: FormGroup;
  public title = '';

  private dialogRef = inject(MatDialogRef<ModalFormCategoryComponent>);
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  private userService = inject(UserService);

  public get user(): User | null {
    return this.userService.getUser();
  }

  public ngOnInit(): void {
    this.title = this.data.title;

    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  public submitFormData(formCategory: Omit<Category, 'id' | 'userId'>): void {
    this.dialogRef.close({
      name: formCategory.name,
      capacity: +formCategory.capacity,
      userId: this.user!.id,
    });
  }

  public onClose(): void {
    this.dialogRef.close(null);
  }
}
