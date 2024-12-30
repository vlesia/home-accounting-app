import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import { HistoryService } from '../../../services/history.service';
import { chartOptions } from '../../../config/chart-config';

@Component({
  selector: 'app-spending-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './spending-chart.component.html',
  styleUrl: './spending-chart.component.scss',
})
export class SpendingChartComponent implements OnInit {
  public updateFlag = false;
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = chartOptions;

  private historyService = inject(HistoryService);
  private destroyRef = inject(DestroyRef);

  public ngOnInit() {
    const subscription = this.historyService
      .getFilteredOutcomeEvents()
      .subscribe({
        next: (chartData) => {
          this.chartOptions.series = [
            {
              type: 'pie',
              name: 'Costs',
              data: chartData,
            },
          ];
          this.updateFlag = true;
        },
        error: (err) => console.error('Error fetching chart data', err),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
