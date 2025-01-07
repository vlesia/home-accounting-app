import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';

import { HistoryService } from '../../services/history.service';
import { Category } from '../../models/history.model';
import { ModalConfirmComponent } from '../../layout/modal-confirm/modal-confirm.component';
import { RecordService } from '../../services/record.service';

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

  private historyService = inject(HistoryService);
  private dialog = inject(MatDialog);
  private recordService = inject(RecordService);


  public ngOnInit(): void {
    this.historyService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.userCategories = categories;
        },
      });
  }

  public deleteCategory(category: Category): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '500px',
      data: {
        message: `Are you sure you want to delete the category ${category.name}?`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((val) => val === true),
        switchMap(() => this.recordService.deleteCategory(category.id)),
        switchMap(() => this.historyService.getCategories()),
      )
      .subscribe({
        next: (categories) => (this.userCategories = categories),
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
