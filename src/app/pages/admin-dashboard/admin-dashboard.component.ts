import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShapeService } from '../../services/shape.service';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    PieChartComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  figureHistory: any[] = [];
  shapeCounts: { name: string; value: number }[] = [];

  constructor(private shapeService: ShapeService) {}

  ngOnInit(): void {
    this.shapeService.getFigureHistory().subscribe(data => {
      this.figureHistory = data;

      const counts: Record<string, number> = {};

      data.forEach(entry => {
        const type = entry.shapeType.toLowerCase();
        counts[type] = (counts[type] || 0) + 1;
      });

      this.shapeCounts = Object.entries(counts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
      }));
    });
  }

  formatParameters(params: any): string {
    if (!params || typeof params !== 'object') return '';

    return Object.entries(params)
      .filter(([key]) => !key.toLowerCase().startsWith('additional'))
      .map(([key, value]) => `${this.capitalizeFirstLetter(key)} = ${value}`)
      .join(', ');
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  resolveUsername(id: string): string {
    const userMap: Record<string, string> = {
      '1bcdce5c-c70d-458b-a106-a0b465582293': 'Admin',
      'b1a34444-4563-4173-b075-421d55d17ae0': 'User'
    };

    return userMap[id] || id; // fallback falls ID nicht gefunden
  }
}
