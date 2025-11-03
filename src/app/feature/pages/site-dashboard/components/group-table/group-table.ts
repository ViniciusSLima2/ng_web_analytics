import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Ripple } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-group-table',
  imports: [TableModule, ButtonModule, Ripple, CommonModule, SelectModule, FormsModule, DatePickerModule],
  templateUrl: './group-table.html',
  styleUrl: './group-table.css'
})
export class GroupTable {
  @ViewChild('dt') table!: Table;
  tableData = input.required<any[]>();
  rowsOptions = computed(() => {
    return [
      { label: '5', value: this.pagesNumber() * 5  },
      { label: '10', value: this.pagesNumber() * 10},
      { label: '20', value: this.pagesNumber() * 20 },
      { label: '100', value:  this.pagesNumber() * 100},
    ];
  })
  rangeDateVar = [];
  rangeDates = signal([null, null] as any[]);
  rows = signal(25);

  constructor(){
    effect(() => {
      this.rows.set(this.pagesNumber() * 5);
    });
  }

  calculateTotal(field: string, targetDate?: string | Date): number {
    return this.tableData()
      .filter(item => {
        if (!targetDate) return true;

        const itemDate = new Date(item.date).toDateString();
        const compareDate = new Date(targetDate).toDateString();

        return itemDate === compareDate;
      })
      .reduce((sum, item) => sum + (item[field] ?? 0), 0);
  }

  calculateBounceRateAveragePerDate(targetDate: string | Date): number {
    const filteredItems = this.tableData().filter(item => {
      const itemDate = new Date(item.date).toDateString();
      const compareDate = new Date(targetDate).toDateString();
      return itemDate === compareDate;
    });
    if (filteredItems.length === 0) return 0;

    const totalBounceRate = filteredItems.reduce((sum, item) => sum + (item.bounce_rate ?? 0), 0);
    return (totalBounceRate / filteredItems.length).toFixed(2) as unknown as number;
  }

  pagesNumber = computed(() => {
    const targetDate = this.tableData()[0]?.date;
    const filteredItems = this.tableData().filter(item => {
      const itemDate = new Date(item.date).toDateString();
      const compareDate = new Date(targetDate).toDateString();
      return itemDate === compareDate;
    });
    return filteredItems.length;
  })

  onRowsChange(newRows: number) {
    this.rows.set(newRows);
    this.table.first = 0;
  }

  setRangeDatesSignal(e: any){
    this.rangeDates.set(this.rangeDateVar);
  }

  resetFilteredTable(){
    this.rangeDates.set([null, null]);
  }
}
