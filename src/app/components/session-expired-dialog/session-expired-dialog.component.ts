import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-expired-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
  <div style="
    background: #222;
    color: white;
    padding: 2rem;
    border-radius: 16px;
    max-width: 400px;
    overflow: hidden;
  ">
    <h2>Sitzung abgelaufen</h2>
    <p>Du hast ausgeloggt oder deine Sitzung ist abgelaufen.</p>
    <button mat-raised-button color="primary" (click)="confirm()">🔐 Bitte logge dich neu an</button>
  </div>
`,
})
export class SessionExpiredDialogComponent {
  constructor(private dialogRef: MatDialogRef<SessionExpiredDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }
}
