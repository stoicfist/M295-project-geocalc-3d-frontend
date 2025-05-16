import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input() shapeCounts: { name: string; value: number }[] = [];

  // Diese musst du definieren, sonst gibt es Fehler!
  view: [number, number] = [400, 300];
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#ff4081', '#7c4dff', '#00bcd4', '#ff9800']
  };
  showLabels = true;
  isDoughnut = false;

  customColors = [
    { name: 'Kugel', value: '#00e0ff' },
    { name: 'Quader', value: '#8364e8' },
    { name: 'Kegel', value: '#ff4f81' }
  ];
}
