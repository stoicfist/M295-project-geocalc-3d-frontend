import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() set data(value: { name: string, value: number }[]) {
    this.lineData = [
      {
        name: 'Erstellte Figuren',
        series: value
      }
    ];
  }

  lineData: any[] = [];

  view: [number, number] = [350, 300];
  colorScheme = 'vivid';
}
