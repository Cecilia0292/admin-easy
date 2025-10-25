import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const baseUrl = 'http://localhost:8080';
  const currentKey = 'currentUser';

  const stored = localStorage.getItem(currentKey);
  let clonedReq = req;

  // ⚠️ Evita adicionar token em chamadas de login/refresh
  if (!req.url.includes('/auth')) {
    if (stored) {
      const user = JSON.parse(stored);
      if (user.accessToken) {
        clonedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${user.accessToken}` }
        });
      }
    }
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 🚫 Ignora o próprio /auth/refresh para evitar loop
      if (req.url.includes('/auth/refresh')) {
        redirectToLogin(router);
        return throwError(() => error);
      }

      // 🧩 Se deu 401, tenta refresh
      if (error.status === 401 && stored) {
        console.warn('Token expirado, tentando renovar...');
        const user = JSON.parse(stored);
        if (!user.refreshToken) {
          redirectToLogin(router);
          return throwError(() => error);
        }

        return http.post(`${baseUrl}/auth/refresh`, { refreshToken: user.refreshToken }, { responseType: 'text' })
          .pipe(
            switchMap((newAccessToken: string) => {
              if (!newAccessToken) {
                redirectToLogin(router);
                return throwError(() => new Error('Token inválido'));
              }

              console.log('Novo accessToken recebido:', newAccessToken);
              user.accessToken = newAccessToken;
              localStorage.setItem(currentKey, JSON.stringify(user));

              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newAccessToken}` }
              });

              return next(newReq);
            }),
            catchError(err => {
              console.error('Erro ao renovar token:', err);
              redirectToLogin(router);
              return throwError(() => err);
            })
          );
      }

      return throwError(() => error);
    })
  );
};

function redirectToLogin(router: Router) {
  console.warn('Redirecionando para login...');
  localStorage.removeItem('currentUser');
  router.navigate(['/login']);
}
