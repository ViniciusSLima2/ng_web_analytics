import { Component, effect, input, signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-devices-chart',
  imports: [BaseChartDirective],
  templateUrl: './devices-chart.html',
  styleUrl: './devices-chart.css'
})
export class DevicesChart {
  chartData = input.required<any>();

  devicesOverviewPieChartData = signal<ChartData<'pie'>>({
    labels: [],
    datasets: [{ data: [] }],
  });

  devicesOverviewPieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true, // 👈 ativa o título
        text: 'Visitas por dispositivos', // 👈 o texto do título
        font: {
          size: 18, // tamanho da fonte
          weight: 'bold',
        },
        color: '#333', // cor do texto
        padding: {
          top: 10,
          bottom: 30,
        },
        align: 'center', // 'start' | 'center' | 'end'
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data.reduce((sum: number, val: any) => sum + Number(val), 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value} (${percentage}%)`;
        },
      },
    },
  };

  constructor(){
    effect(() => {
      const devicesOverview = this.chartData();
      this.devicesOverviewPieChartData.set({
        labels: Object.keys(devicesOverview),
        datasets: [
          {
            data: Object.values(devicesOverview),
            backgroundColor: [
              'rgba(75, 192, 192, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
            ],
          },
        ],
      });
    });
  }
}
