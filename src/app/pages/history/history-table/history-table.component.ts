import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserExpenses } from '../../../models/history.model';
import { HistoryService } from '../../../services/history.service';

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
export class HistoryTableComponent implements OnInit, AfterViewInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private historyService = inject(HistoryService);
  private destroyRef = inject(DestroyRef);

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
}
