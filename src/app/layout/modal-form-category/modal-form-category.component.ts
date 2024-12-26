import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
  public title = '';

  private dialogRef = inject(MatDialogRef<ModalFormCategoryComponent>);
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);

  public ngOnInit(): void {
    this.title = this.data.title;
    
    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  public onClose(): void {
    this.dialogRef.close(null);
  }
}
