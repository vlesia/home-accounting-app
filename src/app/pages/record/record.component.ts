import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';

import { RecordService } from '../../services/record.service';
import { ModalFormCategoryComponent } from '../../layout/modal-form-category/modal-form-category.component';
import { Category } from '../../models/history.model';
import { HistoryService } from '../../services/history.service';

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
  private recordService = inject(RecordService);
  private historyService = inject(HistoryService);

  public ngOnInit(): void {
    this.historyService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => (this.userCategories = categories),
      });
  }
  public openFormCategory(): void {
    const dialogRef = this.dialog.open(ModalFormCategoryComponent, {
      autoFocus: false,
      width: '400px',
      data: {
        title: 'Add category',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((val) => val !== null && val !== undefined),
        switchMap((val) => this.recordService.saveCategory(val)),
        switchMap(() => this.historyService.getCategories()),
      )
      .subscribe({
        next: (categories) => {
          this.userCategories = categories;
        },
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
