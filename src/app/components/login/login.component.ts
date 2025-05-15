import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
  <div class="login-container">
    <mat-card class="login-card">
      <h1>🧮 3D-Geometrie Visualizer</h1>
      <p>Logge dich ein, um Figuren<br />zu berechnen und zu visualisieren</p>

      <button mat-raised-button color="primary" (click)="auth.login()">
        Login mit Keycloak
      </button>

      <div class="logo-in-card">
        <button
          mat-icon-button
          class="logo-button"
          (click)="openFirmaWebsite()"
          matTooltip="Zur Firmenwebsite"
          aria-label="Logo Firma"
        >
          <img src="assets/logo.png" alt="Logo Firma" class="logo" />
        </button>
      </div>

      <div class="footer-in-card">
        © 2025 Peter Ngo – 3D-Geometrie Visualizer
      </div>
    </mat-card>
  </div>
`
,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  openFirmaWebsite() {
    window.open('https://www.semafor.ch/de/', '_blank', 'noopener');
  }
}
