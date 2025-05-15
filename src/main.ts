import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/components/login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideOAuthClient } from 'angular-oauth2-oidc';

bootstrapApplication(LoginComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([]),
    provideOAuthClient(),
  ],
});
