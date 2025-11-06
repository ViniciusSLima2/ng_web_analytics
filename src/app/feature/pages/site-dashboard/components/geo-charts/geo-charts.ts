import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { MeterGroupModule, MeterItem } from 'primeng/metergroup';
// 1. As importações só existem AQUI
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

// 2. O registro do Plotly só acontece AQUI
PlotlyModule.forRoot(PlotlyJS)
@Component({
  selector: 'app-geo-charts',
  imports: [PlotlyModule, MeterGroupModule, CommonModule, PlotlyModule],
  templateUrl: './geo-charts.html',
  styleUrl: './geo-charts.css'
})
export class GeoCharts {
  geoData = input.required<any[]>();
  data = signal([{
    type: 'choropleth',
    locationmode: 'ISO-3',
    locations: ['BRA', 'USA', 'CHN', 'IND', 'RUS'],
    colorscale: 'Blues',
    reversescale: true,
    z: [10, 50, 70, 30, 20],
    text: ['Brasil', 'EUA', 'China', 'Índia', 'Rússia'],
  }]);

  layout = {
    title: {text: 'Acessos por país'},
    geo: {
      projection: { type: 'natural earth' },
      showframe: false,
      showcoastlines: true
    }
  };

  config = { responsive: true };

  percentageMeterValues: any = signal<Partial<MeterItem[]>>([]);

  constructor(){
    effect(() => {
      const geoData = this.geoData();
      let reducedData: any = {};
      geoData.forEach((item: any) => {
        const totalVisits = (reducedData[item.country.iso3]?.visits || 0) + item.visits;
        reducedData[item.country.iso3] = {
          visits: totalVisits,
          name: item.country.name,
          iso3: item.country.iso3
        };
      });
      const arrayReducedData = Object.values(reducedData);
      this.percentageMeterValues.set(this.calculatePercentage(arrayReducedData));
      this.data.set([{
        type: 'choropleth',
        locationmode: 'ISO-3',
        colorscale: 'Blues',
        reversescale: true,
        locations: arrayReducedData.map((item: any) => item.iso3),
        z: arrayReducedData.map((item: any) => item.visits),
        text: arrayReducedData.map((item: any) => item.name),
      }]);
    })
  }

  calculatePercentage(arrayReducedData: any[]) {
    const totalVisits = arrayReducedData.reduce((sum, item) => sum + item.visits, 0);
    const percentageData = arrayReducedData.map((item: any) => {
      return {
        label: item.name,
        value: ((item.visits / totalVisits) * 100).toFixed(2),
        color: '#2563EB'
      }
    })
    return percentageData;
  }

}
