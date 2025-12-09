import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { TokenHttpInterceptor } from './core/token-http-interceptor';
import { routes } from './app.routes';
import {  PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true },
    { provide: 'LOCAL_STORAGE', useFactory: getLocalStorage, deps: [PLATFORM_ID] }
  ]
};

// ✅ Safe `localStorage` handling function
export function getLocalStorage(platformId: Object): Storage | null {
  return isPlatformBrowser(platformId) ? localStorage : null;
}
