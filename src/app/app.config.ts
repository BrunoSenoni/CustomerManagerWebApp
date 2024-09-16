import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { spinnerInterceptorInterceptor } from './shared/interceptors/spinner-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideHttpClient(withInterceptors([spinnerInterceptorInterceptor])),
  importProvidersFrom(BrowserAnimationsModule)
  ],
};