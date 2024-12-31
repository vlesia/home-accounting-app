import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
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

@Component({
  selector: 'app-modal-form-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-form-category.component.html',
  styleUrl: './modal-form-category.component.scss',
})
export class ModalFormCategoryComponent implements OnInit {
  public form!: FormGroup;
  public showSelector = false;
  public categories: Category[] = [];
  public title = '';

  private dialogRef = inject(MatDialogRef<ModalFormCategoryComponent>);
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);

  public ngOnInit(): void {
    this.showSelector = this.data.showSelector;
    this.categories = this.data.categories;
    this.title = this.data.title;

    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    if (this.showSelector) {
      this.form.addControl(
        'category',
        this.fb.control(this.data.category.id || '', Validators.required),
      );
    }

    if (this.data.category) {
      this.form.patchValue(this.data.category);
    }
  }

  public onClose(): void {
    this.dialogRef.close(null);
  }
}
