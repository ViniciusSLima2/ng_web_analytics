import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Timeseries } from '../../../core/models/siteMetadata.model';
import { MetricSimpleCard } from './components/metric-simple-card/metric-simple-card';
import { convertISOToDDMMYYYY, formatDateToYYYYMMDD } from '../../../utils/date';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Chart, registerables,} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { GroupTable } from './components/group-table/group-table';
import { GeoCharts } from "./components/geo-charts/geo-charts";
import { DatePickerModule } from 'primeng/datepicker';
import { TimeseriesChart } from "./components/timeseries-chart/timeseries-chart";
import { ReferrerChart } from "./components/referrer-chart/referrer-chart";
import { NewVsReturningChart } from "./components/new-vs-returning-chart/new-vs-returning-chart";
import { DevicesChart } from "./components/devices-chart/devices-chart";
import { Analytics } from '../../../core/services/analytics';
import { finalize } from 'rxjs';
import { LoadingSkeleton } from "./components/loading-skeleton/loading-skeleton";
Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-site-dashboard',
  imports: [
    CommonModule,
    MetricSimpleCard,
    SelectButtonModule,
    FormsModule,
    ButtonModule,
    GroupTable,
    GeoCharts,
    DatePickerModule,
    TimeseriesChart,
    ReferrerChart,
    NewVsReturningChart,
    DevicesChart,
    LoadingSkeleton
],
  templateUrl: './site-dashboard.html',
  styleUrl: './site-dashboard.css',
})
export class SiteDashboard {
  private route = inject(ActivatedRoute);
  private data: any = toSignal(this.route.data);
  protected dateFilter = signal<any>(0);
  protected analyticsService = inject(Analytics);
  protected isLoadingData = signal(true);
  protected activeFilter = signal([0, 0]);
  timeRangePrimengOptions: { label: string; value: number }[] = [
    {
      label: 'Últimos 7 Dias',
      value: 7,
    },
    {
      label: 'Últimos 30 Dias',
      value: 30,
    },
    {
      label: 'Últimos 90 Dias',
      value: 90,
    },
    {
      label: 'Todos os tempos',
      value: 0,
    },
  ];

  siteData: any = signal({});

  totalVisitorsCardData = computed(() => {
    const totalVisitors = this.siteData().siteHints.total_visitors;
    return {
      title: 'Total de acessos',
      value: totalVisitors,
      iconClass: 'pi-users',
    };
  });

  visitorsAveragePerDayCardData = computed(() => {
  const totalVisitors = this.siteData().siteHints.average_visitors_per_day;
    return {
      title: 'Média de acessos por dia',
      value: totalVisitors,
      iconClass: 'pi-chart-line',
    };
  });

  daysCountCardData = computed(() => {
    const daysCount = this.siteData().siteHints.days_count;
    return {
      title: 'Número de dias com site online',
      value: daysCount,
      iconClass: 'pi-calendar',
    };
  });

  peakVisitorsDay = computed(() => {
    const peakDay = this.siteData().siteHints.peak_visitors_day;
    const value = peakDay !== 0 ? `${convertISOToDDMMYYYY(peakDay.date.toString())} (${peakDay.visits} acessos)` : 'N/A';
    return {
      title: 'Dia com mais acessos',
      value: value,
      iconClass: 'pi-star',
    };
  });

  resetDataFilter(){
    this.dateFilter.set(0);
  }

  getDayBeforeXDaysFromBaseDate(baseDate: Date, days: number): Date {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() - days);
    return newDate;
  }

  constructor(){
    effect(() => {
      const data  = this.data().data;
      this.siteData.set(data);
      this.isLoadingData.set(false);
    })

    effect(() => {
      const dateFilter = this.dateFilter();
      let startDate, endDate!: any;
      let shouldFetch = false;
      if(Array.isArray(dateFilter)){
        if(dateFilter[0] && dateFilter[1]){
          startDate = dateFilter[0];
          endDate = dateFilter[1];
          shouldFetch = true;
        }
      }else if (dateFilter !== 0){
        const todayDate = new Date();
        const dayBeforeXDaysFromBaseDate = this.getDayBeforeXDaysFromBaseDate(todayDate, this.dateFilter());
        endDate = todayDate;
        startDate = dayBeforeXDaysFromBaseDate.toString();
        shouldFetch = true;
      }else if (dateFilter === 0){
        shouldFetch = true;
      }
      
      if(!shouldFetch) return;
      this.isLoadingData.set(true);
      this.activeFilter.set([startDate, endDate]);
      if(dateFilter === 0) this.activeFilter.set([0, 0]);
      this.analyticsService.getAllDataFromSiteById(this.data().data.siteId, formatDateToYYYYMMDD(startDate), formatDateToYYYYMMDD(endDate))
      .pipe(finalize(() => {this.isLoadingData.set(false);}))
      .subscribe({
        next: (res) => {
          this.siteData.update((prev:any) => ({ ...prev, ...res }));
        },
        error: (err) => {console.error('Erro ao buscar dados do site:', err);}  ,
      });
    })
  }
}
