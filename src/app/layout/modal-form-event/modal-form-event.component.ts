import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
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

interface Category {
  id: string;
  name: string;
  capacity: number;
}

@Component({
  selector: 'app-modal-form-event',
  standalone: true,
  imports: [
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './modal-form-event.component.html',
  styleUrl: './modal-form-event.component.scss',
})
export class ModalFormEventComponent implements OnInit {
  public form!: FormGroup;
  public userCategories: Category[] = [  //Category
    {
      id: '1',
      name: 'Home',
      capacity: 15000,
    },
    {
      id: '2',
      name: 'Food',
      capacity: 10000,
    },
    {
      id: '3',
      name: 'Car',
      capacity: 7000,
    },
  ];

  private dialogRef = inject(MatDialogRef<ModalFormEventComponent>);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  //private historyService = inject(this.historyService);

  ngOnInit() {
    // const subscriptions = this.historyService.getCategory().subscribe({
    //   next: (val) => (this.userCategories = val),
    // });
    this.form = this.fb.group({
      category: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      description: ['', Validators.required],
    });

    //this.destroyRef.onDestroy(() => subscriptions.unsubscribe())
  }

  onClose(): void {
    this.dialogRef.close(null);
  }
}
