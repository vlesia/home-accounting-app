import { Component } from '@angular/core';

import { HistoryTableComponent } from './history-table/history-table.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HistoryTableComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {}
