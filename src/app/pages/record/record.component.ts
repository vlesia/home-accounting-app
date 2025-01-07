import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HistoryService } from '../../services/history.service';
import { Category } from '../../models/history.model';
import { RecordService } from '../../services/record.service';
import { ModalFormEventComponent } from '../../layout/modal-form-event/modal-form-event.component';
import { getFormattedCurrentDate } from '../../utils/date-helpers';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss',
})
export class RecordComponent implements OnInit, OnDestroy {
  public tableColumns: string[] = ['index', 'category', 'limit', 'actions'];
  public userCategories: Category[] = [];
  private destroy$ = new Subject<void>();

  private dialog = inject(MatDialog);
  private historyService = inject(HistoryService);
  private recordService = inject(RecordService);
  private userService = inject(UserService);

  public get user(): User | null {
    return this.userService.getUser();
  }

  public ngOnInit(): void {
    this.historyService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.userCategories = categories;
        },
      });
  }

  public openFormEvent(): void {
    const dialogRef: MatDialogRef<ModalFormEventComponent> = this.dialog.open(
      ModalFormEventComponent,
      {
        autoFocus: false,
      },
    );
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        switchMap((formEvent) =>
          this.recordService.saveEvent({
            type: formEvent.type,
            amount: +formEvent.amount,
            category: +formEvent.category,
            date: getFormattedCurrentDate(),
            description: formEvent.description,
            userId: this.user!.id,
          }),
        ),
      )
      .subscribe({
        error: (error) => {
          console.error(error.message);
        },
      });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
