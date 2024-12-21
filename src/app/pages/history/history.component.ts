import { Component } from '@angular/core';

import { SpendingChartComponent } from "./spending-chart/spending-chart.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SpendingChartComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

}
