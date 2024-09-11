import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), importProvidersFrom(HttpClientModule),
  importProvidersFrom(BrowserAnimationsModule)
  ],
};