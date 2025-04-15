import { ApplicationConfig, provideZoneChangeDetection, isDevMode, InjectionToken, FactoryProvider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig, Socket, provideSocketIo } from 'ngx-socket-io';
// import { Socket } from 'socket.io-client';
import { environment } from './environments/environment';

const config: SocketIoConfig = { url: environment.soketServer, options: {} };

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Create a new injection token for the socket instance
export const SOCKET_INSTANCE = new InjectionToken<Socket>('SOCKET_INSTANCE');

// Provide the socket instance directly using SocketIoModule
const socketFactoryProvider: FactoryProvider = {
  provide: SOCKET_INSTANCE,
  useFactory: () => new Socket(config)
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([imageInterceptor])),
    provideRouter(routes), 
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimationsAsync(),
    provideToastr(),
    provideSocketIo(config),
    socketFactoryProvider,
    ...TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers!
  ]
};

function imageInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  // Check if the request is for an image
  if (req.url.endsWith('.jpg') || req.url.endsWith('.png') || req.url.endsWith('.jpeg')) {
   
    const jwtToken = window.localStorage.getItem('auth_token');
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return next(modifiedReq);
    
  }
  // Pass through other requests unmodified
  return next(req);
}

