import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import { HistoryService } from '../../../services/history.service';

@Component({
  selector: 'app-spending-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './spending-chart.component.html',
  styleUrl: './spending-chart.component.scss',
})
export class SpendingChartComponent implements OnInit {
  public updateFlag = false;

  private historyService = inject(HistoryService);
  private destroyRef = inject(DestroyRef);

  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    colors: [
      '#9FA8DA',
      '#7986CB',
      '#5C6BC0',
      '#3F51B5',
      '#1A237E',
      '#3949AB',
      '#303F9F',
    ],
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          formatter: function () {
            if (this.percentage! >= 10) {
              return `${this.name}: <b>${this.percentage!.toFixed(1)}%</b>`;
            }

            return null;
          },
          distance: -50,
          style: {
            color: 'white',
            textOutline: 'none',
          },
          useHTML: true,
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Costs',
        data: [],
      },
    ],
  };

  public ngOnInit() {
    const subscription = this.historyService.getFilteredOutcomeEvents().subscribe({
      next: (chartData) => {
        console.log(chartData);

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
