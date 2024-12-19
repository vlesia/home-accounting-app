import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

import { UserExpenses } from '../../../models/history.model';
import { HistoryService } from '../../../services/history.service';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatToolbarModule, CommonModule],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
})
export class HistoryTableComponent {
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
  public ngOnInit(): void {
    const userStorage = localStorage.getItem('user');

    if (!userStorage) {
      return;
    }

    const user = JSON.parse(userStorage);
    this.historyService.getCombinedData(user.id).subscribe({
      next: (val) => {
        this.userExpenses = val;
      },
      error: (err) => (this.error = err.message),
    });
  }
}
