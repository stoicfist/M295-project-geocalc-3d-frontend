import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>Login works!</p>
    <button (click)="login()">🔐 Login mit Keycloak</button>
  `,
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    await this.auth.initAuth();

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.auth.login(); // Wenn nicht eingeloggt → direkt weiter zu Keycloak
    }
  }

  login() {
    this.auth.login();
  }
}
