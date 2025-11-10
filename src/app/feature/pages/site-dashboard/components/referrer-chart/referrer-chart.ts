import { Component, effect, input, signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-referrer-chart',
  imports: [BaseChartDirective],
  templateUrl: './referrer-chart.html',
  styleUrl: './referrer-chart.css'
})
export class ReferrerChart {
  referrersData = input.required<any>();

  referrersBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: {} },
      title: {
        display: true, 
        text: 'Visitas através de sites',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#FFF', 
        padding: {
          top: 10,
          bottom: 30,
        },
        align: 'center',
      },
      datalabels: {
        color: '#FFF'
      }
    },
    scales: {
      x: { title: { display: true, text: '' }, grid: {display: false} },
      y: { title: { display: true, text: '' }, beginAtZero: true, grid: {display: false} },
    },
  };

  referrersBarChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [{ label: 'Visits', data: [], backgroundColor: ['#2563eb'] }],
  });

  constructor(){
    effect(() => {
      const list = this.referrersData();
      if (!list || list.length === 0) {
        this.referrersBarChartData.set({
          labels: [],
          datasets: [{ label: 'Visits', data: [], backgroundColor: ['#2563eb'] }],
        });
        return;
      }
      this.referrersBarChartData.set({
          labels: list.labels,
          datasets: [{ label: 'Visits', data: list.values, backgroundColor: ['#2563eb'] }],
        });
    });
  }
}
