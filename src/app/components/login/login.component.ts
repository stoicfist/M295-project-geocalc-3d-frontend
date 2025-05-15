import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login', // ← dieser ist ok, aber nicht aktiv genutzt
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="auth.login()">Login</button>
    <button *ngIf="auth.isLoggedIn()" (click)="auth.logout()">Logout</button>
    <div *ngIf="auth.isLoggedIn()">
      Logged in as {{ auth.identityClaims?.['preferred_username'] }}
    </div>
  `
})
export class LoginComponent {
  constructor(public auth: AuthService) {}
}