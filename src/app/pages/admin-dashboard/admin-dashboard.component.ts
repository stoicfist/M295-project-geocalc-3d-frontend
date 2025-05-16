import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShapeService } from '../../services/shape.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  figureHistory: any[] = [];

  constructor(private shapeService: ShapeService) {}

  ngOnInit(): void {
    this.shapeService.getFigureHistory().subscribe({
      next: (data) => {
        console.log('📥 Verlauf erhalten:', data);
        this.figureHistory = data;
      },
      error: (err) => console.error('❌ Fehler beim Laden des Verlaufs:', err)
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
