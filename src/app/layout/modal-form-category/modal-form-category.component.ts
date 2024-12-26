import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
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
    ReactiveFormsModule,
  ],
  templateUrl: './modal-form-category.component.html',
  styleUrl: './modal-form-category.component.scss',
})
export class ModalFormCategoryComponent implements OnInit {
  public form!: FormGroup;

  private dialogRef = inject(MatDialogRef<ModalFormCategoryComponent>);
  private fb = inject(FormBuilder);

  public ngOnInit(): void {
    this.form = this.fb.group({
      category: ['', Validators.required],
      limit: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  public onClose(): void {
    this.dialogRef.close(null);
  }
}
