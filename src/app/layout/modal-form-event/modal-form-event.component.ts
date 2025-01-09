import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
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

import { Category, Event } from '../../models/history.model';
import { HistoryService } from './../../services/history.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-modal-form-event',
  standalone: true,
  imports: [
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
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
  public userCategories: Category[] = [];

  private dialogRef = inject(MatDialogRef<ModalFormEventComponent>);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private historyService = inject(HistoryService);
  private userService = inject(UserService);

  public get user(): User | null {
    return this.userService.getUser();
  }

  public ngOnInit() {
    const subscriptions = this.historyService.getCategories().subscribe({
      next: (val) => (this.userCategories = val),
    });
    this.form = this.fb.group({
      category: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      description: ['', Validators.required],
    });

    this.destroyRef.onDestroy(() => subscriptions.unsubscribe());
  }
  
  public submitFormData({
    amount,
    ...rest
  }: Omit<Event, 'id' | 'date' | 'userId'>): void {
    this.dialogRef.close({
      amount: +amount,
      ...rest,
      date: new Date().toISOString(),
      userId: this.user!.id,
    });
  }

  public onClose(): void {
    this.dialogRef.close(null);
  }
}
