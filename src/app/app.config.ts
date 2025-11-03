import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist';
const atendeplusThemePreset = definePreset(Aura, {
  semantic: {
    primary: palette('#2563EB')
  }
})
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: atendeplusThemePreset,
        options : {
          darkModeSelector: false
        }
      },
    }),
    provideCharts(withDefaultRegisterables()),
    provideAnimationsAsync(),
    importProvidersFrom(
      PlotlyModule.forRoot(PlotlyJS)  // registra o Plotly
    )
  ]
};
