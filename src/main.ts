import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthService } from './app/auth/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(MatDialogModule),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['/api'],
        sendAccessToken: true
      }
    }))
  ]
}).then(appRef => {
  const injector = appRef.injector;
  const auth = injector.get(AuthService);
  auth.initAuth();
});
