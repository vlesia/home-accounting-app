import * as Highcharts from 'highcharts';

export const chartOptions: Highcharts.Options = {
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
