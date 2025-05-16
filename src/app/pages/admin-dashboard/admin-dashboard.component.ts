import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShapeService } from '../../services/shape.service';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    PieChartComponent,
    LineChartComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  figureHistory: any[] = [];
  shapeCounts: { name: string; value: number }[] = [];

  // Beispiel-Daten für das Liniendiagramm
  lineChartData: { name: string; value: number }[] = [];

  constructor(private shapeService: ShapeService) {}

  ngOnInit(): void {
    this.shapeService.getFigureHistory().subscribe({
      next: (data) => {
        this.figureHistory = data;
        this.shapeCounts = this.computeShapeCounts(data); // 👈 Hier hinzugefügt
        this.lineChartData = this.computeCountsPerDate(data);
      },
      error: (err) => console.error('Fehler beim Laden des Verlaufs:', err)
    });
  }

  computeCountsPerDate(data: any[]): { name: string; value: number }[] {
    const counter: Record<string, number> = {};

    for (const entry of data) {
      const date = new Date(entry.createdAt).toISOString().slice(0, 10); // YYYY-MM-DD
      counter[date] = (counter[date] || 0) + 1;
    }

    // Hier sortieren nach Datum (Schlüssel)
    return Object.entries(counter)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([name, value]) => ({ name, value }));
  }

  resolveUsername(id: string): string {
    const userMap: Record<string, string> = {
      '1bcdce5c-c70d-458b-a106-a0b465582293': 'Admin',
      'b1a34444-4563-4173-b075-421d55d17ae0': 'User'
    };

    return userMap[id] || id; // fallback falls ID nicht gefunden
  }

  computeShapeCounts(data: any[]): { name: string; value: number }[] {
    const countMap: Record<string, number> = {};

    for (const entry of data) {
      const shape = entry.shapeType.toLowerCase();
      countMap[shape] = (countMap[shape] || 0) + 1;
    }

    return Object.entries(countMap).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // ⇦ Großschreiben
      value
    }));
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
}
