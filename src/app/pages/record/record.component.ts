import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';

import { RecordService } from '../../services/record.service';
import { HistoryService } from '../../services/history.service';
import { ModalFormCategoryComponent } from '../../layout/modal-form-category/modal-form-category.component';
import { Category } from '../../models/history.model';
import { ModalFormEventComponent } from '../../layout/modal-form-event/modal-form-event.component';
import { ModalConfirmComponent } from '../../layout/modal-confirm/modal-confirm.component';
import { getFormattedCurrentDate } from '../../utils/date-helpers';

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
        next: (categories) => {
          this.userCategories = categories;
        },
      });
  }
  public openFormCategory(): void {
    const dialogRef: MatDialogRef<ModalFormCategoryComponent> =
      this.dialog.open(ModalFormCategoryComponent, {
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
        filter(Boolean),
        switchMap((formCategory) =>
          this.recordService.saveCategory(formCategory),
        ),
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

  public updateCategory(category: Category) {
    const dialogRef: MatDialogRef<ModalFormCategoryComponent> =
      this.dialog.open(ModalFormCategoryComponent, {
        autoFocus: false,
        width: '400px',
        data: {
          showSelector: true,
          title: 'Update Category',
          categories: this.userCategories,
          category,
        },
      });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        switchMap((formCategory) =>
          this.recordService.updateCategory(formCategory, category.id),
        ),
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

  public deleteCategory(category: Category): void {
    const dialogRef: MatDialogRef<ModalConfirmComponent> = this.dialog.open(
      ModalConfirmComponent,
      {
        width: '500px',
        data: {
          message: `Are you sure you want to delete the category ${category.name}?`,
        },
      },
    );
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
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

  public openFormEvent(): void {
    const dialogRef: MatDialogRef<ModalFormEventComponent> = this.dialog.open(
      ModalFormEventComponent,
      {
        autoFocus: false,
        width: '400px',
      },
    );
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        switchMap((formEvent) => this.recordService.saveEvent(formEvent)),
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
