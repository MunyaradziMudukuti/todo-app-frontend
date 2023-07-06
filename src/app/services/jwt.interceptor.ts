import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {JwtService} from "./jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.jwtService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.authService.refresh().pipe(
            switchMap(() => {
              const newToken = this.jwtService.getToken();
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(req);
            }),
            catchError((refreshError) => {
              this.jwtService.destroyToken();
              return throwError(refreshError);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

}
