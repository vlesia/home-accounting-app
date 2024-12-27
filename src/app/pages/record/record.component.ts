import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';

import { RecordService } from '../../services/record.service';
import { ModalFormCategoryComponent } from '../../layout/modal-form-category/modal-form-category.component';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss',
})
export class RecordComponent implements OnInit, OnDestroy {
  public tableColumns: string[] = ['index', 'category', 'limit', 'actions'];
  public userCategories = [
    {
      id: 1,
      name: 'Home',
      capacity: 15000,
    },
    {
      id: 2,
      name: 'Food',
      capacity: 10000,
    },
    {
      id: 3,
      name: 'Car',
      capacity: 7000,
    },
  ]; //Category[]
  private destroy$ = new Subject<void>();

  private dialog = inject(MatDialog);
  private recordService = inject(RecordService);
  //private historyService = inject(HistoryService);

  ngOnInit(): void {}
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
        switchMap((val) => this.recordService.saveCategory(val))
        //switchMap(() => this.historyService.getCategories())
      )
      .subscribe({
        // next: (categories) => {
        //   this.userCategories = categories;
        // },
        error: (error) => {
          console.error(error.message);
        },
      });
  }

  public updateCategory(category: {
    id: string;
    name: string;
    capacity: number;
  }) {
    //Category
    //Category
    const dialogRef = this.dialog.open(ModalFormCategoryComponent, {
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
        filter((val) => val !== null && val !== undefined),
        switchMap((val) => this.recordService.updateCategory(val, category.id))
        //switchMap(() => this.historyService.getCategories())
      )
      .subscribe({
        // next: (categories) => {
        //   this.userCategories = categories;
        // },
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
