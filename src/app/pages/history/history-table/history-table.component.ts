import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
})
export class HistoryTableComponent implements OnInit {
  public tableColumns: string[] = [
    'index',
    'amount',
    'date',
    'category',
    'type',
    'actions',
  ];
  public userExpenses: UserExpenses[] = [];
  public error = '';

  private historyService = inject(HistoryService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  public ngOnInit(): void {
    const subscription = this.historyService.getCombinedData().subscribe({
      next: (val) => {
        this.userExpenses = val;
      },
      error: (err) => (this.error = err.message),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  public openDetails(eventId: string, index: number) {
    this.router.navigate(['/event-details', eventId], {
      state: { eventIndex: index },
    });
  }
}
