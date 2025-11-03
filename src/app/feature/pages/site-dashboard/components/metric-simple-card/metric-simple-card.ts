import { CommonModule} from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-simple-card',
  imports: [CommonModule],
  templateUrl: './metric-simple-card.html',
  styleUrl: './metric-simple-card.css'
})
export class MetricSimpleCard {
  data: any = input.required();
}
