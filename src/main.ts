import '@angular/compiler';
import './index.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
  ],
}).catch((err) => console.error('Error bootstrapping Angular app:', err));

