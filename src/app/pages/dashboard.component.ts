import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredDialogComponent } from '../components/session-expired-dialog/session-expired-dialog.component';
import { AuthService } from '../auth/auth.service';
import { KugelComponent } from './kugel/kugel.component';
import { QuaderComponent } from './quader/quader.component';
import { KegelComponent } from './kegel/kegel.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    KugelComponent,
    QuaderComponent,
    KegelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  activeView: string = ''; // Variable zur Steuerung der Ansicht

  constructor(
    private dialog: MatDialog,
    public auth: AuthService
  ) {}

  logout() {
    this.dialog.open(SessionExpiredDialogComponent).afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.auth.logout();
      }
    });
  }

  show(view: string) {
    this.activeView = view; // Setzt die aktive Ansicht
  }
}