import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';

import { isPlatformServer } from '@angular/common';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/services/auth';
import { CurrentUserService } from '@app/services/current-user';

const cloneRequest = (req: HttpRequest<unknown>, accessToken: string) => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    withCredentials: true,
  });
};

export function requestInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformServer(platformId)) {
    return next(req);
  }

  const authService = inject(AuthService);
  const currentUserService = inject(CurrentUserService);
  const accessToken = currentUserService.currentUser$()?.accessToken;
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(cloneRequest(req, accessToken!)).pipe(
    catchError((error: { status: number; error?: { message: string } }) => {
      if (error.status === 401 && error?.error?.message === 'TOKEN_EXPIRED') {
        return authService.refresh().pipe(
          switchMap(response => {
            currentUserService.updateAccessToken(response.accessToken);

            return next(cloneRequest(req, response.accessToken));
          }),
          catchError(
            (newError: { status: number; error?: { message: string } }) => {
              if (newError.status === 401) {
                currentUserService.remove();
                void router.navigate(['/login']);
                return EMPTY;
              } else {
                return throwError(() => newError);
              }
            },
          ),
        );
      }

      if (error.status === 401) {
        currentUserService.remove();
        void router.navigate(['/login']);
      }

      if (
        [401, 400, 500].includes(error.status) &&
        error?.error?.message !== 'TOKEN_EXPIRED'
      ) {
        toastr.error(error.error?.message ?? 'INTERNAL_SERVER_ERROR');
      }

      return throwError(() => error);
    }),
  );
}
