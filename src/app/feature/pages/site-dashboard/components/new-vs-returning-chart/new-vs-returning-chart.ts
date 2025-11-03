import { Component, effect, input, signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-new-vs-returning-chart',
  imports: [BaseChartDirective],
  templateUrl: './new-vs-returning-chart.html',
  styleUrl: './new-vs-returning-chart.css'
})
export class NewVsReturningChart {
  chartData = input.required<any>();
  engagementPieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true, // 👈 ativa o título
        text: 'Visitantes Novos vs. Recorrentes', // 👈 o texto do título
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

  engagementPieChartData = signal<ChartData<'pie'>>({
    labels: ['Novos visitantes', 'Visitantes retornados'],
    datasets: [
      {
        data: [],
        // backgroundColor can be an array of strings. ng2-charts will pass them to Chart.js.
        backgroundColor: ['rgba(248, 146, 78, 0.8)', 'rgba(54,162,235,0.8)'],
        hoverOffset: 6,
      },
    ],
  });

    constructor() {

      effect(() => {
        const chartData = this.chartData();
        this.engagementPieChartData.set({
          labels: ['Novos visitantes', 'Visitantes retornados'],
          datasets: [
            {
              data: [chartData.newVisitors, chartData.returningVisitors],
              backgroundColor: ['rgba(248, 146, 78, 0.8)', 'rgba(54,162,235,0.8)'],
              hoverOffset: 6,
            },
          ],
        });
      });
    }
}
