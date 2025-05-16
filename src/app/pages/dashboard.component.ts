import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

// Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { SessionExpiredDialogComponent } from '../components/session-expired-dialog/session-expired-dialog.component';
import { KugelComponent } from './kugel/kugel.component';
import { QuaderComponent } from './quader/quader.component';
import { KegelComponent } from './kegel/kegel.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

// Services
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,

    // Angular Material
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    // App Components
    KugelComponent,
    QuaderComponent,
    KegelComponent,
    AdminDashboardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  activeView: string = '';

  constructor(
    private dialog: MatDialog,
    public auth: AuthService
  ) {}

  logout(): void {
    this.dialog.open(SessionExpiredDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.auth.logout();
        }
      });
  }

  show(view: string): void {
    this.activeView = view;
  }
}
