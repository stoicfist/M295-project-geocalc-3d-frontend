setupGlobalDebugging();

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export function setupGlobalDebugging(): void {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 🔐 Login-Status
  console.log('✅ [DEBUG] isLoggedIn():', auth.isLoggedIn());
  console.log('🪪 [DEBUG] AccessToken:', auth.accessToken);

  // 🎟 Token Claims
  const claims = auth.getAccessTokenClaims?.();
  console.log('🧾 [DEBUG] Claims:', claims);

  // 👑 Rollenprüfung
  console.log('🛡 hasRole(ADMIN):', auth.hasRole?.('ADMIN'));
  console.log('🛡 hasRole(USER):', auth.hasRole?.('USER'));

  // 🧭 Routenwechsel loggen
  router.events.subscribe((event: any) => {
    if (event?.url) {
      console.log('📍 Route gewechselt →', event.url);
    }
  });

  // 🖱 Alle Button-Klicks loggen
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      const btn = target.closest('button')!;
      const label = btn.innerText.trim() || btn.getAttribute('aria-label') || '[Unbenannter Button]';
      console.log('🖱 Button geklickt →', label);
    }
  });
}
