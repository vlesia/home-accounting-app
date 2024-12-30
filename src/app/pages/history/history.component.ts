import { Component } from '@angular/core';

import { HistoryTableComponent } from './history-table/history-table.component';

import { SpendingChartComponent } from './spending-chart/spending-chart.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HistoryTableComponent, SpendingChartComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {}
