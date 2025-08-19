import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredDialogComponent } from '../components/session-expired-dialog/session-expired-dialog.component';

export const AuthGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);

  if (auth.isLoggedIn()) {
    return true;
  }

  const dialog = inject(MatDialog);
  const result = await firstValueFrom(dialog.open(SessionExpiredDialogComponent).afterClosed());

  if (result) {
    auth.login(); // ⬅️ Weiterleitung zu Keycloak
  }

  return false;
};
