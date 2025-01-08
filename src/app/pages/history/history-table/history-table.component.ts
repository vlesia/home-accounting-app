import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';

import { UserExpenses } from '../../../models/history.model';
import { HistoryService } from '../../../services/history.service';
import { RecordService } from '../../../services/record.service';
import { ModalFormEventComponent } from '../../../layout/modal-form-event/modal-form-event.component';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
})
export class HistoryTableComponent implements OnInit, AfterViewInit, OnDestroy {
  public tableColumns: string[] = [
    'index',
    'amount',
    'date',
    'category',
    'type',
    'actions',
  ];
  public userExpenses = new MatTableDataSource<UserExpenses>([]);
  public error = '';
  public shouldShowPaginator = false;
  public pageSizeOption = [4, 8, 12];
  public pageSize = 4;
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private historyService = inject(HistoryService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private recordService = inject(RecordService);

  public ngOnInit(): void {
    const subscription = this.historyService.getCombinedData().subscribe({
      next: (val) => {
        this.userExpenses.data = val;
        this.shouldShowPaginator = val.length > this.pageSize;
      },
      error: (err) => (this.error = err.message),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  public ngAfterViewInit(): void {
    this.userExpenses.paginator = this.paginator;
    this.userExpenses.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userExpenses.filter = filterValue.trim().toLowerCase();
  }

  public openDetails(eventId: string, index: number): void {
    this.router.navigate(['/event-details', eventId], {
      state: { eventIndex: index },
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
        switchMap((formEvent) => this.recordService.saveEvent(formEvent)),
        switchMap(() => this.historyService.getCombinedData()),
      )
      .subscribe({
        next: (val) => {
          this.userExpenses.data = val;
          this.shouldShowPaginator = val.length > this.pageSize;
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
