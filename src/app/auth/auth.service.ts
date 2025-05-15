import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
  }

  async initAuth(): Promise<void> {
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log('Is logged in:', this.isLoggedIn());
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get username(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims?.preferred_username || 'Unbekannt';
  }
  
  get roles(): string[] {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims?.realm_access?.roles || [];
  }
  
  get isAdmin(): boolean {
    return this.roles.includes('ADMIN');
  }
  
  get isUser(): boolean {
    return this.roles.includes('USER');
  }
  
  get accessToken(): string {
  return this.oauthService.getAccessToken(); // oder je nach Setup
}
  
}
