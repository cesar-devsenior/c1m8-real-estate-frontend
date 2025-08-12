import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    let request = req;

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          console.log('event', event);
        }
      }),
      catchError((error: any) => {
        console.log('error', error);
        return throwError(() => error);
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
        console.log(`Request for ${req.urlWithParams} took ${elapsed}ms`);
      })
    );
  }
}

export function authInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const started = Date.now();
  let request = req;
  console.log(`[HTTP START] Petición a: ${request.url}`);
  
  const token = localStorage.getItem('access_token');
  if(token){
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  return next(request).pipe(
    tap((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.Response) {
        console.log(`[HTTP SUCCESS] Respuesta recibida de: ${request.url}`, event);
      }
    }),
    catchError((error: any) => {
      console.log(`[HTTP ERROR] Ocurrió un error en : ${request.url}`, error.message);
      return throwError(() => error);
    }),
    finalize(() => {
      const elapsed = Date.now() - started;
      console.log(`[HTTP END] Petición a: ${request.url} completada en ${elapsed}ms`);
    })
  );
}
