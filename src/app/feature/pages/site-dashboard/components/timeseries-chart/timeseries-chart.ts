import { CommonModule } from '@angular/common';
import { Component, effect, input, signal} from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
export interface ITimeseriesData {
  data: number[];
  labels: string[];
}
Chart.register(...registerables);
@Component({
  selector: 'app-timeseries-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './timeseries-chart.html',
  styleUrl: './timeseries-chart.css'
})
export class TimeseriesChart {
  timeseriesData = input.required<ITimeseriesData>();

  lineChartData = signal<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: 'Visits',
        data: [],
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        borderWidth: 2,
      },
    ],
  });

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { mode: 'index', intersect: false },
      title: {
        display: true, 
        text: 'Número de visitas por data', 
        font: {
          size: 18, 
          weight: 'bold',
        },
        color: '#333', 
        padding: {
          top: 10,
          bottom: 30,
        },
        align: 'center', 
      },
      datalabels: {
        display: false, 
      },
    },
    interaction: { mode: 'nearest', intersect: false },
    scales: {
      x: { display: true, title: { display: true, text: '' }, grid: {display: false} },
      y: { display: true, title: { display: true, text: '' }, suggestedMin: 0, grid: {display: false} },
    },
  };

  constructor(){
    effect(() => {
      const tsData = this.timeseriesData();
      this.lineChartData.set({
        labels: tsData.labels,
        datasets: [
          {
            label: 'Número de visitas',
            data: tsData.data,
            fill: false,
            tension: 0.3,
            pointRadius: 3,
            borderWidth: 2
          }
        ]
      });
    })
  }
} 
